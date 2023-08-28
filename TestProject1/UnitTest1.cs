using System.Security.Principal;
using BankApi.Entities;
using BankApi.Services;
using BankApi.Contexts;
using BankApi.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Net.Sockets;
using System.Security.AccessControl;
using System.Transactions;
using System.Xml.Linq;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace TestProject1
{
    public class UnitTest1
    {
        private DbContextOptions<BankApiContext> dbContextOptions;
        private BankApiContext db;
        private BankRepository? bankRepository;
        public UnitTest1()
        {

            //dbContextOptions = new DbContextOptionsBuilder<BankApiContext>().UseSql("Data Source = BankDB.db");
            dbContextOptions = new DbContextOptionsBuilder<BankApiContext>().UseInMemoryDatabase(databaseName: "TestDataBase").Options;
            db = new BankApiContext(dbContextOptions);

        }

        [Fact]
        public async Task TestGetCustomersAsync()
        {

            //Arrange
            bankRepository = new BankRepository(db);

            //Act
            IEnumerable<Customer> customers =  await bankRepository.GetCustomersAsync();

            //Assert
            Assert.Equal(0, customers.Count());

        } 

        [Fact]
        public async Task TestGetCustomerAsync()
        {
            //Arrange
            bankRepository = new BankRepository(db);
            int CustId = 12345;

            //Act
            Customer customer = await bankRepository.GetCustomerAsync(CustId);

            //Assert
            Assert.Null(customer);

        }

        [Fact]
        public async Task TestAddCustomerAsync()
        {
            //Arrange
            bankRepository = new BankRepository(db);
            Customer customer = new Customer()
            {
                CustId = 123,
                Name = "Hanish",
                Address = "wells",
                City = "BLR",
                Email = "hanish@gmail.com",
                Contact = "9087654321",
                Pincode = "521211"
            };

            //Act
            bankRepository.AddCustomerAsync(customer);
            customer = await bankRepository.GetCustomerAsync(customer.CustId);

            //Assert        
            Assert.NotNull(customer);

        }

        [Fact]
        public async Task TestDeleteCustomer()
        {
            //Arrange
            bankRepository = new BankRepository(db);
            Customer customer = new Customer()
            {
                CustId = 123,
                Name = "Hanish",
                Address = "wells",
                City = "BLR",
                Email = "hanish@gmail.com",
                Contact = "9012345678",
                Pincode = "211334"
            };

            //Act
            bankRepository.DeleteCustomer(customer);
            customer = await bankRepository.GetCustomerAsync(customer.CustId);

            //Assert
            Assert.Null(customer);
        }

        [Fact]
        public async Task TestDeleteAccount()
        {
            //Arrange
            bankRepository = new BankRepository(db);
            Account account = new Account()
            {
                AccId = 56789,
                AccType = "saving",
                Balance = 100,
                CardNo = "12345678",
                Pin = "1234",
                CustId = 12345

            };

            //Act
            bankRepository.DeleteAccount(account);
            account =await bankRepository.GetAccountAsync(account.AccId);

            //Assert
            Assert.Null(account);
        }
        
        [Fact]
        public async Task TestAddAdminAsync()
        {
            //Arrange
            bankRepository = new BankRepository(db);
            Admin admin = new Admin()
            {
                Username = "wellsfargo",
                Password = "wellsfargo"
            };

            //Act
            await bankRepository.AddAdminAsync(admin);

            //Assert
            AdminDTO adminDTO = new AdminDTO { Username = "wellsfargo", Password = "wellsfargo" };
            admin =await bankRepository.GetAdminAsync(adminDTO);
            // admin = await bankRepository.Admins.FirstOrDefaultAsync();
            Assert.NotNull(admin);
            Assert.Equal("wellsfargo", admin.Username);
            Assert.Equal("wellsfargo", admin.Password);

        }
        
        [Fact]
        public async Task TestGetAdminAsync()
        {
            //Arrange
            bankRepository = new BankRepository(db);
            AdminDTO adminDTO = new AdminDTO()
            {
                Username = "wellsfargo",
                Password = "wellsfargo"
            };

            //Act
            Admin? admin = await bankRepository.GetAdminAsync(adminDTO);

            //Assert
            Assert.Null(admin);

        } 

        [Fact]
        public async Task TestGetAccountAsync()
        {
            //Arrange
            bankRepository = new BankRepository(db);
            int AccNo = 12345678;

            //Act
            Account account = await bankRepository.GetAccountAsync(AccNo);

            //Assert
            Assert.Null(account);

        }

        /*
        [Fact]
        public async Task TestGetTransactionsAsync()
        {
            //Arrange
            bankRepository = new BankRepository(db);

            //Act
            IEnumerable<System.Transactions.Transaction> transactions =await bankRepository.GetTransactionsAsync();

            //Assert
            Assert.Equal(0, transactions.Count());

        }
        
                [Fact]
                public void TestAddTransactionAsync()
                {
                    //Arrange
                    bankRepository = new BankRepository(db);
                    Transactions transactions = new System.Transactions()
                    {
                        TxnId = 56789,
                        Status = "success",
                        Amount = 5000,
                        DebitedFrom = 12345678,
                        CreditTo = 987654321,
                        Date = "2023-08-24",
                    };

                    //Act
                    bankRepository.AddTransactionAsync(transactions);
                    List<System.Transactions.Transaction> list = bankRepository.GetTransactionsAsync();

                    //Assert
                    Assert.Equal(1, list.Count);
                }
        */

    }

}

