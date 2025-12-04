namespace ClientHub.DTOs.Insurances
{
    public class InsuranceSummaryDto
    {
        public int Id { get; set; }
        public string PolicyNumber { get; set; }
        public string PolicyType { get; set; }
        public string ClientName { get; set; }
        public DateTime EndDate { get; set; }
    }

}
