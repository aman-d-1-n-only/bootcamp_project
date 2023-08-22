using BankApi.Models ;
using BankApi.Services;
using BankApi.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;

namespace BankApi.Controllers{
    [ApiController]
    [Authorize]
    [Route("api/customer")]

    public class CustomerController : ControllerBase {

        private readonly IBankRepository _bankRepository;
        private readonly IMapper _mapper ;

        public CustomerController( IBankRepository bankRepository , IMapper mapper ){
            _bankRepository = bankRepository ?? throw new ArgumentNullException(nameof(BankRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerWithoutAccountDTO>>> GetCustomers(){
            var customers = await _bankRepository.GetCustomersAsync();
            return Ok(_mapper.Map<IEnumerable<RespCustomerDTO>>(customers));
        }


        [HttpPost]
        public async Task<ActionResult<CustomerWithoutAccountDTO>> CreateCustomer(CustomerWithoutAccountDTO newCustomer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var customer = _mapper.Map<Customer>(newCustomer);
            await _bankRepository.AddCustomerAsync(customer);
            await _bankRepository.SaveChangesAsync();
            var respCustomer = _mapper.Map<RespCustomerDTO>(customer);
            return Ok(respCustomer);
        }

        [HttpPut,Route("{CustId:int}")]
        public async Task<ActionResult> UpdateCustomer( [FromRoute] int CustId , CustomerWithoutAccountDTO updatedCustomer ){
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (!await _bankRepository.CustomerExistsAsync(CustId))
            {
                return NotFound($"There is no customer with customer id : {CustId}");
            }
            var customer = await _bankRepository.GetCustomerAsync(CustId); 
            _mapper.Map(updatedCustomer , customer );
            await _bankRepository.SaveChangesAsync();
            var respCustomer = _mapper.Map<RespCustomerDTO>(customer);
            return Ok(respCustomer);
        }

        [HttpDelete,Route("{CustId:int}")]
        public async Task<ActionResult> DeleteCustomer( [FromRoute] int CustId ){
            if (!await _bankRepository.CustomerExistsAsync(CustId))
            {
                return NotFound($"There is no customer with customer id : {CustId}");
            }
            var customer = await _bankRepository.GetCustomerAsync(CustId);
            _bankRepository.DeleteCustomer(customer);
            await _bankRepository.SaveChangesAsync();
            var respCustomer = _mapper.Map<RespCustomerDTO>(customer);
            return Ok(respCustomer);
        }

    }
}