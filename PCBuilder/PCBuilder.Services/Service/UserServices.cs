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
    public class UserServices : IUserServices
    {
        private readonly IUserRepository _iUserRepository;

        public UserServices(IUserRepository iUserRepository)
        {
            _iUserRepository = iUserRepository;
        }

        Task<List<User>> IUserServices.GetListUser()
        {
            return _iUserRepository.GetUserList();
        }
    }
}
