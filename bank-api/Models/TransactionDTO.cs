using System.ComponentModel.DataAnnotations;

namespace BankApi.Models
{
    public class TransactionDTO
    {   
        [Required]
        public string Status { get; set; }

        [Required]
        public double Amount { get; set; }

        [Required]
        public int DebitedFrom { get; set; }

        [Required]
        public int CreditTo { get; set; }


    }
    
}
