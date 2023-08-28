using Microsoft.EntityFrameworkCore;
using BankApi.Contexts;
using BankApi.Entities ;
using BankApi.Models;

namespace BankApi.Services {
    public class BankRepository : IBankRepository {

        private readonly BankApiContext _context ;

        public BankRepository( BankApiContext context ){
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IEnumerable<Customer>> GetCustomersAsync(){
            return await _context.Customer.OrderBy( c => c.Name ).ToListAsync();
            throw new NotImplementedException();
        }

        public async Task<Customer?> GetCustomerAsync(int CustId){
            return await _context.Customer.Include( c => c.Accounts ).Where( c => c.CustId == CustId ).FirstOrDefaultAsync();
            throw new NotImplementedException();
        }
        public async Task<IEnumerable<Account>> GetAccountsOfCustomerAsync(int CustId){
            var customer = await _context.Customer.Include(c => c.Accounts).Where(c => c.CustId == CustId).FirstOrDefaultAsync();
            return customer.Accounts ;
            throw new NotImplementedException();
        }
        public async Task<Account?> GetAccountOfCustomerAsync(int CustId, int AccId){
            return await _context.Account.Where(a => a.CustId == CustId && a.AccId == AccId ).FirstOrDefaultAsync();
            throw new NotImplementedException();
        }
        public async Task<bool> CustomerExistsAsync( int CustId ){
            return await _context.Customer.AnyAsync( c => c.CustId == CustId );
        }

        public async Task AddAccountForCustomerAsync(int CustId, Account account){
            account.CustId = CustId ;
            var customer = await _context.Customer.Where(c => c.CustId == CustId).FirstOrDefaultAsync();
            if( customer != null ){
                customer.Accounts.Add(account);  
            }
        }

        public async Task<bool> SaveChangesAsync(){
            return (await _context.SaveChangesAsync() >= 0 );
        }

        public async Task AddCustomerAsync( Customer customer ){
            await _context.Customer.AddAsync(customer);
        }

        public void DeleteCustomer( Customer customer ){
            _context.Customer.Remove(customer);
        }

        public void DeleteAccount(Account account)
        {
            _context.Account.Remove(account);
        }

        public async Task AddAdminAsync(Admin admin)
        {
            await _context.Admin.AddAsync(admin);
        }

        public async Task<Admin?> GetAdminAsync( AdminDTO admin ){
            return await _context.Admin.Where( a => a.Username == admin.Username && a.Password == admin.Password ).FirstOrDefaultAsync();
            throw new NotImplementedException();
        }

        public async Task<Account?> GetAccountAsync( int AccNo ){
            return await _context.Account.Where(a => a.AccId == AccNo).FirstOrDefaultAsync();
            throw new NotImplementedException();
        }

        public async Task AddTransactionAsync( Transaction transaction )
        {
            await _context.Transaction.AddAsync(transaction);
        }

        public async Task<IEnumerable<Transaction>> GetTransactionsAsync()
        {
            return await _context.Transaction.OrderBy( t => t.CreatedAt ).ToListAsync();
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Transaction>> GetMiniStatementAsync( AtmDTO transfer )
        {
            return await _context.Transaction.OrderBy( t => t.CreatedAt ).Where( t => t.DebitedFrom != -1 && ( t.CreditTo == transfer.AccNo || t.DebitedFrom == transfer.AccNo ) ).ToListAsync();
            throw new NotImplementedException();
        }
    }
}