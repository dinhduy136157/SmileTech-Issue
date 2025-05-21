using EF_Core.Webapi.Dtos.Authentication;
using EF_Core.Webapi.Entity;

namespace EF_Core.Webapi.Services.Interfaces
{
    public interface IUserService
    {
        Task<User?> AuthenticateUserAsync(string userName, string password);
        Task<(string accessToken, string refreshToken)> GenerateTokenPairAsync(User user);
    }
}
