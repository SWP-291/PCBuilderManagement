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

namespace PCBuilder.Services.Service
{
    public interface IPCServices
    {
        /// <summary>
        /// Return list of companies which are not marked as deleted.
        /// </summary>
        /// <returns>List Of PcDTO</returns>
        Task<ServiceResponse<List<PcDTO>>> GetPCList();
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
                //CompanyListDto.AddRange(from item in CompaniesList select _mapper.Map<CompanyDto>(item));
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
    }
}
