using PCBuilder.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PCBuilder.Services.IServices
{
    public interface IUserServices
    {
        Task<List<User>> GetListUser();
    }
}
