using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BankApi.Models;
using BankApi.Contexts;

namespace BankApi.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : Controller
    {
        private readonly BankApiContext dbContext;
        public CustomerController(BankApiContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetCustomers(){
            return Ok(await dbContext.Customer.ToListAsync());
        }

        [HttpPost,Route("create")]
        public async Task<IActionResult> CreateCustomer( Customer c)
        {   

            await dbContext.Customer.AddAsync(c);
            await dbContext.SaveChangesAsync();
            return Ok(c);
        }

        [HttpPut,Route("edit")]
        public IActionResult EditCustomer( Customer c )
        {   

            /**Implementaion Here**/
            
            return Ok($"{c.c_id} info is updated");
        }

        [HttpDelete,Route("delete")]
        public IActionResult DeleteCustomer( Customer c )
        {  
            /**Implementaion Here**/

            return Ok($"{c.c_id} info is deleted");
        }

       
    }
}