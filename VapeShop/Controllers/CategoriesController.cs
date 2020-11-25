using System.Diagnostics;
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

        public class CategoryDto
        {
            public string Name { get; set; }
            public IFormFile MediaFile { get; set; }
        }

        // GET: api/Categories
        [HttpGet]
        public IEnumerable<Category> GetCategory()
        {
            return db.Categories.Include(c => c.Products);
        }

        // GET: api/Categories/name
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategory([FromRoute] int name)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var Category = await db.Categories.FindAsync(name);

            if (Category == null)
            {
                return NotFound();
            }

            return Ok(Category);
        }

        // PUT: api/Categories/name
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory([FromRoute] string name, [FromBody] Category Category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (name != Category.Name)
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
                if (!CategoryExists(name))
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

        // POST: api/Categories
        [HttpPost]
        public async Task<IActionResult> PostCategory([FromForm] CategoryDto categoryDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var mediaFile = categoryDto.MediaFile;

            if (mediaFile == null)
            {
                return BadRequest("No Media file attached");
            }

            Media media = await Utils.IFormFileToMedia(mediaFile);

            Category category = new Category
            {
                Name = categoryDto.Name,
                Media = media,
            };

            media.Category = category;

            db.Medias.Add(media);
            db.Categories.Add(category);
            await db.SaveChangesAsync();

            return CreatedAtAction("PostCategory", new { CategoryName = category.Name }, category);
        }

        // DELETE: api/Categories/Name
        [HttpDelete("{name}")]
        public async Task<IActionResult> DeleteCategory([FromRoute] string name)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var Category = await db.Categories.FindAsync(name);
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

        [HttpPost("[action]")]
        public bool CategoryExists([FromForm] string name)
        {
            Console.WriteLine(name);
            return db.Categories.Any(e => e.Name == name);
        }
    }
}