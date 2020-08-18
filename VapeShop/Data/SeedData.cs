using System.Diagnostics;
using System.Runtime.CompilerServices;
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

                if (context.Users.Any()
                    || context.Products.Any()
                    || context.Reviews.Any()
                    || context.Medias.Any()
                    || context.Categories.Any())
                {
                    return;
                }

                Category category1 = new Category
                {
                    Name = "gżauka",
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

                Review review1 = new Review
                {
                    User = user1,
                    Product = product1,
                    ReviewDate = DateTime.Today,
                    Rating = 9,
                    Rewiew = "alles gut"
                };

                Review review2 = new Review
                {
                    User = user2,
                    Product = product1,
                    ReviewDate = DateTime.Today,
                    Rating = 3,
                    Rewiew = "suabe"
                };

                Review review3 = new Review
                {
                    User = user2,
                    Product = product2,
                    ReviewDate = DateTime.Today,
                    Rating = 9,
                    Rewiew = "welp"
                };

                Media media1 = new Media
                {
                    MediaAssignmentID = product1.ID,
                    MediaFilePath = "images/img1"
                };

                Media media2 = new Media
                {
                    MediaAssignmentID = category1.ID,
                    MediaFilePath = "images/img1"
                };

                context.Categories.Add(category1);
                context.Users.Add(user1);
                context.Products.AddRange(product1, product2);
                context.Reviews.AddRange(review1, review2, review3);
                context.SaveChanges();
            }
        }
    }
}
