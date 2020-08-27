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
        public partial class ProductDto : Product
        {
            public List<IFormFile> MediaFiles { get; set; }
            public bool DiscountDisabled { get; set; }
        }

        private Product ProductDtoToProduct(ProductDto productDto)
        {
            Product product = new Product
            {
                Name = productDto.Name,
                Brand = productDto.Brand,
                CategoryName = productDto.CategoryName,
                Price = productDto.Price,
                Discount = productDto.DiscountDisabled
                            ? productDto.Discount
                            : 0,
            };
            return product;
        }
        // GET: api/Products
        [HttpGet]
        public IEnumerable<Product> GetProducts()
        {
            return db.Products;
        }

        // GET: api/Products
        [HttpGet("{category}", Name = "")]
        public IEnumerable<Product> GetProductsOfCategory([FromRoute] string category)
        {
            var categoryProducts = from product in db.Products
                                   where product.Category.Name.Equals(category)
                                   select product;

            return categoryProducts;
        }


        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct([FromRoute] int id)
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

        // PUT: api/Products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct([FromRoute] int id, [FromForm] ProductDto productDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            if (id != productDto.Id)
            {
                return BadRequest();
            }
            List<IFormFile> mediaFiles = productDto.MediaFiles;

            if (mediaFiles == null || mediaFiles.Count() == 0)
            {
                return BadRequest("No Media file attached");
            }

            Product product = ProductDtoToProduct(productDto);
            List<Media> medias = new List<Media>();

            foreach (IFormFile mediaFile in mediaFiles)
            {
                medias.Add(await Utils.IFormFileToMedia(mediaFile));
            }
            product.Medias = medias;

            db.Entry(product).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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
        public async Task<IActionResult> PostProduct([FromForm] ProductDto productDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            List<IFormFile> mediaFiles = productDto.MediaFiles;

            if (mediaFiles == null || mediaFiles.Count() == 0)
            {
                return BadRequest("No Media file attached");
            }

            Product product = ProductDtoToProduct(productDto);
            List<Media> medias = new List<Media>();

            foreach (IFormFile mediaFile in mediaFiles)
            {
                medias.Add(await Utils.IFormFileToMedia(mediaFile));
            }
            product.Medias = medias;
            db.Products.Add(product);

            await db.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] int id)
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

            db.Products.Remove(Product);
            await db.SaveChangesAsync();

            return Ok(Product);
        }

        [HttpGet("action")]
        private bool ProductExists(int id)
        {
            return db.Products.Any(e => e.Id == id);
        }
    }
}