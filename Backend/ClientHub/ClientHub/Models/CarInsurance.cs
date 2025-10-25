namespace ClientHub.Models
{
    public class CarInsurance : Insurance
    {
       
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
    }
}
