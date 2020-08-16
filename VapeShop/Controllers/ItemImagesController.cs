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
    public class ItemImagesController : ControllerBase
    {
        private readonly VapeShopContext _context;

        public ItemImagesController(VapeShopContext context)
        {
            _context = context;
        }

        // GET: api/ItemImages
        [HttpGet]
        public IEnumerable<ItemImage> GetItemImage()
        {
            return _context.ItemImage;
        }

        // GET: api/ItemImages/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetItemImage([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var itemImage = await _context.ItemImage.FindAsync(id);

            if (itemImage == null)
            {
                return NotFound();
            }

            return Ok(itemImage);
        }

        // PUT: api/ItemImages/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItemImage([FromRoute] int id, [FromBody] ItemImage itemImage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != itemImage.ID)
            {
                return BadRequest();
            }

            _context.Entry(itemImage).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemImageExists(id))
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

        // POST: api/ItemImages
        [HttpPost]
        public async Task<IActionResult> PostItemImage([FromBody] ItemImage itemImage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.ItemImage.Add(itemImage);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetItemImage", new { id = itemImage.ID }, itemImage);
        }

        // DELETE: api/ItemImages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItemImage([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var itemImage = await _context.ItemImage.FindAsync(id);
            if (itemImage == null)
            {
                return NotFound();
            }

            _context.ItemImage.Remove(itemImage);
            await _context.SaveChangesAsync();

            return Ok(itemImage);
        }

        private bool ItemImageExists(int id)
        {
            return _context.ItemImage.Any(e => e.ID == id);
        }
    }
}