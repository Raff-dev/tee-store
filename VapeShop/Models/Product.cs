using System;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VapeShop.Models
{
    public class Product
    {
        public int ID { get; set; }

        [StringLength(60, MinimumLength = 3)]
        [Required]
        public string Name { get; set; }

        [StringLength(60, MinimumLength = 3)]
        [Required]
        public string Brand { get; set; }

        [RegularExpression(@"^[A-Z]+[a-zA-Z]*$")]
        [StringLength(30)]
        [Required]
        public Category Category { get; set; }

        [DataType(DataType.Currency)]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        [Range(0, 100)]
        [Required(ErrorMessage = "Discount is required")]
        public int Discount { get; set; }

        [Display(Name = "Discount Expiration Date")]
        [DataType(DataType.Date)]
        public DateTime DiscountExpirationDate { get; set; }

        [Required(ErrorMessage = "Product media is required")]
        public MediaAssignment MediaAssignment { get; set; }

    }
}
