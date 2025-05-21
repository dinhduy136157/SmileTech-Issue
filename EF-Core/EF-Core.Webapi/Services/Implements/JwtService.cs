using EF_Core.Webapi.Data;
using EF_Core.Webapi.Dtos.Authentication;
using EF_Core.Webapi.Entity;
using EF_Core.Webapi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EF_Core.Webapi.Services.Implements
{
    public class JwtService : IJwtService
    {
        private readonly ProdDbContext _context;
        private readonly IConfiguration _configuration;
        public JwtService(ProdDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        public async Task<(string accessToken, string refreshToken)> GenerateTokenPairAsync(User user)
        {
            // 1. Tạo Access Token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("UserName", user.UserName),
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, "User")
                }),
                Expires = DateTime.UtcNow.AddMinutes(15),
                Issuer = _configuration["JwtSettings:Issuer"],
                Audience = _configuration["JwtSettings:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var accessToken = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));

            // 2. Tạo Refresh Token
            var refreshToken = new RefreshToken
            {
                Token = Guid.NewGuid().ToString("N") + Guid.NewGuid().ToString("N"), // 64 ký tự
                CreatedAt = DateTime.UtcNow,
                ExpiresAt = DateTime.UtcNow.AddDays(7),
                UserId = user.Id,
                IsUsed = false,
                RevokedAt = null
            };

            _context.RefreshTokens.Add(refreshToken);
            await _context.SaveChangesAsync();

            return (accessToken, refreshToken.Token);
        }
        public async Task<RefreshTokenResultDto> RefreshTokenAsync(string refreshToken)
        {
            var tokenInDb = await _context.RefreshTokens
                .FirstOrDefaultAsync(r => r.Token == refreshToken);

            if (tokenInDb == null || tokenInDb.IsUsed || tokenInDb.RevokedAt != null || tokenInDb.ExpiresAt < DateTime.UtcNow)
            {
                return new RefreshTokenResultDto
                {
                    IsSuccess = false,
                    Error = "Invalid or expired refresh token"
                };
            }

            var user = await _context.Users.FindAsync(tokenInDb.UserId);
            if (user == null)
            {
                return new RefreshTokenResultDto
                {
                    IsSuccess = false,
                    Error = "User not found"
                };
            }

            tokenInDb.IsUsed = true;
            tokenInDb.RevokedAt = DateTime.UtcNow;

            var (newAccessToken, newRefreshTokenStr) = await GenerateTokenPairAsync(user);
            await _context.SaveChangesAsync();

            return new RefreshTokenResultDto
            {
                IsSuccess = true,
                AccessToken = newAccessToken,
                RefreshToken = newRefreshTokenStr
            };
        }
    }
}
