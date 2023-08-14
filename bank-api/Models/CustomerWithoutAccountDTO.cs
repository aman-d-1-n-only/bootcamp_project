using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankApi.Models
{
    public class CustomerWithoutAccountDTO
    {

        
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

        public CustomerWithoutAccountDTO()
        {
            Name = "name";
            Address = "address";
            City = "city";
            Email = "email";
            Contact = 0;
            Pincode = 0;
        }
    }
}
