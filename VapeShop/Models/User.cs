using System;
using System.ComponentModel.DataAnnotations;

namespace VapeShop.Models
{
    public class User
    {
        public int ID { get; set; }

        [StringLength(60, MinimumLength = 3)]
        [Required]
        public string Name { get; set; }

        [StringLength(60, MinimumLength = 3)]
        [Required]
        public string Surname { get; set; }

        [StringLength(60, MinimumLength = 3)]
        [DataType(DataType.EmailAddress)]
        [Required]
        public string Email { get; set; }

        [Display(Name = "Display Name")]
        [StringLength(60, MinimumLength = 3)]
        public string DisplayName { get; set; }

        [Display(Name = "Creation Date")]
        [DataType(DataType.DateTime)]
        [Required]
        public DateTime CreationDate = DateTime.Now;

        [Display(Name = "Birthday Date")]
        [DataType(DataType.Date)]
        [Required]
        public DateTime BirthDayDate { get; set; }

    }
}
