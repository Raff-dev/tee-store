using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VapeShop.Models
{
    public class Review
    {
        public Review()
        {
            ReviewDate = DateTime.Now;
        }

        public int Id { get; set; }

        [ForeignKey("ProductId")]
        public virtual Product Product { get; set; }
        public int ProductId { get; set; }

        [ForeignKey("UserEmail")]
        public virtual User User { get; set; }
        public int UserEmail { get; set; }

        [Display(Name = "Review Date")]
        [DataType(DataType.DateTime)]
        public DateTime ReviewDate { get; set; }

        [Range(1, 10)]
        [Required]
        public int Rating { get; set; }

        [StringLength(100)]
        public string Rewiew { get; set; }
    }
}
