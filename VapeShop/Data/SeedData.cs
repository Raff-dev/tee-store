using System.Xml.Schema;
using System.Reflection;
using System.Collections.Generic;
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

                var databaseContent = from prop in typeof(VapeShopContext).GetProperties()
                                      select prop.PropertyType.Name.Any();
                if (databaseContent != null)
                {
                    return;
                }

                MediaAssignment mediaAssignment1 = new MediaAssignment();
                Category category1 = new Category
                {
                    Name = "gżauka",
                    MediaAssignment = mediaAssignment1,
                };

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

                Product product1 = new Product
                {
                    Name = "When Harry Met Sally",
                    Brand = "brand",
                    Price = 7.99M,
                    Category = category1,
                };

                Product product2 = new Product
                {
                    Name = "wapito",
                    Brand = "wejp nejsz",
                    Price = 21.37M,
                    Category = category1,
                };

                context.MediaAssignments.Add(mediaAssignment1);
                context.Categories.Add(category1);
                context.Users.Add(user1);
                context.Products.AddRange(product1, product2);
                context.Reviews.AddRange(
                    new Review
                    {
                        User = user1,
                        Product = product1,
                        ReviewDate = DateTime.Today,
                        Rating = 9,
                        Rewiew = "alles gut"
                    },
                    new Review
                    {
                        User = user2,
                        Product = product1,
                        ReviewDate = DateTime.Today,
                        Rating = 3,
                        Rewiew = "suabe"
                    },
                    new Review
                    {
                        User = user2,
                        Product = product2,
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
