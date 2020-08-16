using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.DependencyInjection;


namespace VapeShop.Models
{
    public class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new VapeShopContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<VapeShopContext>>()))
            {
                if (context.User.Any() || context.Item.Any() || context.Review.Any())
                {
                    return;
                }

                User user1 = new User
                {
                    Name = "name1",
                    Surname = "surname1",
                    Email = "email1@email.com",
                    DisplayName = "User1",
                    BirthDayDate = DateTime.Today.AddYears(-18),
                };

                User user2 = new User
                {
                    Name = "name2",
                    Surname = "surname2",
                    Email = "email1@email.com",
                    DisplayName = "User1",
                    BirthDayDate = DateTime.Today.AddYears(-18),
                };

                Item item1 = new Item
                {
                    Name = "When Harry Met Sally",
                    Brand = "brand",
                    Price = 7.99M,
                    Type = "grzauka",
                };

                Item item2 = new Item
                {
                    Name = "wapito",
                    Brand = "wejp nejsz",
                    Price = 21.37M,
                    Type = "wejp",
                };

                context.User.Add(user1);
                context.Item.AddRange(item1, item2);
                context.Review.AddRange(
                    new Review
                    {
                        User = user1,
                        Item = item1,
                        ReviewDate = DateTime.Today,
                        Rating = 9,
                        Rewiew = "alles gut"
                    },
                    new Review
                    {
                        User = user2,
                        Item = item1,
                        ReviewDate = DateTime.Today,
                        Rating = 3,
                        Rewiew = "suabe"
                    },
                    new Review
                    {
                        User = user2,
                        Item = item2,
                        ReviewDate = DateTime.Today,
                        Rating = 9,
                        Rewiew = "welp"
                    }
                 );


                context.SaveChanges();
            }
        }
    }
}
