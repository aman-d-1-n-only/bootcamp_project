using System.ComponentModel.DataAnnotations;

namespace BankApi.Models
{
    public class AccountDTO
    {
        
        [Required]
        [MaxLength(8)]
        public long AccNo { get; set; }

        public double Balance { get; set; }

        [Required]
        [MaxLength(12)]
        public long CardNo { get; set; }

        [Required]
        [MaxLength(4)]
        public int Pin { get; set; }
    }
}