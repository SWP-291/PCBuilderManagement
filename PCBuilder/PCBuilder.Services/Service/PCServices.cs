using PCBuilder.Repository.IRepository;
using PCBuilder.Repository.Models;
using PCBuilder.Services.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PCBuilder.Services.Service
{
    public class PCServices : IPCServices
    {
        private readonly IPCRepository _pCRepository;

        public PCServices(IPCRepository pCRepository)
        {
            _pCRepository = pCRepository;
        }
        Task<List<Pc>> IPCServices.GetPCList()
        {
            return _pCRepository.GetPCList();
        }
    }
}
