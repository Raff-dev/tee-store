using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using VapeShop.Models;

namespace VapeShop.Models
{
    public class VapeShopContext : DbContext
    {
        public VapeShopContext(DbContextOptions<VapeShopContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Media> Medias { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Media>()
                .HasOne<Category>()
                .WithOne(c => c.Media)
                .HasForeignKey<Media>(m => m.CategoryName)
                .IsRequired(false);

            modelBuilder.Entity<User>()
                .HasAlternateKey(u => u.Email);
        }
    }
}