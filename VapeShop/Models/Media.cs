using System;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VapeShop.Models
{
    public class Media
    {
        public int ID { get; set; }

        [Required]
        [ForeignKey("MediaAssignment")]
        public int MediaAssignmentID { get; set; }
        public virtual MediaAssignment MediaAssignment { get; set; }

        [Required]
        public string MediaFilePath { get; set; }
    }
}
