using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PCBuilder.Services.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PCBuilder.API.Controllers
{
    [Route("api/[controller]")]
    public class ProfileController : ControllerBase
    {
        private readonly IUserServices _userServices;

        public ProfileController(IUserServices userServices)
        {
            _userServices = userServices;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> GetProfile([FromBody] string authorization)
        {
            // Lấy mã thông báo JWT từ tiêu đề Authorization
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.ReadJwtToken(authorization);

            // Lấy ID người dùng từ mã thông báo JWT
            int userId = int.Parse(token.Claims.FirstOrDefault(c => c.Type == "id")?.Value);

            // Truy vấn cơ sở dữ liệu để lấy hồ sơ của người dùng
            var user = await _userServices.GetUserByIdAsync(userId);

            // Nếu người dùng không tồn tại, trả về trạng thái 404
            if (user == null)
            {
                return NotFound();
            }

            // Trả về hồ sơ của người dùng
            return Ok(user);
        }
    }
}
