using System.IO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VapeShop.Models;
using Newtonsoft.Json.Linq;
using System.Diagnostics;

namespace VapeShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly VapeShopContext db;
        public ProductsController(VapeShopContext context)
        {
            db = context;
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var Product = await db.Products.FindAsync(id);

            if (Product == null)
            {
                return NotFound();
            }

            return Ok(Product);
        }

        // GET: api/Products
        [HttpGet]
        public IEnumerable<Product> GetAll()
        {
            var products = db.Products.Include(p => p.Medias);
            IEnumerable<ProductServe> productsServe = from product in products select new ProductServe(product);
            return productsServe;
        }

        // PUT: api/Products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] int id, [FromForm] ProductRecieve ProductRecieve)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            if (id != ProductRecieve.Id)
            {
                return BadRequest();
            }
            List<IFormFile> mediaFiles = ProductRecieve.MediaFiles;

            if (mediaFiles == null || mediaFiles.Count() == 0)
            {
                return BadRequest("No Media file attached");
            }

            List<Media> medias = new List<Media>();

            foreach (IFormFile mediaFile in mediaFiles)
            {
                medias.Add(await Utils.IFormFileToMedia(mediaFile));
            }
            Product product = ProductRecieveToProduct(ProductRecieve, medias);

            db.Entry(product).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Exists(id))
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

        // POST: api/Products
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] ProductRecieve ProductRecieve)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            List<IFormFile> mediaFiles = ProductRecieve.MediaFiles;
            if (mediaFiles == null || mediaFiles.Count() == 0)
            {
                return BadRequest("No Media file attached");
            }

            List<Media> medias = new List<Media>();
            foreach (IFormFile mediaFile in mediaFiles)
            {
                medias.Add(await Utils.IFormFileToMedia(mediaFile));
            }

            Product product = ProductRecieveToProduct(ProductRecieve, medias);
            db.Products.Add(product);

            await db.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var Product = await db.Products.FindAsync(id);
            if (Product == null)
            {
                return NotFound();
            }
            var productMedias = db.Medias.Where(m => m.ProductId == id);
            var productReviews = db.Reviews.Where(r => r.ProductId == id);

            db.Medias.RemoveRange(productMedias);
            db.Reviews.RemoveRange(productReviews);
            db.Products.Remove(Product);
            await db.SaveChangesAsync();

            return Ok(Product);
        }

        [HttpGet("[action]/{categoryName}")]
        public IEnumerable<Product> OfCategory([FromRoute] string categoryName)
        {
            var categoryProducts = db.Products.Where(p => p.CategoryName == categoryName).Include(p => p.Medias);
            IEnumerable<ProductServe> categoryProductsServe = from product in categoryProducts select new ProductServe(product);
            return categoryProductsServe;
        }

        [HttpGet("[action]")]
        private bool Exists(int id)
        {
            return db.Products.Any(e => e.Id == id);
        }

        public partial class ProductRecieve : Product
        {
            public List<IFormFile> MediaFiles { get; set; }
            public bool DiscountDisabled { get; set; }
        }

        public partial class ProductServe : Product
        {
            public IEnumerable<string> MediaFilesSources { get; set; }

            public ProductServe(Product product)
            {
                this.Name = product.Name;
                this.Brand = product.Brand;
                this.CategoryName = product.CategoryName;
                this.Price = product.Price;
                this.Discount = product.Discount;
                this.MediaFilesSources = from media in product.Medias
                                         select Utils.PathToFileSource(media.MediaFilePath);
            }
        }

        private Product ProductRecieveToProduct(ProductRecieve productRecieve, List<Media> medias = null)
        {
            Product product = new Product
            {
                Name = productRecieve.Name,
                Brand = productRecieve.Brand,
                CategoryName = productRecieve.CategoryName,
                Price = productRecieve.Price,
                Discount = productRecieve.DiscountDisabled ? productRecieve.Discount : 0,
                Medias = medias
            };
            return product;
        }
    }
}