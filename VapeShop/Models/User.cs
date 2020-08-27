using System.Collections.Generic;
using System.Data;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VapeShop.Models
{
    public class User
    {
        public User()
        {
            CreationTimestamp = DateTime.Now;
        }
        public int Id { get; set; }

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

        [Display(Name = "Creation Timestamp")]
        [DataType(DataType.DateTime)]
        [Required]
        public DateTime CreationTimestamp { get; set; }

        [Display(Name = "Birthday Date")]
        [DataType(DataType.Date)]
        [Required(ErrorMessage = "Birthday date is required")]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:MM/dd/yyyy}")]
        public DateTime BirthDayDate { get; set; }

        public virtual List<Review> Reviews { get; set; }

        public virtual Media Media { get; set; }
    }
}
