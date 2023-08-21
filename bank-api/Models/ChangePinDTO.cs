using System.ComponentModel.DataAnnotations;

namespace BankApi.Models
{
    public class ChangePinDTO
    {

        [Required]
        public int AccNo { get; set; }

        [Required]
        [StringLength(4, MinimumLength = 4, ErrorMessage = "Pin must be 4 characters")]
        [RegularExpression(@"^[0-9]{4}$", ErrorMessage = "The PIN should only contain numbers from 0 to 9.")]
        public string ExistingPin { get; set; }

        [Required]
        [StringLength(4, MinimumLength = 4, ErrorMessage = "Pin must be 4 characters")]
        [RegularExpression(@"^[0-9]{4}$", ErrorMessage = "The PIN should only contain numbers from 0 to 9.")]
        public string NewPin { get; set; }
    }
}