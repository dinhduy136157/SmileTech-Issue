using EF_Core.Webapi.Dtos.Authentication;
using EF_Core.Webapi.Entity;
using EF_Core.Webapi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace EF_Core.Webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IJwtService _jwtService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IUserService userService, IJwtService jwtService, ILogger<AuthController> logger)
        {
            _userService = userService;
            _jwtService = jwtService;
            _logger = logger;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserAuthDto userDto)
        {
            try
            {
                var user = await _userService.AuthenticateUserAsync(userDto.UserName, userDto.Password);
                if (user == null)
                {
                    return Unauthorized(new { Message = "Invalid username or password" });
                }

                var (accessToken, refreshToken) = await _jwtService.GenerateTokenPairAsync(user);
                _logger.LogInformation("Đang đăng nhập với user: {UserName}", userDto.UserName);

                return Ok(new
                {
                    AccessToken = accessToken,
                    RefreshToken = refreshToken
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lỗi khi đăng nhập user: {UserName}", userDto.UserName);
                return StatusCode(500, new { Message = "Đã có lỗi xảy ra. Vui lòng thử lại sau." });
            }
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
