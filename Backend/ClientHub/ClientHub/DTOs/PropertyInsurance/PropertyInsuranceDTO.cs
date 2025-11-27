using System;

namespace ClientHub.DTOs.PropertyInsurance
{
    public class ResponsePropertyInsuranceDTO
    {
        public int Id { get; set; }

        public int AgentId { get; set; }

        public int ClientId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string PolicyNumber { get; set; }

        public decimal TotalAmount { get; set; }

        public decimal Discount { get; set; }

        public decimal Surcharge { get; set; }

        public string? Notes { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public string Risks { get; set; }

        public decimal SquareMeters { get; set; }
    }
}