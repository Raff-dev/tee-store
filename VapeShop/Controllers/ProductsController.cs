using System.IO;
using System;
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
    public class ProductsController : ControllerBase
    {
        private readonly VapeShopContext _context;

        public ProductsController(VapeShopContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public IEnumerable<Product> GetProduct()
        {
            return _context.Products;
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var Product = await _context.Products.FindAsync(id);

            if (Product == null)
            {
                return NotFound();
            }

            return Ok(Product);
        }

        // PUT: api/Products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct([FromRoute] int id, [FromBody] Product Product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != Product.ID)
            {
                return BadRequest();
            }

            _context.Entry(Product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
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
        public async Task<IActionResult> PostProduct([FromBody] Product Product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Products.Add(Product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = Product.ID }, Product);
        }

        public class ProductPostModel
        {
            public string Name { get; set; }
            public string Brand { get; set; }
            public int CategoryID { get; set; }
            public decimal Price { get; set; }
            public List<IFormFile> Medias { get; set; }
            public int Discount { get; set; }
            public DateTime DiscountExpirationDate { get; set; }
        }

        [HttpPost]
        public async Task<IActionResult> PostProduct(
            [FromBody] ProductPostModel productPostModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            MediaAssignment mediaAssignment = new MediaAssignment();
            _context.MediaAssignments.Add(mediaAssignment);

            List<IFormFile> mediaFiles = productPostModel.Medias;
            foreach (IFormFile mediaFile in mediaFiles)
            {
                if (mediaFiles.Count > 0)
                {
                    var filePath = Path.GetTempFileName();

                    using (var stream = System.IO.File.Create(filePath))
                    {
                        await mediaFile.CopyToAsync(stream);
                    }

                    Media media = new Media
                    {
                        MediaFilePath = filePath,
                        MediaAssignment = mediaAssignment
                    };
                    _context.Medias.Add(media);
                }
            }

            Category category = await _context.Categories.FindAsync(productPostModel.CategoryID);

            if (category == null)
            {
                return NotFound();
            }

            Product product = new Product
            {
                Name = productPostModel.Name,
                Brand = productPostModel.Brand,
                Category = category,
                Price = productPostModel.Price,
                Discount = productPostModel.Discount,
                DiscountExpirationDate = productPostModel.DiscountExpirationDate,
                MediaAssignment = mediaAssignment
            };

            _context.Products.Add(product);

            await _context.SaveChangesAsync();
            return CreatedAtAction("GetProduct", new { id = product.ID }, product);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var Product = await _context.Products.FindAsync(id);
            if (Product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(Product);
            await _context.SaveChangesAsync();

            return Ok(Product);
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.ID == id);
        }
    }
}