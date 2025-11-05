using Microsoft.EntityFrameworkCore;
using ClientHub.Models;


namespace ClientHub.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        
        public DbSet<Agent> Agents { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Insurance> Insurances { get; set; }
        public DbSet<CarInsurance> CarInsurances { get; set; }
        public DbSet<PropertyInsurance> PropertyInsurances { get; set; }

       
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            
            modelBuilder.Entity<Agent>()
                .HasMany(a => a.Clients)
                .WithOne(c => c.Agent)
                .HasForeignKey(c => c.AgentId)
                .OnDelete(DeleteBehavior.SetNull);

          
            modelBuilder.Entity<Agent>()
                .HasMany(a => a.Insurances)
                .WithOne(i => i.Agent)
                .HasForeignKey(i => i.AgentId);

            modelBuilder.Entity<Client>()
                .HasMany(c => c.Insurances)
                .WithOne(i => i.Client)
                .HasForeignKey(i => i.ClientId);

           
            modelBuilder.Entity<Insurance>().HasDiscriminator<string>("InsuranceType")
                .HasValue<CarInsurance>("Car")
                .HasValue<PropertyInsurance>("Property");
        }
    }
}
