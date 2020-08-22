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

        // GET: api/Products
        [HttpGet("{category}", Name = "")]
        public IEnumerable<Product> GetProductsOfCategory([FromRoute] string category)
        {
            var categoryProducts = from product in _context.Products
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

        public partial class ProductPostModel : Product
        {
            public List<IFormFile> MediaFiles { get; set; }
        }

        // POST: api/Products
        [HttpPost]
        public async Task<IActionResult> PostProduct([FromBody] JObject data)
        {
            Product product = data["product"].ToObject<Product>();
            List<IFormFile> mediaFiles = data["media"].ToObject<List<IFormFile>>();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            foreach (IFormFile mediaFile in mediaFiles)
            {
                if (mediaFiles.Count > 0)
                {
                    var filePath = Path.GetTempFileName();

                    using (var stream = System.IO.File.Create(filePath))
                    {
                        await mediaFile.CopyToAsync(stream);
                    }

                    _context.Medias.Add(
                        new Media
                        {
                            MediaFilePath = filePath,
                            MediaAssignmentID = product.ID
                        }
                    );
                }
            }

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