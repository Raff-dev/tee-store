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
        private readonly VapeShopContext _context;

        public AdminController(VapeShopContext context)
        {
            _context = context;
        }


        // GET: api/Medias
        [HttpGet("[action]")]
        public IEnumerable<string> Models()
        {
            string[] excluded = new string[] { "Database", "ChangeTracker", "Model" };

            IEnumerable<string> models = from prop in _context.GetType().GetProperties()
                                         where !excluded.Contains(prop.Name)
                                         select prop.Name;
            return models;
        }
    }
}
