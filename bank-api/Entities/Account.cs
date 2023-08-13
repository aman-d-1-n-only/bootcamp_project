using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankApi.Entities
{
    public class Account
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AccId { get; set; }

        [Required(ErrorMessage = "Account Number is required.")]
        [MinLength(8)]
        [MaxLength(8)]
        public long AccNo { get; set; }

        public double Balance { get; set; }

        [Required(ErrorMessage = "Card Number is required.")]
        [MinLength(12)]
        [MaxLength(12)]
        public long CardNo { get; set; }

        [Required(ErrorMessage = "Pin for card is also required.")]
        [MinLength(4)]
        [MaxLength(4)]
        public int Pin { get; set; }

        [ForeignKey("CustId")]
        public int CustId { get; set; }
        public Customer? Customer { get; set; }

        public Account() {
            AccNo = 0 ;
            Balance = 0 ;
            CardNo = 0 ;
            Pin = 0 ;
        }

    }
}