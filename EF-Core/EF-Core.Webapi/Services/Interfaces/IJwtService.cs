using EF_Core.Webapi.Dtos.Authentication;
using EF_Core.Webapi.Entity;

namespace EF_Core.Webapi.Services.Interfaces
{
    public interface IJwtService
    {
        Task<(string accessToken, string refreshToken)> GenerateTokenPairAsync(User user);
        Task<RefreshTokenResultDto> RefreshTokenAsync(string refreshToken);
    }
}
