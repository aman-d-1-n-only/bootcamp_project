using System.ComponentModel.DataAnnotations;

namespace BankApi.Models
{
    public class CustomerRequest
    {

        public string fname { get; set; }

        public string lname { get; set; }

        public string address { get; set; }

        public string city { get; set; }

        public string email { get; set; }

        public long contact { get; set; }

        public long card_no { get; set; }

        public int pin { get; set; }

        public double balance { get; set; }

    }
}