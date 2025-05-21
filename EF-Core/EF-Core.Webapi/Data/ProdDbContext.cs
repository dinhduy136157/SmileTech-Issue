using EF_Core.Webapi.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Reflection.Emit;

namespace EF_Core.Webapi.Data
{
    public class ProdDbContext : DbContext
    {
        //entities
        public ProdDbContext(DbContextOptions<ProdDbContext> options)
            : base(options)
        {
        }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }



        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=DINHDUY;Database=ProductDB;Integrated Security=True;Trust Server Certificate=True");
        }

    }


}