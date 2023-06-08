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
    public class UserRepository: IUserRepository
    {
        private readonly PcBuildingContext _context;
        public UserRepository(PcBuildingContext context)
        {
            this._context = context;
        }

        async Task<List<User>> IUserRepository.GetUserList()
        {
            return await _context.Users.ToListAsync();
        }
    }
}
