namespace ClientHub.Models
{
    public class PropertyInsurance : Insurance
    {
       
        public string Address { get; set; }
        public string City { get; set; }
        public string Risks { get; set; }
        public decimal SquareMeters { get; set; }
    }
}
