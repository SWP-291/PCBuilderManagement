using PCBuilder.Repository.Repository;
using PCBuilder.Repository.Model;
using PCBuilder.Services.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PCBuilder.Services.DTO;
using AutoMapper;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;

namespace PCBuilder.Services.Service
{
    public interface IUserServices
    {
        Task<ServiceResponse<List<UserDTO>>> GetUsersAsync();
        Task<ServiceResponse<UserDTO>> GetUserByIdAsync(int id);
        Task<ServiceResponse<UserDTO>> CreateUserAsync(UserDTO userDTO);
        Task<ServiceResponse<UserDTO>> UpdateUserAsync(int id, UserDTO userDTO);
        Task<ServiceResponse<bool>> DeleteUserAsync(int id);
        Task<ServiceResponse<UserRoleDTO>> LoginAsync(string email, string password);
        Task<ServiceResponse<string>> Login(string email, string password);
        Task<ServiceResponse<string>> Signup(string email, string password);
        //Task<ServiceResponse<string>> Logout();
        Task<ServiceResponse<string>> SomeAuthorizedMethod(string token);
    }

    public class UserServices : IUserServices
    {
        private readonly IUserRepository _iUserRepository;
        private readonly IRoleRepository _iRoleRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;


        public UserServices(IUserRepository iUserRepository, IRoleRepository iRoleRepository, IMapper mapper, IConfiguration configuration)
        {
            _iUserRepository = iUserRepository;
            _mapper = mapper;
            _iRoleRepository = iRoleRepository;
            _configuration = configuration;
        }

        public async Task<ServiceResponse<List<UserDTO>>> GetUsersAsync()
        {
            ServiceResponse<List<UserDTO>> _response = new();

            try
            {

                var UsersList = await _iUserRepository.GetAllUsersAsync();

                var UserListDto = new List<UserDTO>();

                foreach (var item in UsersList)
                {
                    UserListDto.Add(_mapper.Map<UserDTO>(item));
                }

                //OR
                //UserListDto.AddRange(from item in CompaniesList select _mapper.Map<UserDTO>(item));
                _response.Success = true;
                _response.Message = "User retrieved successfully";
                _response.Data = UserListDto;

            }
            catch (Exception ex)
            {
                _response.Success = false;
                _response.Data = null;
                _response.Message = "Error";
                _response.ErrorMessages = new List<string> { Convert.ToString(ex.Message) };
            }

            return _response;
        }

        public async Task<ServiceResponse<UserDTO>> GetUserByIdAsync(int id)
        {
            ServiceResponse<UserDTO> response = new ServiceResponse<UserDTO>();

            try
            {
                var user = await _iUserRepository.GetUserByIdAsync(id);

                if (user == null)
                {
                    response.Success = false;
                    response.Message = "User not found.";
                    return response;
                }

                var userDto = _mapper.Map<UserDTO>(user);

                response.Data = userDto;
                response.Success = true;
                response.Message = "User retrieved successfully";
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Error";
                response.ErrorMessages = new List<string> { ex.Message };
            }

            return response;
        }
        public async Task<ServiceResponse<UserDTO>> CreateUserAsync(UserDTO userDTO)
        {
            ServiceResponse<UserDTO> response = new ServiceResponse<UserDTO>();

            try
            {
                var user = _mapper.Map<User>(userDTO);
                var createdUser = await _iUserRepository.CreateUserAsync(user);
                var createdUserDto = _mapper.Map<UserDTO>(createdUser);

                response.Data = createdUserDto;
                response.Success = true;
                response.Message = "User created successfully.";
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Error";
                response.ErrorMessages = new List<string> { ex.Message };
            }

            return response;
        }
        public async Task<ServiceResponse<UserDTO>> UpdateUserAsync(int id, UserDTO userDTO)
        {
            ServiceResponse<UserDTO> response = new ServiceResponse<UserDTO>();

            try
            {
                var existingUser = await _iUserRepository.GetUserByIdAsync(id);

                if (existingUser == null)
                {
                    response.Success = false;
                    response.Message = "User not found.";
                    return response;
                }

                // Update the properties of the existing user
                var updated = _mapper.Map(userDTO, existingUser);

                var updatedUser = await _iUserRepository.UpdateUserAsync(updated);
                var updatedUserDto = _mapper.Map<UserDTO>(updatedUser);

                response.Data = updatedUserDto;
                response.Success = true;
                response.Message = "User updated successfully.";
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Error";
                response.ErrorMessages = new List<string> { ex.Message };
            }

            return response;
        }
        public async Task<ServiceResponse<bool>> DeleteUserAsync(int id)
        {
            ServiceResponse<bool> response = new ServiceResponse<bool>();

            try
            {
                var isDeleted = await _iUserRepository.DeleteUserAsync(id);

                if (!isDeleted)
                {
                    response.Success = false;
                    response.Message = "User not found.";
                    response.Data = false;
                    return response;
                }

                response.Data = true;
                response.Success = true;
                response.Message = "User deleted successfully.";
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Error";
                response.ErrorMessages = new List<string> { ex.Message };
            }

            return response;

        }
        public async Task<ServiceResponse<UserRoleDTO>> LoginAsync(string email, string password)
        {
            ServiceResponse<UserRoleDTO> response = new ServiceResponse<UserRoleDTO>();

            try
            {
                var user = await _iUserRepository.GetUserAndPasswordByUsernameAsync(email, password);

                if (user == null || user.RoleId == null)
                {
                    response.Success = false;
                    response.Message = "Invalid username or password.";
                    return response;
                }

                var role = await _iRoleRepository.GetRoleByIdAsync(user.RoleId);

                if (role == null)
                {
                    response.Success = false;
                    response.Message = "Role not found.";
                    return response;
                }

                var userDto = _mapper.Map<UserRoleDTO>(user);
                userDto.Role = _mapper.Map<RoleDTO>(role);

                response.Data = userDto;
                response.Success = true;
                response.Message = "Logged in successfully";
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Error";
                response.ErrorMessages = new List<string> { ex.Message };
            }

            return response;
        }


