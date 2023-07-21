using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using Google.Apis.Auth;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PCBuilder.Repository.Model;
using PCBuilder.Repository.Repository;
using PCBuilder.Services.DTO;

namespace PCBuilder.Services.Service
{
    public interface IGoogleServices
    {
        Task<ServiceResponse<AuthResponseDTO>> LoginWithGoogle(string idToken);
        Task<ServiceResponse<AuthResponseDTO>> ReturnTokenWhenLoginGoogle(string email);
    }
    public class GoogleServices : IGoogleServices
    {
        private readonly IUserRepository _iUserRepository;
        private readonly IRoleRepository _iRoleRepository;
        private readonly IUserServices _iUserService;
        private readonly IConfiguration _configuration;
        public GoogleServices
        (
            IUserRepository iUserRepository,
            IRoleRepository iRoleRepository,
            IUserServices iUserServices,
            IConfiguration configuration
        )
        {
            _iUserRepository = iUserRepository;
            _iRoleRepository = iRoleRepository;
            _iUserService = iUserServices;
            _configuration = configuration;
        }

        public async Task<ServiceResponse<AuthResponseDTO>> LoginWithGoogle(string idToken)
        {
            var response = new ServiceResponse<AuthResponseDTO>();

            try
            {
                // Xác thực token với Google
                GoogleJsonWebSignature.ValidationSettings settings = new GoogleJsonWebSignature.ValidationSettings();
                GoogleJsonWebSignature.Payload payload = await GoogleJsonWebSignature.ValidateAsync(idToken, settings);

                // Kiểm tra xem người dùng có tồn tại trong hệ thống hay không
                System.Console.WriteLine(payload.ToString());
                var user = await _iUserRepository.GetUserByEmailAsync(payload.Email);
                System.Console.WriteLine(user);
                if (user == null)
                {
                    // Tạo người dùng mới trong hệ thống
                    user = new User
                    {
                        Email = payload.Email,
                        Fullname = payload.Name,
                        // Gán các thông tin khác từ payload nếu cần
                    };
                    await _iUserRepository.CreateUserAsync(user);
                }

                // Tạo mã thông báo JWT
                var loginResponse = await ReturnTokenWhenLoginGoogle(user.Email);

                if (!loginResponse.Success)
                {
                    // Xử lý lỗi khi đăng nhập
                    response.Success = false;
                    response.Message = "Login with Google failed.";
                    response.ErrorMessages = loginResponse.ErrorMessages;
                    return response;
                }

                response.Data = loginResponse.Data;
                response.Success = true;
                response.Message = "Login with Google successful.";
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Login with Google failed.";
                response.ErrorMessages = new List<string> { ex.Message };
            }

            return response;
        }

        public async Task<ServiceResponse<AuthResponseDTO>> ReturnTokenWhenLoginGoogle(string email)
        {
            ServiceResponse<AuthResponseDTO> response = new ServiceResponse<AuthResponseDTO>();
            var user = await _iUserRepository.GetUserByEmailAsync(email);
            if (user == null)
            {
                response.Success = false;
                response.Message = "Invalid email";
                return response;
            }

            var role = await _iRoleRepository.GetRoleByIdAsync(user.RoleId);
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, role.Name),
                new Claim("id", user.Id.ToString()),
                new Claim("fullName", user.Fullname),
                new Claim("phone", user.Phone),
                new Claim("country", user.Country.ToString()),
                new Claim("gender", user.Gender.ToString()),
                new Claim("address", user.Address),
                new Claim("avatar", user.Avatar)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JwtSettings:SecretKey"]);
            var issuer = _configuration["JwtSettings:Issuer"];
            var audience = _configuration["JwtSettings:Audience"];

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwt = tokenHandler.WriteToken(token);

            var refreshToken = GenerateRefreshToken();
            var refreshTokenExpiration = DateTime.UtcNow.AddDays(30); // Thời gian hết hạn của RefreshToken

            var authResponse = new AuthResponseDTO
            {
                Token = jwt,
                RefreshToken = refreshToken,
                ExpiresIn = tokenDescriptor.Expires ?? DateTime.UtcNow.AddDays(7)
            };

            response.Success = true;
            response.Message = "Login successful.";
            response.Data = authResponse;

            return response;
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

    }
}
