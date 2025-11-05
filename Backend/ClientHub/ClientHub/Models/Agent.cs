namespace ClientHub.Models
{
    public class Agent
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public byte[] PasswordHash { get; set; } = null!;
        public byte[] PasswordSalt { get; set; } = null!;
        public ICollection<Client> Clients { get; set; } = new List<Client>();
        public ICollection<Insurance> Insurances { get; set; } = new List<Insurance>();

    }

}
