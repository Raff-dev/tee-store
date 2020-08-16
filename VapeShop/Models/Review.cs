using System;
using System.ComponentModel.DataAnnotations;

namespace VapeShop.Models
{
    public class Review
    {
        public int ID { get; set; }

        [Required]
        public Item Item { get; set; }

        [Required]
        public User User { get; set; }

        [Display(Name = "Review Date")]
        [DataType(DataType.Date)]
        public DateTime ReviewDate { get; set; }

        [RegularExpression(@"^[A-Z]+[a-zA-Z0-9""'\s-]*$")]
        [Range(0, 10)]
        [Required]
        public int Rating { get; set; }

        [StringLength(100)]
        public string Rewiew { get; set; }
    }
}
