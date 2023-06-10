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
    public interface IUserRepository
    {
        /// <summary>
        /// Return all companies including records marked as deleted and disabled
        /// </summary>
        /// <returns>Models.User</returns>
        Task<ICollection<User>> GetAllUsersAsync();



    }
    public class UserRepository: IUserRepository
    {
        private readonly PcBuildingContext _context;
        public UserRepository(PcBuildingContext context)
        {
            this._context = context;
        }

        public async Task<ICollection<User>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }
    }
}
