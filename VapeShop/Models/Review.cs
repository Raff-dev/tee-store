using System;
using System.ComponentModel.DataAnnotations;

namespace VapeShop.Models
{
    public class Review
    {
        public int ID { get; set; }

        [Required]
        public Product Product { get; set; }

        [Required]
        public User User { get; set; }

        [Display(Name = "Review Date")]
        [DataType(DataType.Date)]
        public DateTime ReviewDate { get; set; }

        [Range(0, 10)]
        [Required]
        public int Rating { get; set; }

        [StringLength(100)]
        public string Rewiew { get; set; }
    }
}
