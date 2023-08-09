using Microsoft.EntityFrameworkCore;
using BankApi.Models;

namespace BankApi.Contexts
{
    public class AdminContext : DbContext
    {
        public AdminContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Admin> Admin { get; set; }
    }
}