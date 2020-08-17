using System;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VapeShop.Models
{
    public class MediaAssignment
    {
        public int ID { get; set; }

        public virtual ICollection<Media> Medias { get; set; }
    }
}
