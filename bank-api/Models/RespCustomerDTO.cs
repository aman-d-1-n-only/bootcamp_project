namespace BankApi.Models
{
    public class RespCustomerDTO
    {
        public int CustId { get; set; }
        public string Name { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public string Email { get; set; }

        public long Contact { get; set; }

        public int Pincode { get; set; }

        public RespCustomerDTO()
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
