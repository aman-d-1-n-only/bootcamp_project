using BankApi.Entities;
using BankApi.Models;

namespace BankApi.Services {
    public interface IBankRepository {
        Task<IEnumerable<Customer>> GetCustomersAsync();
        Task<Customer?> GetCustomerAsync( int CustId );
        Task<IEnumerable<Account>> GetAccountsOfCustomerAsync( int CustId );
        Task<Account?> GetAccountOfCustomerAsync( int CustId , int AccId );
        Task<bool> CustomerExistsAsync( int CustId );
        Task AddAccountForCustomerAsync( int CustId , Account account );
        Task<bool> SaveChangesAsync();
        Task AddCustomerAsync( Customer customer);
        Task AddAdminAsync(Admin admin);
        void DeleteCustomer( Customer customer);
        void DeleteAccount( Account account);
        Task<Admin?> GetAdminAsync( AdminDTO admin );
        Task<Account?> GetAccountAsync( int AccNo);
    }
}