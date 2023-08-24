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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions()
        {
            var txns = await _bankRepository.GetTransactionsAsync();
            return Ok(txns);
        }


        [HttpPost]
        public async Task<ActionResult<Transaction>> CreateTransaction( TransactionDTO newTransaction )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var transaction = _mapper.Map<Transaction>(newTransaction);
            await _bankRepository.AddTransactionAsync(transaction);
            await _bankRepository.SaveChangesAsync();
            return Ok(transaction);
        }
        

        [HttpPost, Route("/fundTransfer")]
        public async Task<ActionResult<IEnumerable<AccountDTO>>> FundTransfer([FromBody] FundTransferDTO transfer )
        {
            if (!ModelState.IsValid){
                return BadRequest(ModelState);
            }

            var account1 = await _bankRepository.GetAccountAsync(transfer.AccNo1);
            if ( account1 == null ){
                return NotFound($"There is no account with account number :{transfer.AccNo1}");
            }else if( account1.Enable == false ){
                return NotFound($"The account with account number :{transfer.AccNo1} is disabled by bank.");
            }

            var account2 = await _bankRepository.GetAccountAsync(transfer.AccNo2);
            if ( account2 == null ){
                return NotFound($"There is no account with account number :{transfer.AccNo2}");
            }else if( account2.Enable == false ){
                return NotFound($"The account with account number :{transfer.AccNo2} is disabled by bank.");
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

        [HttpPost, Route("/cashWithdrawal")]
        public async Task<ActionResult<AccountDTO>> CashWithdrawal([FromBody] CashWithdrawalDTO transfer )
        {
            if (!ModelState.IsValid){
                return BadRequest(ModelState);
            }

            var account = await _bankRepository.GetAccountAsync(transfer.AccNo);
            if ( account == null ){
                return NotFound($"There is no account with account number :{transfer.AccNo}");
            }else if( account.Enable == false ){
                return NotFound($"The account with account number :{transfer.AccNo} is disabled by bank.");
            }

            if( account.Pin == transfer.Pin ){
                if( account.Balance >= transfer.Amount ){
                    account.Balance = account.Balance - transfer.Amount ;
                    await _bankRepository.SaveChangesAsync();
                    var respAccount = _mapper.Map<RespAccountDTO>(account);
                    return Ok(respAccount);
                }
                return NotFound("Insufficient Funds !");
            }
            return NotFound("Pin doesn't matches !");
        }

        [HttpPost, Route("/changePin")]
        public async Task<ActionResult<AccountDTO>> ChangePin([FromBody] ChangePinDTO changePin )
        {
            if (!ModelState.IsValid){
                return BadRequest(ModelState);
            }

            var account = await _bankRepository.GetAccountAsync( changePin.AccNo);
            if ( account == null ){
                return NotFound($"There is no account with account number :{changePin.AccNo}");
            }else if( account.Enable == false ){
                return NotFound($"The account with account number :{changePin.AccNo} is disabled by bank.");
            }

            if( account.Pin == changePin.ExistingPin ){
                account.Pin = changePin.NewPin ;
                await _bankRepository.SaveChangesAsync();
                var respAccount = _mapper.Map<RespAccountDTO>(account);
                return Ok(respAccount);
            }
            return NotFound("Existing Pin doesn't matches !");
        }
    }
}