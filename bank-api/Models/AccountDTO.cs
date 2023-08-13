using System.ComponentModel.DataAnnotations;

namespace BankApi.Models
{
    public class AccountDTO
    {
        [Required(ErrorMessage = "Account Number is required.")]
        [MinLength(8)]
        [MaxLength(8)]
        public long AccNo { get; set; }

        public double Balance { get; set; }

        public long CardNo { get; set; }

        public int Pin { get; set; }

        public AccountDTO()
        {
            AccNo = 0;
            Balance = 0;
            CardNo = 0;
            Pin = 0;
        }
    }
}