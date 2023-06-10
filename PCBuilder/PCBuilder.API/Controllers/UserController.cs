using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PCBuilder.Services.Service;

namespace PCBuilder.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserServices _userServices;
        
        public UserController(IUserServices userServices)
        {
            _userServices  = userServices;
        }

        [HttpGet]
        public async Task<IActionResult> GetUserList()
        {
            var User = await _userServices.GetUsersAsync();
            return Ok(User);
        }
    }
}
