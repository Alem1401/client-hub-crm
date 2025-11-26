namespace ClientHub.DTOs.CarInsurance
{
    public class ResponseCarInsuranceDto
    {
        public int Id { get; set; }

        
        public decimal Bonus { get; set; }
        public string ChassisNumber { get; set; }
        public string Color { get; set; }
        public string VehicleType { get; set; }
        public string Purpose { get; set; }
        public string Category { get; set; }
        public string RegistrationPlate { get; set; }
        public int ProductionYear { get; set; }
        public int PowerKw { get; set; }
        public int EngineCcm { get; set; }
        public string Type { get; set; }

        
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string PolicyNumber { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal Discount { get; set; }
        public decimal Surcharge { get; set; }
        public string? Notes { get; set; }

       
        public int ClientId { get; set; }
        public int AgentId { get; set; }
       
        public bool IsActive => DateTime.Now >= StartDate && DateTime.Now <= EndDate;
        public int DaysUntilExpiry => (EndDate - DateTime.Now).Days;
        public decimal FinalPrice => TotalAmount - Discount + Surcharge;
    }
}
