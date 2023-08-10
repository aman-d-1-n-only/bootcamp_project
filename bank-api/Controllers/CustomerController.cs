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
        public async Task<IActionResult> CreateCustomer( Customer customer )
        {   

            await dbContext.Customer.AddAsync(customer);
            await dbContext.SaveChangesAsync();
            return Ok(customer);
        }

        [HttpPut,Route("edit/{id:int}")]
        public async Task<IActionResult> EditCustomer( [FromRoute] int id,  CustomerRequest updateCustomer )
        {   

            /**Implementaion Here**/
            var customer = await dbContext.Customer.FindAsync(id);
            if( customer != null ){
                customer.fname = updateCustomer.fname ;
                customer.lname = updateCustomer.lname ;
                customer.address = updateCustomer.address ;
                customer.city = updateCustomer.city ;
                customer.email = updateCustomer.email;
                customer.contact = updateCustomer.contact;
                customer.card_no = updateCustomer.card_no;
                customer.pin = updateCustomer.pin;
                customer.balance = updateCustomer.balance;
                await dbContext.SaveChangesAsync();
                return Ok(customer);
            }
            return NotFound();
        }

        [HttpDelete,Route("delete/{id:int}")]
        public async Task<IActionResult> DeleteCustomer( [FromRoute] int id )
        {  
            /**Implementaion Here**/
            var customer = await dbContext.Customer.FindAsync(id);
            if( customer != null ){
                dbContext.Remove(customer);
                await dbContext.SaveChangesAsync();
                return Ok(customer);
            } 
            return NotFound();
        }

       
    }
}