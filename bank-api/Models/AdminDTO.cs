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
        [MinLength(8 , ErrorMessage = "Password should have a minimum length of 8.")]
        public string Password { get; set; }

    }
}