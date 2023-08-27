using System.ComponentModel.DataAnnotations;

namespace BankApi.Models
{
    public class UpdateAccountDTO
    {

        [Required]
        public string AccType { get; set; }

        [Required]
        public double Balance { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 8, ErrorMessage = "Card Number must be 8 characters")]
        [RegularExpression(@"^[0-9]{8}$", ErrorMessage = "The Card Number should only contain number from 0 to 9.")]
        public string CardNo { get; set; }

        [Required]
        [StringLength(4, MinimumLength = 4, ErrorMessage = "Pin must be 4 characters")]
        [RegularExpression(@"^[0-9]{4}$", ErrorMessage = "The PIN should only contain numbers from 0 to 9.")]
        public string Pin { get; set; }

        [Required]
        public bool Enable { get; set; }
    }
}