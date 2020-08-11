using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Emit;
using System.Threading;

namespace WebApp.Models
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

        [Display(Name = "Display Name")]
        [StringLength(60, MinimumLength = 3)]
        public string DisplayName
        {
            set
            {
                DisplayName = value;
            }

            get
            {
                return DisplayName == null ? DisplayName : Name + " " + Surname.Substring(0, 1) + ".";
            }
        }

        [Display(Name = "Creation Date")]
        [DataType(DataType.DateTime)]
        public DateTime CreationDate = DateTime.Now;

        [Display(Name = "Birthday Date")]
        [DataType(DataType.Date)]
        public DateTime BirthDayDate { get; set; }

    }
}
