using System.ComponentModel.DataAnnotations;

namespace ClientHub.DTOs.PropertyInsurance
{
    public class CreatePropertyInsuranceDTO
    {
        [Required]
        public int AgentId { get; set; }

        [Required]
        public int ClientId { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        [StringLength(50)]
        public string PolicyNumber { get; set; }

        [Range(0, double.MaxValue)]
        public decimal TotalAmount { get; set; }

        [Range(0, 100)]
        public decimal Discount { get; set; }

        [Range(0, 100)]
        public decimal Surcharge { get; set; }

        [StringLength(500)]
        public string? Notes { get; set; }

       
        [Required]
        [StringLength(200)]
        public string Address { get; set; }

        [Required]
        [StringLength(100)]
        public string City { get; set; }

        [Required]
        [StringLength(500)]
        public string Risks { get; set; }

        [Range(1, 100000)]
        public decimal SquareMeters { get; set; }
    }
}