namespace BankApi.Models
{
    public class CustomerDTO
    {

        public string Name { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public string Email { get; set; }

        public long Contact { get; set; }

        public int Pincode { get; set; }

        public int number_of_acc{
            get{ return Accounts.Count; }
        }

        public ICollection<AccountDTO> Accounts { get; set; } = new List<AccountDTO>();

        public CustomerDTO()
        {
            Name = "name";
            Address = "address";
            City = "city";
            Email = "email";
            Contact = 0;
            Pincode = 0;
        }
    }
}
