using Microsoft.EntityFrameworkCore;
using BankApi.Models;

namespace BankApi.Contexts
{
    public class BankApiContext : DbContext
    {
        public BankApiContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Admin> Admin { get; set; }
        public DbSet<Customer> Customer { get; set; }
        public DbSet<Account> Account { get; set; }

        // protected override void OnConfiguring(DbContextOptionsBuilder options){
        //     options.UseSqlite(Configuration.GetConnectionString("BankApiDatabase"));
        // }

    }
}