using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankApi.Entities
{
    public class Customer
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CustId { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public string Email { get; set; }

        public string Contact { get; set; }

        public string Pincode { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public ICollection<Account> Accounts { get; set; } = new List<Account>();

        public Customer() {
            Name = "name" ;
            Address = "address" ;
            City = "city" ;
            Email = "email" ;
            Contact = "1234567890" ;
            Pincode = "123456" ;
        }
    }
}