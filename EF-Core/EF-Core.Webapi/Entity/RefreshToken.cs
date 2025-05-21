namespace EF_Core.Webapi.Entity
{
    public class RefreshToken
    {
        public int Id { get; set; }
        public string Token { get; set; } = null!;
        public DateTime ExpiresAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? RevokedAt { get; set; }
        public bool IsUsed { get; set; } = false;

        // Quan hệ với User
        public int UserId { get; set; }
        public User User { get; set; } = null!;
    }

}
