namespace ClientHub.Models
{
    public abstract class Insurance
    {
        public int Id { get; set; }

       
        public int ClientId { get; set; }
        public Client Client { get; set; }

        
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string PolicyNumber { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal Discount { get; set; }
        public decimal Surcharge { get; set; }
        public string Notes { get; set; }
    }
}
