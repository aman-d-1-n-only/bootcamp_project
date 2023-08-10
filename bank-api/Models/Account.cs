using System.ComponentModel.DataAnnotations;

namespace BankApi.Models
{
    public class Account
    {

        [Key]
        public int a_id { get; set; }

        [Required]
        public string fname { get; set; }

        [Required]
        public string lname { get; set; }

        [Required]
        public string creditFields { get; set; }

        [Required]
        public string currentBalance { get; set; }

        public long acc_no {get; set;}
        
    }
}