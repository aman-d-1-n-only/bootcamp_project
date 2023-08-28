using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankApi.Entities
{
    public class Transaction
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TxnId { get; set; }

        public string Status { get; set; }

        public double Amount { get; set; }

        public int DebitedFrom { get; set; }

        public int CreditTo { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now ;
    }
}