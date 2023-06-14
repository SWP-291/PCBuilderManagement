using AutoMapper;
using PCBuilder.Repository.Models;
using PCBuilder.Repository.Repository;
using PCBuilder.Services.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PCBuilder.Services.Service
{
    public interface IComponentServices
    {
        Task<ServiceResponse<List<ComponentDTO>>> GetComponents();
        Task<ServiceResponse<ComponentDTO>> GetComponentById(int id);
        Task<ServiceResponse<ComponentDTO>> CreateComponent(ComponentDTO componentDTO);
        Task<ServiceResponse<ComponentDTO>> UpdateComponent(int id, ComponentDTO componentDTO);
        Task<ServiceResponse<bool>> DeleteComponent(int id);
    }
    public class ComponentServices : IComponentServices
    {
        private readonly IComponentRepository _componentRepository;
        private readonly IMapper _mapper;

        public ComponentServices(IComponentRepository componentRepository, IMapper mapper)
        {
            _componentRepository = componentRepository;
            _mapper = mapper;
        }

        public async Task<ServiceResponse<List<ComponentDTO>>> GetComponents()
        {
            var response = new ServiceResponse<List<ComponentDTO>>();

            try
            {
                var components = await _componentRepository.GetAllComponentsAsync();
                var componentDTOs = _mapper.Map<List<ComponentDTO>>(components);

                response.Success = true;
                response.Message = "Components retrieved successfully";
                response.Data = componentDTOs;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Error retrieving components";
                response.ErrorMessages = new List<string> { ex.Message };
            }

            return response;
        }

        public async Task<ServiceResponse<ComponentDTO>> GetComponentById(int id)
        {
            var response = new ServiceResponse<ComponentDTO>();

            try
            {
                var component = await _componentRepository.GetComponentByIdAsync(id);

                if (component == null)
                {
                    response.Success = false;
                    response.Message = "Component not found";
                    return response;
                }

                var componentDTO = _mapper.Map<ComponentDTO>(component);

                response.Success = true;
                response.Message = "Component retrieved successfully";
                response.Data = componentDTO;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Error retrieving component";
                response.ErrorMessages = new List<string> { ex.Message };
            }

            return response;
        }

        public async Task<ServiceResponse<ComponentDTO>> CreateComponent(ComponentDTO componentDTO)
        {
            var response = new ServiceResponse<ComponentDTO>();

            try
            {
                var component = _mapper.Map<Component>(componentDTO);
                var createdComponent = await _componentRepository.CreateComponentAsync(component);
                var createdComponentDTO = _mapper.Map<ComponentDTO>(createdComponent);

                response.Success = true;
                response.Message = "Component created successfully";
                response.Data = createdComponentDTO;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Error creating component";
                response.ErrorMessages = new List<string> { ex.Message };
            }

            return response;
        }

        public async Task<ServiceResponse<ComponentDTO>> UpdateComponent(int id, ComponentDTO componentDTO)
        {
            var response = new ServiceResponse<ComponentDTO>();

            try
            {
                var existingComponent = await _componentRepository.GetComponentByIdAsync(id);

                if (existingComponent == null)
                {
                    response.Success = false;
                    response.Message = "Component not found";
                    return response;
                }

                var updatedComponent = _mapper.Map(componentDTO, existingComponent);
                var savedComponent = await _componentRepository.UpdateComponentAsync(updatedComponent);
                var savedComponentDTO = _mapper.Map<ComponentDTO>(savedComponent);

                response.Success = true;
                response.Message = "Component updated successfully";
                response.Data = savedComponentDTO;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Error updating component";
                response.ErrorMessages = new List<string> { ex.Message };
            }
            return response;
        }
        public async Task<ServiceResponse<bool>> DeleteComponent(int id)
        {
            var response = new ServiceResponse<bool>();

            try
            {
                var existingComponent = await _componentRepository.GetComponentByIdAsync(id);

                if (existingComponent == null)
                {
                    response.Success = false;
                    response.Message = "Component not found";
                    return response;
                }

                var deleted = await _componentRepository.DeleteComponentAsync(id);

                response.Success = true;
                response.Message = "Component deleted successfully";
                response.Data = deleted;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Error deleting component";
                response.ErrorMessages = new List<string> { ex.Message };
            }

            return response;
        }
    }
}

