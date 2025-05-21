using EF_Core.Webapi.Dtos.Authentication;
using EF_Core.Webapi.Entity;
using EF_Core.Webapi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EF_Core.Webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserAuthDto userDto)
        {
            var user = await _userService.AuthenticateUserAsync(userDto.UserName, userDto.Password);
            if (user == null)
            {
                return Unauthorized(new { Message = "Invalid username or password" });
            }

            var (accessToken, refreshToken) = await _userService.GenerateTokenPairAsync(user);
            return Ok(new
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            });
        }
    }
}
