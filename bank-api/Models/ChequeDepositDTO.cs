using System.ComponentModel.DataAnnotations;

namespace BankApi.Models
{
    public class ChequeDepositDTO
    {

        [Required]
        public int AccNo { get; set; }

        [Required]
        public double Amount { get; set; }
    }
}