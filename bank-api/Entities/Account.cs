using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankApi.Entities
{
    public class Account
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AccId { get; set; }

        public string AccType {get; set; }

        public double Balance { get; set; }

        public string CardNo { get; set; }

        public string Pin { get; set; }

        [ForeignKey("CustId")]
        public int CustId { get; set; }
        public Customer? Customer { get; set; }

    }
}