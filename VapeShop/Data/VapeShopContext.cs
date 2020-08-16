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

        public DbSet<User> User { get; set; }
        public DbSet<Item> Item { get; set; }
        public DbSet<Review> Review { get; set; }
        public DbSet<VapeShop.Models.ItemImage> ItemImage { get; set; }
    }
}
