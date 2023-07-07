using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PCBuilder.Repository.Model;
using PCBuilder.Services.Service;

namespace PCBuilder.API.Controllers
{
    public class LoginRequest
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly IUserServices _userServices;

        public AuthenticateController(IUserServices userServices)
        {
            _userServices = userServices;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            var response = await _userServices.Login(loginRequest.Email, loginRequest.Password);
            if (!response.Success)
            {
                return Unauthorized(new { message = response.Message });
            }
            return Ok(new { token = response.Data });
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp(User user)
        {
            var response = await _userServices.Signup(user.Email, user.Password);
            if (!response.Success)
            {
                return BadRequest(new { message = response.Message });
            }
            return Ok(new { message = response.Data });
        }

        //[HttpPost("logout")]
        //[Authorize]
        //public async Task<IActionResult> Logout()
        //{
        //    await _userServices.Logout();
        //    return Ok(new { message = "Đã đăng xuất" });
        //}
    }
}
