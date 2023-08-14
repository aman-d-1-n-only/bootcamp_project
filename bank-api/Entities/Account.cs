using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankApi.Entities
{
    public class Account
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AccId { get; set; }

        [Required]
        public long AccNo { get; set; }

        public double Balance { get; set; }

        [Required]
        public long CardNo { get; set; }

        [Required]
        public int Pin { get; set; }

        [ForeignKey("CustId")]
        public int CustId { get; set; }
        public Customer? Customer { get; set; }

    }
}