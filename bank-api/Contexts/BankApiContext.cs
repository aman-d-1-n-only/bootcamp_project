using Microsoft.EntityFrameworkCore;
using BankApi.Entities;

namespace BankApi.Contexts {
    public class BankApiContext : DbContext{
        public DbSet<Account> Account { get; set; } = null!;
        public DbSet<Customer> Customer { get; set; } = null!;
        public DbSet<Admin> Admin {get;set;} = null!;
        public BankApiContext(DbContextOptions<BankApiContext> options  ) : base( options ){

        }
    }
}