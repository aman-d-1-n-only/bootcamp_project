using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankApi.Entities
{
    public class Customer
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CustId { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required(ErrorMessage = "Address is required.")]
        [MaxLength(500)]
        public string Address { get; set; }

        [Required(ErrorMessage = "City is required.")]
        [MaxLength(50)]
        public string City { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Contact is required.")]
        public long Contact { get; set; }

        [Required(ErrorMessage = "Pincode is required.")]
        public int Pincode { get; set; }

        public ICollection<Account> Accounts { get; set; } = new List<Account>();

        public Customer() {
            Name = "name" ;
            Address = "address" ;
            City = "city" ;
            Email = "email" ;
            Contact = 0 ;
            Pincode = 0 ;
        }
    }
}