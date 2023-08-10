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

        [HttpPut,Route("edit")]
        public IActionResult EditAccount( Account a )
        {   

            /**Implementaion Here**/
            
            return Ok($"{a.a_id} info is updated");
        }

        [HttpDelete,Route("delete")]
        public IActionResult DeleteAccount( Account a )
        {  
            /**Implementaion Here**/

            return Ok($"{a.a_id} info is deleted");
        }

       
    }
}