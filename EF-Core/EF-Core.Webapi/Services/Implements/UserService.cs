using EF_Core.Webapi.Data;
using EF_Core.Webapi.Dtos.Authentication;
using EF_Core.Webapi.Entity;
using EF_Core.Webapi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace EF_Core.Webapi.Services.Implements
{
    public class UserService : IUserService
    {
        private readonly ProdDbContext _context;
        private readonly IConfiguration _configuration;

        public UserService(ProdDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<User?> AuthenticateUserAsync(string userName, string password)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.UserName == userName && u.Password == password);
        }

    }
}
