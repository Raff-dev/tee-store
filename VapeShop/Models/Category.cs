using System;
using System.ComponentModel.DataAnnotations;

namespace VapeShop.Models
{
    public partial class Category : MediaAssignment
    {
        [StringLength(30, MinimumLength = 3)]
        [RegularExpression(@"^[a-zA-Z0-9]+$",
            ErrorMessage = "Special characters are not allowed.")]
        [Required]
        public string Name { get; set; }
    }
}
