using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using VapeShop.Models;

namespace VapeShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly VapeShopContext db;

        public AdminController(VapeShopContext context)
        {
            db = context;
        }


        // GET: api/Medias
        [HttpGet("[action]")]
        public IEnumerable<string> Models()
        {
            string[] excluded = new string[] { "Database", "ChangeTracker", "Model" };

            IEnumerable<string> models = from prop in db.GetType().GetProperties()
                                         where !excluded.Contains(prop.Name)
                                         select prop.Name;
            return models;
        }


        [HttpGet("[action]")]
        public IEnumerable<string> Form(string modelName)
        {

            return null;
        }

        public enum FieldTypes { text, asd, date }

        public class FormInfoViewModel
        {
            public string PropertyName { get; set; }

        }
    }



}
