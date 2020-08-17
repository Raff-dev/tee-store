using System;
using System.ComponentModel.DataAnnotations;

namespace VapeShop.Models
{
    public class Category
    {
        public int ID { get; set; }

        [Required]
        public string Name { get; set; }

        public MediaAssignment MediaAssignment { get; set; }
    }
}
