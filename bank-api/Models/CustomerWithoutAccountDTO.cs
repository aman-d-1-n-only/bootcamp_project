using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankApi.Models
{
    public class CustomerWithoutAccountDTO
    {

        
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [MaxLength(200)]
        public string Address { get; set; }

        [Required]
        [MaxLength(50)]
        public string City { get; set; }

        [Required]
        [MaxLength(50)]
        [RegularExpression(@"[a-z0-9]+@[a-z]+\.[a-z]{2,3}", ErrorMessage = "The email should follow format : (something)@(some_domain).(some_toplevel_domain)")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Contact is required.")]
        [StringLength(10, MinimumLength = 10, ErrorMessage = "Contact must be 10 characters")]
        [RegularExpression(@"^[6-9]\d{9}$", ErrorMessage = "The Contact is not valid")]
        public string Contact { get; set; }

        [Required(ErrorMessage = "Pincode is required.")]
        [StringLength(6, MinimumLength = 6, ErrorMessage = "Pincode must be 6 characters")]
        public string Pincode { get; set; }

    }
}
