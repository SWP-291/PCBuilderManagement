using PCBuilder.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PCBuilder.Repository.IRepository
{
    public interface IPCRepository
    {
        Task<List<Pc>> GetPCList();
    }
}
