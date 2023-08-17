using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankApi.Models
{
    public class AdminDTO
    {

        [Required]
        [MaxLength(50)]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 8, ErrorMessage = "Password must be 8 characters")]
        public string Password { get; set; }

    }
}