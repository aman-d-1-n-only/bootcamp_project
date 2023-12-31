using BankApi.Models;
using BankApi.Services;
using BankApi.Entities;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;

namespace BankApi.Controllers
{
    [ApiController]
    [Route("api/customer/{CustId:int}/account")]

    public class AccountController : ControllerBase
    {

        private readonly IBankRepository _bankRepository;
        private readonly IMapper _mapper;

        public AccountController(IBankRepository bankRepository, IMapper mapper)
        {
            _bankRepository = bankRepository ?? throw new ArgumentNullException(nameof(BankRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AccountDTO>>> GetAccounts( [FromRoute] int CustId)
        {   
            if( !await _bankRepository.CustomerExistsAsync(CustId)){
                return NotFound();
            }
            var accounts = await _bankRepository.GetAccountsOfCustomerAsync(CustId);
            return Ok(_mapper.Map<IEnumerable<RespAccountDTO>>(accounts));
        }


        [HttpPost]
        public async Task<ActionResult<AccountDTO>> CreateAccount([FromRoute] int CustId , AccountDTO newAcccount ){
               
            if (!await _bankRepository.CustomerExistsAsync(CustId)){
                return NotFound();
            }
            var account = _mapper.Map<Account>(newAcccount);
            await _bankRepository.AddAccountForCustomerAsync( CustId , account );
            await _bankRepository.SaveChangesAsync();
            var respAccount = _mapper.Map<RespAccountDTO>(account);
            return Ok(respAccount);
        }

        [HttpPut, Route("{AccId:int}")]
        public async Task<IActionResult> UpdateAccount([FromRoute] int CustId, int AccId , AccountDTO updatedAccount )
        {
            if (!await _bankRepository.CustomerExistsAsync(CustId))
            {
                return NotFound();
            }
            var account = await _bankRepository.GetAccountOfCustomerAsync(CustId, AccId);
            if (account == null)
            {
                return NotFound();
            }
            _mapper.Map(updatedAccount, account);
            await _bankRepository.SaveChangesAsync();
            return Ok("Update is done");
        }

        [HttpDelete, Route("{AccId:int}")]
        public async Task<ActionResult> DeleteAccount([FromRoute] int CustId, int AccId )
        {
            if (!await _bankRepository.CustomerExistsAsync(CustId))
            {
                return NotFound();
            }
            var account = await _bankRepository.GetAccountOfCustomerAsync(CustId, AccId);
            if (account == null)
            {
                return NotFound();
            }
            _bankRepository.DeleteAccount(account);
            await _bankRepository.SaveChangesAsync();
            return Ok("Delete is done");
        }
    }
}