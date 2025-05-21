using EF_Core.Webapi.Dtos.Authentication;
using EF_Core.Webapi.Entity;
using EF_Core.Webapi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EF_Core.Webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IJwtService _jwtService;
        public AuthController(IUserService userService, IJwtService jwtService)
        {
            _userService = userService;
            _jwtService = jwtService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserAuthDto userDto)
        {
            var user = await _userService.AuthenticateUserAsync(userDto.UserName, userDto.Password);
            if (user == null)
            {
                return Unauthorized(new { Message = "Invalid username or password" });
            }

            var (accessToken, refreshToken) = await _jwtService.GenerateTokenPairAsync(user);
            return Ok(new
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            });
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequestDto dto)
        {
            var result = await _jwtService.RefreshTokenAsync(dto.RefreshToken);

            if (!result.IsSuccess)
                return Unauthorized(new { Message = result.Error });

            return Ok(new
            {
                AccessToken = result.AccessToken,
                RefreshToken = result.RefreshToken
            });
        }


    }
}
