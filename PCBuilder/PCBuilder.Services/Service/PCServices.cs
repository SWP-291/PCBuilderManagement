using PCBuilder.Repository.Repository;
using PCBuilder.Repository.Models;
using PCBuilder.Services.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PCBuilder.Services.DTO;
using AutoMapper;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace PCBuilder.Services.Service
{
    public interface IPCServices
    {
        /// <summary>
        /// Return list of companies which are not marked as deleted.
        /// </summary>
        /// <returns>List Of PcDTO</returns>
        Task<ServiceResponse<List<PcDTO>>> GetPCList();
        Task<ServiceResponse<PcDTO>> GetPCByID(int ID);
        Task<ServiceResponse<PcDTO>> CreatePC(PcDTO pcDTO);
        Task<ServiceResponse<PcDTO>> UpdatePC(int ID, PcDTO pcDTO);
        Task<ServiceResponse<bool>> DeletePC(int ID);
    }

    public class PCServices : IPCServices
    {
        private readonly IPCRepository _repository;
        private readonly IMapper _mapper;

        public PCServices(IPCRepository pCRepository, IMapper mapper)
        {
            this._repository = pCRepository;
            this._mapper = mapper;
        }

        public async Task<ServiceResponse<List<PcDTO>>> GetPCList()
        {
            ServiceResponse<List<PcDTO>> _response = new();

            try
            {

                var PCList = await _repository.GetAllPcsAsync();

                var PcListDTO = new List<PcDTO>();

                foreach (var item in PCList)
                {
                    PcListDTO.Add(_mapper.Map<PcDTO>(item));
                }

                //OR 
                //PcListDTO.AddRange(from item in PCList select _mapper.Map<PcDTO>(item));
                _response.Success = true;
                _response.Message = "ok";
                _response.Data = PcListDTO;

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



        public async Task<ServiceResponse<PcDTO>> GetPCByID(int ID)
        {
            ServiceResponse<PcDTO> _response = new();
            try
            {
                var pc = await _repository.GetPcsByIdAsync(ID);



                var pcDTO = _mapper.Map<PcDTO>(pc);

                _response.Success = true;
                _response.Message = "ok";
                _response.Data = pcDTO;
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
        public async Task<ServiceResponse<PcDTO>> CreatePC(PcDTO pcDTO)
        {
            ServiceResponse<PcDTO> _response = new();

            try
            {
                var pc = _mapper.Map<Pc>(pcDTO);

                var createdPc = await _repository.CreatePcAsync(pc);

                var createdPcDTO = _mapper.Map<PcDTO>(createdPc);

                _response.Success = true;
                _response.Message = "PC created successfully";
                _response.Data = createdPcDTO;
            }
            catch (Exception ex)
            {
                _response.Success = false;
                _response.Message = "Error";
                _response.ErrorMessages = new List<string> { ex.Message };
            }

            return _response;
        }
        public async Task<ServiceResponse<PcDTO>> UpdatePC(int ID, PcDTO pcDTO)
        {
            ServiceResponse<PcDTO> _response = new();

            try
            {
                var pc = await _repository.GetPcsByIdAsync(ID);

                if (pc == null)
                {
                    _response.Success = false;
                    _response.Message = "PC not found";
                    return _response;
                }

                _mapper.Map(pcDTO, pc);
                var updatedPc = await _repository.UpdatePcAsync(pc);

                var updatedPcDTO = _mapper.Map<PcDTO>(updatedPc);
                _response.Success = true;
                _response.Message = "PC updated successfully";
                _response.Data = updatedPcDTO;
            }
            catch (Exception ex)
            {
                _response.Success = false;
                _response.Message = "Error";
                _response.ErrorMessages = new List<string> { ex.Message };
            }

            return _response;
        }

        public async Task<ServiceResponse<bool>> DeletePC(int ID)
        {
            ServiceResponse<bool> _response = new();

            try
            {
                var pc = await _repository.DeletePcAsync(ID);

                if (pc == null)
                {
                    _response.Success = false;
                    _response.Message = "PC not found";
                    return _response;
                }

               

                _response.Success = true;
                _response.Message = "PC deleted successfully";
                _response.Data = true;
            }
            catch (Exception ex)
            {
                _response.Success = false;
                _response.Message = "Error";
                _response.ErrorMessages = new List<string> { ex.Message };
            }

            return _response;
        }
    }
}
