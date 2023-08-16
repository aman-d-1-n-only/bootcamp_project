namespace BankApi.Models
{
    public class RespAccountDTO
    {
        public int AccId { get; set; }
        
        public long AccNo { get; set; }

        public double Balance { get; set; }

        public long CardNo { get; set; }

        public int Pin { get; set; }

        public RespAccountDTO()
        {
            AccNo = 0;
            Balance = 0;
            CardNo = 0;
            Pin = 0;
        }
    }
}