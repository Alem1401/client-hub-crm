namespace ClientHub.Models
{
    public class Client
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string JMBG { get; set; }
        public string IdCardNumber { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string City { get; set; }
        public DateTime DateOfBirth { get; set; }

        
        public DateTime DateCreated { get; set; }
        public string Status { get; set; } 
        public string? Notes { get; set; }
         public int? AgentId { get; set; }


        public Agent? Agent { get; set; }
        public DateTime? LastContactDate { get; set; }

        public ICollection<Insurance> Insurances { get; set; } = new List<Insurance>();

    }
}
