using System.Data;
using System;
using System.ComponentModel.DataAnnotations;

namespace VapeShop.Models
{
    public class User
    {
        public int ID { get; set; }

        [StringLength(60, MinimumLength = 3)]
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }

        [StringLength(60, MinimumLength = 3)]
        [Required(ErrorMessage = "Surname is required")]
        public string Surname { get; set; }

        [StringLength(60, MinimumLength = 3)]
        [DataType(DataType.EmailAddress)]
        [Required(ErrorMessage = "Email is required")]
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
        [Required(ErrorMessage = "Birthday date is required")]
        public DateTime BirthDayDate { get; set; }

        public string ProfilePucturePath { get; set; }

    }
}
