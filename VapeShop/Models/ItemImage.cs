using System;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VapeShop.Models
{
    public class ItemImage
    {
        public int ID { get; set; }

        [Required]
        public Item Item { get; set; }

        [Required]
        public string ImageFilePath { get; set; }
    }
}
