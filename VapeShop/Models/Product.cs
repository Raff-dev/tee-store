using System;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VapeShop.Models
{
    public class Product
    {
        public int Id { get; set; }

        [StringLength(60, MinimumLength = 3)]
        [Required]
        public string Name { get; set; }

        [StringLength(60, MinimumLength = 3)]
        [Required]
        public string Brand { get; set; }

        [ForeignKey("CategoryName")]
        public virtual Category Category { get; set; }
        public string CategoryName { get; set; }

        [DataType(DataType.Currency)]
        [Column(TypeName = "decimal(18,2)")]
        [Required]
        public decimal Price { get; set; }

        [Range(0, 100)]
        public int Discount { get; set; }

        public virtual List<Review> Reviews { get; set; }

        public virtual List<Media> Medias { get; set; }
    }
}
