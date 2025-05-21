using EF_Core.Webapi.Dtos.Authentication;
using EF_Core.Webapi.Entity;

namespace EF_Core.Webapi.Services.Interfaces
{
    public interface IAuthService
    {
        Task<string> CreateRefreshTokenAsync(User user);
        Task<AuthResponseDto?> RefreshTokenAsync(string refreshToken);
    }
}
