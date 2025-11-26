using System.ComponentModel.DataAnnotations;

namespace ClientHub.Models
{
    public class CarInsurance : Insurance
    {
        [Range(0, 100)]
        public decimal Bonus { get; set; }

        [Required]
        [StringLength(50)]
        public string ChassisNumber { get; set; }

        [Required]
        [StringLength(30)]
        public string Color { get; set; }

        [Required]
        [StringLength(50)]
        public string VehicleType { get; set; }

        [Required]
        [StringLength(50)]
        public string Purpose { get; set; }

        [Required]
        [StringLength(30)]
        public string Category { get; set; }

        [Required]
        [StringLength(20)]
        public string RegistrationPlate { get; set; }

        [Range(1900, 2100)]
        public int ProductionYear { get; set; }

        [Range(0, 1000)]
        public int PowerKw { get; set; }

        [Range(0, 10000)]
        public int EngineCcm { get; set; }

        [Required]
        [StringLength(50)]
        public string Type { get; set; }

       
    }
}