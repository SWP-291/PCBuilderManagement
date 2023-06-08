using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PCBuilder.Services.IServices;

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
            var User = await _userServices.GetListUser();
            return Ok(User);
        }
    }
}
