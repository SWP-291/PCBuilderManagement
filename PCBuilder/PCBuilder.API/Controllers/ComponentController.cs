﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PCBuilder.Services.DTO;
using PCBuilder.Services.Service;

namespace PCBuilder.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComponentController : ControllerBase
    {
        private readonly IComponentServices _componentServices;

        public ComponentController(IComponentServices componentServices)
        {
            _componentServices = componentServices;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllComponents()
        {
            var response = await _componentServices.GetComponents();

            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetComponentById(int id)
        {
            var response = await _componentServices.GetComponentById(id);

            if (!response.Success)
            {
                return NotFound(response);
            }

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreateComponent([FromBody] ComponentDTO componentDTO)
        {
            var response = await _componentServices.CreateComponent(componentDTO);

            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateComponent(int id, [FromBody] ComponentDTO componentDTO)
        {
            var response = await _componentServices.UpdateComponent(id, componentDTO);

            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComponent(int id)
        {
            var response = await _componentServices.DeleteComponent(id);

            if (!response.Success)
            {
                return NotFound(response);
            }

            return Ok(response);

        }
    }
}
