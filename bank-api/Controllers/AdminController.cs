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
        private readonly BankApiContext dbContext;
        public AdminController( BankApiContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAdmins(){
            return Ok(await dbContext.Admin.ToListAsync());
        }
        
        [HttpPost,Route("SignUp")]
        public async Task<IActionResult> AdminSignUp(AdminRequest a)
        {
            var admin = new Admin()
            {
                username = a.username,
                password = a.password
            };
            await dbContext.Admin.AddAsync(admin);
            await dbContext.SaveChangesAsync();

            return Ok(admin);
        }

        [HttpPost,Route("Login")]
        public IActionResult AdminLogin(AdminRequest a )
        {

            //login functionality  
            var user = a.username;

            if (user != "" )
            {
                //sign in
                return Ok($"Hi {user}") ; 
                
            }
            return Ok("Invalid Credentials.");

        }

        [HttpPost,Route("Logout")]
        public  IActionResult AdminLogout(AdminRequest a)
        {
            return Ok("You are logged out.");
        }
    }
}