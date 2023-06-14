using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PCBuilder.Repository.Models;
using PCBuilder.Services.DTO;
using PCBuilder.Services.Service;

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
            var PCs = await _IPCServices.GetPCList();
            return Ok(PCs);
        }
        [HttpGet("{PcId}")]
        public async Task<IActionResult> GetPcByIdList(int PcId)
        {
            var pc = await _IPCServices.GetPCByID(PcId);

            if (pc == null)
            {
                return NotFound();
            }

            return Ok(pc);
        }
        [HttpPost]
        public async Task<IActionResult> CreatePC([FromBody] PcDTO pcCreateDTO)
        {
            var response = await _IPCServices.CreatePC(pcCreateDTO);

            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePC(int id, [FromBody] PcDTO pcUpdateDTO)
        {
            var response = await _IPCServices.UpdatePC(id, pcUpdateDTO);

            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePC(int id)
        {
            var response = await _IPCServices.DeletePC(id);

            if (!response.Success)
            {
                return NotFound(response);
            }

            return Ok(response);
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchPCByName([FromQuery] string name)
        {
            if (!string.IsNullOrEmpty(name))
            {
                var searchResult = await _IPCServices.SearchPCsByName(name);
                return Ok(searchResult);
            }
            else
            {
                var PCs = await _IPCServices.GetPCList();
                return Ok(PCs);
            }
        }
    }
}
