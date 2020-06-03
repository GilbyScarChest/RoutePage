using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RoutePage.Data;

namespace RoutePage.Service.Controllers
{
    [Produces("application/json")]
    [Consumes("application/json")]
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class RoutePageController : ControllerBase
    {
        private readonly RouteDbContext _db;

        private readonly ILogger<RoutePageController> _logger;

        public RoutePageController(ILogger<RoutePageController> logger, RouteDbContext dbcontext)
        {
            _logger = logger;
            _db = dbcontext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = _db.Users.ToList();
            if (users.Count != 0)
            {
                return await Task.FromResult(Ok(users));
            }
            return await Task.FromResult(NoContent());
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var user = _db.Users.Find(id);
            if (user != null)
            {
                return await Task.FromResult(Ok(user));
            }
            return await Task.FromResult(NotFound());
        }
        [HttpPost]
        public async Task<IActionResult> Post(User u)
        {
            if (ModelState.IsValid)
            {
                _db.Add(u);
                _db.SaveChanges();
                return await Task.FromResult(Ok(u));
            }
            return await Task.FromResult(BadRequest());
        }
        [HttpPut]
        public async Task<IActionResult> Update(User u)
        {
            if (ModelState.IsValid)
            {
                var foundUser = _db.Users.FirstOrDefault(user => user.UserId == u.UserId);
                if (foundUser == null)
                {
                    return await Task.FromResult(NotFound());
                }
                foundUser.Username = u.Username;
                foundUser.Password = u.Password;
                foundUser.Email = u.Email;
                foundUser.Address = u.Address;
                _db.SaveChanges();
                
                return await Task.FromResult(Ok(foundUser));
            }
            return await Task.FromResult(BadRequest());
        }
        [HttpDelete]
        public async Task<IActionResult> Delete(User u)
        {
            if (ModelState.IsValid)
            {
                var foundUser =  _db.Users.FirstOrDefault(user => user.UserId == u.UserId);
                if (foundUser == null)
                {
                    return await Task.FromResult(NotFound());
                }
                _db.Users.Remove(foundUser);
                _db.SaveChanges();
                return await Task.FromResult(Ok(u));
            }
            return await Task.FromResult(BadRequest());
        }
    }
}
