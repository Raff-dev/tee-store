using System;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VapeShop.Models
{
    public partial class Product : MediaAssignment
    {

        [StringLength(60, MinimumLength = 3)]
        [Required]
        public string Name { get; set; }

        [StringLength(60, MinimumLength = 3)]
        [Required]
        public string Brand { get; set; }

        [Required]
        [ForeignKey("Category")]
        public int CategoryID { get; set; }
        public virtual Category Category { get; set; }

        [DataType(DataType.Currency)]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        [Range(0, 100)]
        [Required(ErrorMessage = "Discount is required")]
        public int Discount { get; set; }

        [Display(Name = "Discount Expiration Date")]
        [DataType(DataType.Date)]
        public DateTime DiscountExpirationDate { get; set; }

        public virtual ICollection<Review> Reviews { get; set; }
    }
}
