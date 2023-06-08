using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PCBuilder.Repository.Models;
using PCBuilder.Services.IServices;

namespace PCBuilder.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PCController : ControllerBase
    {
        private readonly IPCServices _IPCServices;
        public PCController(IPCServices IPCServices)
        {
            _IPCServices = IPCServices;
        }
        [HttpGet]
        public async Task<IActionResult> GetPCList()
        {
            List<Pc> PCs =  await _IPCServices.GetPCList();
            
            //string json = JsonConvert.SerializeObject(PCs);

            return Ok(PCs);
        }
    }
}
