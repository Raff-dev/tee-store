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

        [ForeignKey("UserId")]
        public User User { get; set; }
        public int? UserId { get; set; }

        [ForeignKey("ProductId")]
        public Product Product { get; set; }
        public int? ProductId { get; set; }

        [ForeignKey("CategoryId")]
        public Category Category { get; set; }
        public int? CategoryId { get; set; }
    }
}
