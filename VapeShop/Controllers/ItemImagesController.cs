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
    public class MediasController : ControllerBase
    {
        private readonly VapeShopContext _context;

        public MediasController(VapeShopContext context)
        {
            _context = context;
        }

        // GET: api/Medias
        [HttpGet]
        public IEnumerable<Media> GetMedia()
        {
            return _context.Medias;
        }

        // GET: api/Medias/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMedia([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var Media = await _context.Medias.FindAsync(id);

            if (Media == null)
            {
                return NotFound();
            }

            return Ok(Media);
        }

        // PUT: api/Medias/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedia([FromRoute] int id, [FromBody] Media Media)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != Media.ID)
            {
                return BadRequest();
            }

            _context.Entry(Media).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MediaExists(id))
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

        // POST: api/Medias
        [HttpPost]
        public async Task<IActionResult> PostMedia([FromBody] Media Media)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Medias.Add(Media);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMedia", new { id = Media.ID }, Media);
        }

        // DELETE: api/Medias/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedia([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var Media = await _context.Medias.FindAsync(id);
            if (Media == null)
            {
                return NotFound();
            }

            _context.Medias.Remove(Media);
            await _context.SaveChangesAsync();

            return Ok(Media);
        }

        private bool MediaExists(int id)
        {
            return _context.Medias.Any(e => e.ID == id);
        }
    }
}