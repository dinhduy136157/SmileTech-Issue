namespace EF_Core.Webapi.Services.Interfaces
{
    public interface IJwtService
    {
        string GenerateAccessToken(string userName, string role);
        string GenerateRefreshToken();
    }

}
