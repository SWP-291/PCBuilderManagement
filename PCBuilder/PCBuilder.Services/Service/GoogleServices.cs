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
    }
    public class GoogleServices : IGoogleServices
	{
        private readonly IUserRepository _iUserRepository;
        private readonly IRoleRepository _iRoleRepository;
        private readonly IUserServices _iUserService;
        public GoogleServices
        (
            IUserRepository iUserRepository,
            IRoleRepository iRoleRepository,
            IUserServices iUserServices
        )
		{
            _iUserRepository = iUserRepository;
            _iRoleRepository = iRoleRepository;
            _iUserService = iUserServices;
        }

        public async Task<ServiceResponse<AuthResponseDTO>> LoginWithGoogle(string idToken)
        {
            ServiceResponse<AuthResponseDTO> response = new ServiceResponse<AuthResponseDTO>();

            try
            {
                // Xác thực token với Google
                GoogleJsonWebSignature.ValidationSettings settings = new GoogleJsonWebSignature.ValidationSettings();
                GoogleJsonWebSignature.Payload payload = await GoogleJsonWebSignature.ValidateAsync(idToken, settings);

                // Kiểm tra xem người dùng có tồn tại trong hệ thống hay không
                var user = await _iUserRepository.GetUserByEmailAsync(payload.Email);
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
                var loginResponse = await _iUserService.Login(user.Email, null); // Gọi lại phương thức Login với email người dùng

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


    }
}

