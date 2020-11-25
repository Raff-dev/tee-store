using System.Runtime.Serialization;
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
    public class UsersController : ControllerBase
    {
        private readonly VapeShopContext db;

        public UsersController(VapeShopContext context)
        {
            db = context;
        }

        public partial class UserDto : User
        {
            public IFormFile MediaFile { get; set; }
            public List<int> ReviewsIds { get; set; }
        }

        private async Task<User> UserDtoToUser(UserDto userDto)
        {
            List<Review> reviews = new List<Review>();
            foreach (int id in userDto.ReviewsIds)
            {
                var review = await db.Reviews.FindAsync(id);
                reviews.Add(review);
            }
            Media media = await Utils.IFormFileToMedia(userDto.MediaFile);

            User user = new User
            {
                Name = userDto.Name,
                Surname = userDto.Surname,
                Email = userDto.Email,
                DisplayName = userDto.DisplayName,
                CreationTimestamp = userDto.CreationTimestamp,
                BirthDayDate = userDto.BirthDayDate,
                Reviews = reviews,
                Media = media,
            };

            return user;
        }

        // GET: api/Users
        [HttpGet]
        public IEnumerable<User> GetUsers()
        {
            return db.Users;
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await db.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser([FromRoute] int id, [FromForm] UserDto userDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != userDto.Id)
            {
                return BadRequest();
            }
            User user = await UserDtoToUser(userDto);

            db.Entry(user).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/Users
        [HttpPost]
        public async Task<IActionResult> PostUser([FromForm] UserDto userDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            User user = await UserDtoToUser(userDto);

            db.Users.Add(user);
            await db.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await db.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            db.Users.Remove(user);
            await db.SaveChangesAsync();

            return Ok(user);
        }

        [HttpPost("[action]")]
        public bool UserEmailExists([FromForm] string email)
        {
            Console.WriteLine(email);
            return db.Users.Any(e => e.Email.ToLower() == email.ToLower());
        }

        private bool UserExists(int id)
        {
            return db.Users.Any(e => e.Id == id);
        }

    }
}