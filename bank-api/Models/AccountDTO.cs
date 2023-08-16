using System.ComponentModel.DataAnnotations;

namespace BankApi.Models
{
    public class AccountDTO
    {
        
        [Required]
        public long AccNo { get; set; }

        public double Balance { get; set; }

        [Required]
        public long CardNo { get; set; }

        [Required]
        public int Pin { get; set; }
    }
}