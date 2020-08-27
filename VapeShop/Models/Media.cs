using System;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VapeShop.Models
{
    public class Media
    {
        public int Id { get; set; }

        [Required]
        public string MediaFilePath { get; set; }

        [ForeignKey("UserUserEmail")]
        public User User { get; set; }
        public int? UserId { get; set; }

        [ForeignKey("ProductId")]
        public Product Product { get; set; }
        public int? ProductId { get; set; }

        [ForeignKey("CategoryName")]
        public Category Category { get; set; }
        public string CategoryName { get; set; }
    }
}
