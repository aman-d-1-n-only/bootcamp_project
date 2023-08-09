using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BankApi.Models;
using BankApi.Contexts;

namespace BankApi.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : Controller
    {
        private readonly AdminContext dbContext;
        public AdminController(AdminContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAdmins(){
            return Ok(await dbContext.Admin.ToListAsync());
        }
        [HttpPost]
        public async Task<IActionResult> AdminSignUp(AdminRequest a)
        {
            var random = new Random();
            var admin = new Admin()
            {
                id = random.Next(101, 999),
                username = a.username,
                password = a.password
            };
            await dbContext.Admin.AddAsync(admin);
            await dbContext.SaveChangesAsync();

            return Ok(admin);
        }

        // [HttpPost]
        // public IActionResult AdminLogin(AdminRequest a )
        // {

        //     //login functionality  
        //     var user = a.username;

        //     if (user != "" )
        //     {
        //         //sign in
        //         return Ok($"Hi {user}") ; 
                
        //     }
        //     return Ok("Invalid Credentials.");

        // }

        // [HttpPost]
        // public  IActionResult AdminLogout(AdminRequest a)
        // {
        //     return Ok("You are logged out.");
        // }
    }
}