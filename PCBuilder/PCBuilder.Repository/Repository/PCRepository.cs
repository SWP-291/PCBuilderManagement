using Microsoft.EntityFrameworkCore;
using PCBuilder.Repository.IRepository;
using PCBuilder.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PCBuilder.Repository.Repository
{
    public class PCRepository : IPCRepository
    {
        private readonly PcBuildingContext _context;
        public PCRepository(PcBuildingContext context)
        {
            _context = context;
        }

        async Task<List<Pc>> IPCRepository.GetPCList()
        {
            return await _context.Pcs.ToListAsync();
        }
    }
}
