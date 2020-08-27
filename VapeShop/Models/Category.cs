using System;
using System.Collections.Generic;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VapeShop.Models
{
    public class Category
    {
        [StringLength(30, MinimumLength = 3)]
        [RegularExpression(@"^[a-zA-Z0-9]+$",
            ErrorMessage = "Special characters are not allowed.")]
        [Key]
        public string Name { get; set; }

        public virtual List<Product> Products { get; set; }

        public virtual Media Media { get; set; }
    }
}
