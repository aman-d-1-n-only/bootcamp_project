using BankApi.Models;
using BankApi.Services;
using BankApi.Entities;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;

namespace BankApi.Controllers
{
    [ApiController]
    [Route("api/txns")]

    public class TxnController : ControllerBase
    {

        private readonly IBankRepository _bankRepository;
        private readonly IMapper _mapper;

        public TxnController(IBankRepository bankRepository, IMapper mapper)
        {
            _bankRepository = bankRepository ?? throw new ArgumentNullException(nameof(BankRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));

        }

        // [HttpGet]
        // public async Task<ActionResult<IEnumerable<AccountDTO>>> GetAccounts([FromRoute] int CustId)
        // {
        //     if (!await _bankRepository.CustomerExistsAsync(CustId))
        //     {
        //         return NotFound();
        //     }
        //     var accounts = await _bankRepository.GetAccountsOfCustomerAsync(CustId);
        //     return Ok(_mapper.Map<IEnumerable<RespAccountDTO>>(accounts));
        // }


        // [HttpPost]
        // public async Task<ActionResult<AccountDTO>> CreateAccount([FromRoute] int CustId, AccountDTO newAcccount)
        // {
        //     if (!ModelState.IsValid)
        //     {
        //         return BadRequest(ModelState);
        //     }
        //     if (!await _bankRepository.CustomerExistsAsync(CustId))
        //     {
        //         return NotFound();
        //     }
        //     var account = _mapper.Map<Account>(newAcccount);
        //     await _bankRepository.AddAccountForCustomerAsync(CustId, account);
        //     await _bankRepository.SaveChangesAsync();
        //     var respAccount = _mapper.Map<RespAccountDTO>(account);
        //     return Ok(respAccount);
        // }
        

        [HttpPut, Route("/fundTransfer")]
        public async Task<ActionResult<IEnumerable<AccountDTO>>> FundTransfer([FromBody] FundTransferDTO transfer )
        {
            if (!ModelState.IsValid){
                return BadRequest(ModelState);
            }

            var account1 = await _bankRepository.GetAccountAsync(transfer.AccNo1);
            if ( account1 == null ){
                return NotFound($"There is no account with account number :{transfer.AccNo1}");
            }

            var account2 = await _bankRepository.GetAccountAsync(transfer.AccNo2);
            if ( account2 == null ){
                return NotFound($"There is no account with account number :{transfer.AccNo2}");
            }

            if( account1.Pin == transfer.Pin ){
                if( account1.Balance >= transfer.Amount ){
                    account1.Balance = account1.Balance - transfer.Amount ;
                    account2.Balance = account2.Balance + transfer.Amount ;
                    await _bankRepository.SaveChangesAsync();
                    var respAccount1 = _mapper.Map<RespAccountDTO>(account1);
                    var respAccount2 = _mapper.Map<RespAccountDTO>(account2);
                    var resp = new List<RespAccountDTO>() { respAccount1 , respAccount2 };
                    return Ok(resp);
                }
                return NotFound("Insufficient Funds !");
            }
            return NotFound("Pin doesn't matches !");
        }
    }
}