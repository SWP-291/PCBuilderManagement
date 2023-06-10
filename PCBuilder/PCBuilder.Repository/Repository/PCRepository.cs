using Microsoft.EntityFrameworkCore;
using PCBuilder.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace PCBuilder.Repository.Repository
{
    public interface IPCRepository
    {
        /// <summary>
        /// Return all companies including records marked as deleted and disabled
        /// </summary>
        /// <returns>Models.Pc</returns>
        Task<ICollection<Pc>> GetAllPcsAsync();
    }
    public class PCRepository : IPCRepository
    {
        private readonly PcBuildingContext _dataContext;
        public PCRepository(PcBuildingContext context)
        {
            _dataContext = context;
        }

        public async Task<ICollection<Pc>> GetAllPcsAsync()
        {
            return await _dataContext.Pcs.ToListAsync();
        }
    }
}
