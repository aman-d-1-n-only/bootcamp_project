using BankApi.Models;
using BankApi.Services;
using BankApi.Entities;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;

namespace BankApi.Controllers
{
    [ApiController]
    [Authorize]
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
        public async Task<ActionResult<IEnumerable<RespAccountDTO>>> GetAccounts( [FromRoute] int CustId)
        {   
            if( !await _bankRepository.CustomerExistsAsync(CustId)){
                return NotFound($"There is no customer with customer id : {CustId}");
            }
            var accounts = await _bankRepository.GetAccountsOfCustomerAsync(CustId);
            return Ok(_mapper.Map<IEnumerable<RespAccountDTO>>(accounts));
        }


        [HttpPost]
        public async Task<ActionResult<AccountDTO>> CreateAccount([FromRoute] int CustId , AccountDTO newAcccount ){
            if (!ModelState.IsValid){
                return BadRequest(ModelState);
            }
            if (!await _bankRepository.CustomerExistsAsync(CustId)){
                return NotFound($"There is no customer with customer id : {CustId}");
            }
            var account = _mapper.Map<Account>(newAcccount);
            await _bankRepository.AddAccountForCustomerAsync( CustId , account );
            await _bankRepository.SaveChangesAsync();
            var respAccount = _mapper.Map<RespAccountDTO>(account);
            return Ok(respAccount);
        }


        [HttpGet, Route("{AccId:int}")]
        public async Task<IActionResult> GetAccount([FromRoute] int CustId, int AccId  )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (!await _bankRepository.CustomerExistsAsync(CustId))
            {
                return NotFound($"There is no customer with customer id : {CustId}");
            }
            var account = await _bankRepository.GetAccountOfCustomerAsync(CustId, AccId);
            if (account == null)
            {
                return NotFound($"There is no account with account number :{AccId}");
            }
            
            var respAccount = _mapper.Map<RespAccountDTO>(account);
            return Ok(respAccount);
        }

        [HttpPut, Route("{AccId:int}")]
        public async Task<IActionResult> UpdateAccount([FromRoute] int CustId, int AccId , UpdateAccountDTO updatedAccount )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (!await _bankRepository.CustomerExistsAsync(CustId))
            {
                return NotFound($"There is no customer with customer id : {CustId}");
            }
            var account = await _bankRepository.GetAccountOfCustomerAsync(CustId, AccId);
            if (account == null)
            {
                return NotFound($"There is no account with account number :{AccId}");
            }else if( account.Enable ==  updatedAccount.Enable ){
                return NotFound($"The account with account number :{AccId} is disabled by bank.");
            }
            _mapper.Map(updatedAccount, account);
            await _bankRepository.SaveChangesAsync();
            var respAccount = _mapper.Map<RespAccountDTO>(account);
            return Ok(respAccount);
        }


        [HttpDelete, Route("{AccId:int}")]
        public async Task<ActionResult> DeleteAccount([FromRoute] int CustId, int AccId )
        {
            if (!await _bankRepository.CustomerExistsAsync(CustId))
            {
                return NotFound($"There is no customer with customer id : {CustId}");
            }
            var account = await _bankRepository.GetAccountOfCustomerAsync(CustId, AccId);
            if (account == null)
            {
                return NotFound($"There is no account with account number :{AccId}");
            }
            _bankRepository.DeleteAccount(account);
            await _bankRepository.SaveChangesAsync();
            var respAccount = _mapper.Map<RespAccountDTO>(account);
            return Ok(respAccount);
        }
    }
}