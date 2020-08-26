using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VapeShop.Models;

namespace VapeShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly VapeShopContext db;

        public CategoriesController(VapeShopContext context)
        {
            db = context;
        }

        // GET: api/Categories
        [HttpGet]
        public IEnumerable<Category> GetCategory()
        {
            return db.Categories;
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategory([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var Category = await db.Categories.FindAsync(id);

            if (Category == null)
            {
                return NotFound();
            }

            return Ok(Category);
        }

        // PUT: api/Categories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory([FromRoute] int id, [FromBody] Category Category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != Category.Id)
            {
                return BadRequest();
            }

            db.Entry(Category).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        public class CategoryDto
        {
            public string Name { get; set; }
            public IFormFile Medias { get; set; }
        }

        // POST: api/Categories
        [HttpPost]
        public async Task<IActionResult> PostCategory([FromForm] CategoryDto CategoryDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var Medias = CategoryDto.Medias;

            if (Medias == null)
            {
                return BadRequest("No Media file attached");
            }

            var filePath = Path.GetTempFileName();

            using (var stream = System.IO.File.Create(filePath))
            {
                await Medias.CopyToAsync(stream);
            }

            Category Category = new Category
            {
                Name = CategoryDto.Name,
            };

            Media Media = new Media
            {
                Category = Category,
                MediaFilePath = filePath
            };

            db.Medias.Add(Media);
            db.Categories.Add(Category);
            await db.SaveChangesAsync();
            Console.WriteLine("REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
            Console.WriteLine("REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
            Console.WriteLine("REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
            Console.WriteLine(Category.Medias.First().MediaFilePath);

            return CreatedAtAction("PostCategory", new { CategoryId = Category.Id }, Category);
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var Category = await db.Categories.FindAsync(id);
            var CategoryMedias = db.Medias.Where(m => m.Category == Category);
            var CategoryProducts = db.Products.Where(p => p.Category == Category);
            var CategoryProductsMedias = CategoryProducts.SelectMany(p => p.Medias);


            if (Category == null)
            {
                return NotFound();
            }

            db.Categories.Remove(Category);
            db.Products.RemoveRange(CategoryProducts);
            db.Medias.RemoveRange(CategoryMedias);
            db.Medias.RemoveRange(CategoryProductsMedias);
            await db.SaveChangesAsync();

            return Ok(Category);
        }

        private bool CategoryExists(int id)
        {
            return db.Categories.Any(e => e.Id == id);
        }
    }
}