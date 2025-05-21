namespace EF_Core.Webapi.Dtos.Authentication
{
    public class RefreshTokenResultDto
    {
        public bool IsSuccess { get; set; }
        public string AccessToken { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
        public string Error { get; set; } = string.Empty;
    }
}
