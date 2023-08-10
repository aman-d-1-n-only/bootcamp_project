using System.ComponentModel.DataAnnotations;

namespace BankApi.Models
{
    public class Customer
    {

        [Key]
        public int c_id { get; set; }

        [Required]
        public string fname { get; set; }

        [Required]
        public string lname { get; set; }

        [Required]
        public string address { get; set; }

        [Required]
        public string city { get; set; }

        [Required]
        public string email { get; set; }

        [Required]
        public long contact { get; set; }
        
        [Required]
        public long card_no { get; set; }

        [Required]
        public int pin { get; set; }    

        public long acc_no {get; set;}

        public double balance { get; set;}

        public List<int> accounts {get; set;}
        
    }
}