using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace BankApi.Models
{
    public class Customer
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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

        public double balance { get; set;}

        public ICollection<Account> Account { get; set; } = new List<Account>() ;
        
    }
}