using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankApi.Models
{
    public class AccountRequest
    {

        [Required]
        public string fname { get; set; }

        [Required]
        public string lname { get; set; }

        [Required]
        public string creditFields { get; set; }

        [Required]
        public string currentBalance { get; set; }

        [Required]
        public long acc_no {get; set;}

        [Required]
        public int c_id { get; set; }
        
        // [ForeignKey("c_id")]
        // public Customer? customer {get; set;}
        
    }
}