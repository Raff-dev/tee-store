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

        // GET: api/Categories/name
        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] int name)
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

        // GET: api/Categories/
        [HttpGet]
        public IEnumerable<CategoryServe> GetAll()
        {
            var categories = db.Categories.Include(c => c.Media);
            IEnumerable<CategoryServe> categoriesDto = from category in categories
                                                       select new CategoryServe(category);
            return categoriesDto;
        }

        // PUT: api/Categories/name
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Entry(category).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Exists(category.Name))
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
        public async Task<IActionResult> Post([FromForm] CategoryRecieve categoryDto)
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
        public async Task<IActionResult> Delete([FromRoute] string name)
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

        // GET: api/Categories/WithProducts
        [HttpGet("[action]")]
        public IEnumerable<Category> WithProducts()
        {
            return db.Categories.Include(c => c.Products);
        }

        // GET: api/Categories/Exists
        [HttpGet("[action]")]
        public bool Exists([FromForm] string name)
        {
            Console.WriteLine(name);
            return db.Categories.Any(c => c.Name == name);
        }

        public partial class CategoryRecieve
        {
            public string Name { get; set; }
            public IFormFile MediaFile { get; set; }
        }

        public partial class CategoryServe
        {
            public string Name { get; set; }
            public string MediaFileSource { get; set; }

            public CategoryServe(Category category)
            {
                this.Name = category.Name;
                this.MediaFileSource = Utils.PathToFileSource(category.Media.MediaFilePath);
            }
        }

    }
}