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

    }
}