using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BankApi.Models;
using BankApi.Contexts;

namespace BankApi.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly BankApiContext dbContext;
        public AccountController(BankApiContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAccount(){
            return Ok(await dbContext.Account.ToListAsync());
        }

        [HttpPost,Route("create")]
        public async Task<IActionResult> CreateAccount( Account a)
        {   

            await dbContext.Account.AddAsync(a);
            await dbContext.SaveChangesAsync();
            return Ok(a);
        }


        [HttpDelete, Route("delete/{id:int}")]
        public async Task<IActionResult> DeleteAccount([FromRoute] int id)
        {
            /**Implementaion Here**/
            var account = await dbContext.Account.FindAsync(id);
            if ( account != null)
            {
                dbContext.Remove(account);
                await dbContext.SaveChangesAsync();
                return Ok(account);
            }
            return NotFound();
        }


    }
}