        public async Task<ServiceResponse<string>> Login(string email, string password)
        {
            ServiceResponse<string> response = new ServiceResponse<string>();
            var user = await _iUserRepository.GetUserByEmailAsync(email);
            if (user == null || user.Password != password)
            {
                response.Success = false;
                response.Message = "Invalid username or password";
                return response;
            }

            var role = await _iRoleRepository.GetRoleByIdAsync(user.RoleId);
            var claims = new List<Claim>{
                new Claim(ClaimTypes.Email, user.Email.ToString()),
                new Claim(ClaimTypes.Role, role.Name.ToString()),
                new Claim(ClaimTypes.GivenName, user.Fullname),
                new Claim(ClaimTypes.MobilePhone, user.Phone),
                new Claim(ClaimTypes.Country, user.Country),
                new Claim(ClaimTypes.Gender, user.Gender),
                new Claim(ClaimTypes.StreetAddress, user.Address),
                new Claim(ClaimTypes.Uri, user.Avatar)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JwtSettings:SecretKey"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwt = tokenHandler.WriteToken(token);

            response.Success = true;
            response.Message = "Login successful.";
            response.Data = jwt;

            return response;
        }
        public async Task<ServiceResponse<string>> SomeAuthorizedMethod(string token)
        {
            ServiceResponse<string> response = new ServiceResponse<string>();

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JwtSettings:SecretKey"]);

            // Xác minh token
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidIssuer = _configuration["JwtSettings:Issuer"],
                ValidAudience = _configuration["JwtSettings:Audience"],
                ValidateIssuer = true,
                ValidateAudience = true
            };

            SecurityToken validatedToken;
            var claimsPrincipal = tokenHandler.ValidateToken(token, validationParameters, out validatedToken);

            // Kiểm tra quyền truy cập
            var roleClaim = claimsPrincipal.FindFirst("Role");
            if (roleClaim == null)
            {
                response.Success = false;
                response.Message = "Access denied.";
                return response;
            }

            var role = roleClaim.Value; // Lấy giá trị của claim "Role"

            // Thực hiện các kiểm tra và xử lý tương ứng dựa trên quyền truy cập

            // Ví dụ: Kiểm tra quyền truy cập "Admin"
            if (role == "Admin")
            {
                // Thực hiện hành động dành cho người dùng có quyền "Admin"
                response.Success = true;
                response.Message = "Access granted for Admin.";
            }
            else if (role == "Customer")
            {
                // Thực hiện hành động dành cho người dùng có quyền "User"
                response.Success = true;
                response.Message = "Access granted for User.";
            }
            else if (role == "Employee")
            {
                response.Success = true;
                response.Message = "Access granted for Employee.";
            }
            else
            {
                // Người dùng không có quyền truy cập
                response.Success = false;
                response.Message = "Access denied.";
            }

            return response;
        }


        // can cho form dang ki no la cai gi de con viet tiep
        public async Task<ServiceResponse<string>> Signup(string email, string password)
        {
            ServiceResponse<string> response = new ServiceResponse<string>();

            if (_iUserRepository.GetUserByEmailAsync(email) != null)
            {
                response.Success = false;
                response.Message = "User with email is existed";
                return response;
            }

            var user = new User()
            {
                Email = email,
                Password = password
            };
            await _iUserRepository.CreateUserAsync(user);

            response.Success = true;
            response.Data = "Sign up successfully";
            return response;
        }

    }
}
