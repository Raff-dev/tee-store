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
        public DbSet<MediaAssignment> MediaAssignments { get; set; }
    }
}
