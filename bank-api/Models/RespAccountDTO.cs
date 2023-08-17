namespace BankApi.Models
{
    public class RespAccountDTO
    {
        public int AccId { get; set; }
        
        public string AccNo { get; set; }

        public double Balance { get; set; }

        public string CardNo { get; set; }

        public string Pin { get; set; }
    }
}