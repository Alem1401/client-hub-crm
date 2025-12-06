using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ClientHub.Helpers;
using ClientHub.Models;

namespace ClientHub.Data
{
    public static class SeedData
    {
        /// <summary>
        /// Idempotent seed. Applies migrations and inserts sample agents, clients and varied insurances.
        /// Only seeds when DB is empty for the primary tables.
        /// Call from Program.cs after build: await SeedData.SeedAsync(app.Services, app.Environment);
        /// </summary>
        public static async Task SeedAsync(IServiceProvider services, IHostEnvironment env)
        {
            using var scope = services.CreateScope();
            var provider = scope.ServiceProvider;
            var context = provider.GetRequiredService<DataContext>();

            // Apply any pending migrations so the DB schema exists
            await context.Database.MigrateAsync();

            // Protect against accidental seeding in production unless explicitly desired
            if (!env.IsDevelopment())
            {
                // If you want seeding in other environments remove this block.
                if (await context.Agents.AnyAsync()) return;
            }

            // If already seeded, skip
            if (await context.Agents.AnyAsync() || await context.Clients.AnyAsync() || await context.Insurances.AnyAsync())
                return;

            // Helper to create agent with hashed password
            Agent CreateAgent(string firstName, string lastName, string email, string password)
            {
                PasswordHelper.CreatePasswordHash(password, out byte[] hash, out byte[] salt);
                return new Agent
                {
                    FirstName = firstName,
                    LastName = lastName,
                    Email = email,
                    PasswordHash = hash,
                    PasswordSalt = salt
                };
            }

            // Agents (test credentials — change before sharing)
            var agent1 = CreateAgent("Test", "Agent", "test.agent@example.com", "Test@1234");
            var agent2 = CreateAgent("Alice", "Smith", "alice.smith@example.com", "Alice@1234");
            var agent3 = CreateAgent("Bob", "Jones", "bob.jones@example.com", "Bob@1234");

            await context.Agents.AddRangeAsync(agent1, agent2, agent3);
            await context.SaveChangesAsync();

            // Clients
            var client1 = new Client
            {
                FirstName = "John",
                LastName = "Doe",
                Email = "john.doe@example.com",
                PhoneNumber = "555-0101",
                Address = "12 Elm St",
                City = "Springfield",
                DateOfBirth = new DateTime(1985, 4, 12),
                DateCreated = DateTime.UtcNow.AddMonths(-4),
                Status = "Active",
                Notes = "Interested in multi-policy discount",
                AgentId = agent1.Id,
                LastContactDate = DateTime.UtcNow.AddDays(-7)
            };

            var client2 = new Client
            {
                FirstName = "Maria",
                LastName = "Gonzalez",
                Email = "maria.g@example.com",
                PhoneNumber = "555-0202",
                Address = "34 Oak Ave",
                City = "Riverside",
                DateOfBirth = new DateTime(1990, 9, 1),
                DateCreated = DateTime.UtcNow.AddMonths(-2),
                Status = "Prospect",
                Notes = "Requested quote for property and car",
                AgentId = agent2.Id,
                LastContactDate = DateTime.UtcNow.AddDays(-3)
            };

            var client3 = new Client
            {
                FirstName = "Liam",
                LastName = "Nguyen",
                Email = "liam.nguyen@example.com",
                PhoneNumber = "555-0303",
                Address = "78 Pine Rd",
                City = "Hillside",
                DateOfBirth = new DateTime(1978, 12, 5),
                DateCreated = DateTime.UtcNow.AddYears(-1),
                Status = "Active",
                Notes = "Renewal due next month",
                AgentId = agent1.Id,
                LastContactDate = DateTime.UtcNow.AddDays(-30)
            };

            var client4 = new Client
            {
                FirstName = "Olivia",
                LastName = "Brown",
                Email = "olivia.brown@example.com",
                PhoneNumber = "555-0404",
                Address = "221B Baker St",
                City = "Riverside",
                DateOfBirth = new DateTime(1988, 6, 18),
                DateCreated = DateTime.UtcNow.AddMonths(-6),
                Status = "Active",
                Notes = "High-value property",
                AgentId = agent3.Id,
                LastContactDate = DateTime.UtcNow.AddDays(-10)
            };

            await context.Clients.AddRangeAsync(client1, client2, client3, client4);
            await context.SaveChangesAsync();

            // Mixed insurances with different types and attributes
            var insurances = new List<Insurance>
            {
                new CarInsurance
                {
                    AgentId = agent1.Id,
                    ClientId = client1.Id,
                    StartDate = DateTime.UtcNow.AddMonths(-6),
                    EndDate = DateTime.UtcNow.AddMonths(6),
                    PolicyNumber = $"CAR-{Guid.NewGuid():N}".Substring(0,16),
                    TotalAmount = 1200m,
                    Discount = 50m,
                    Surcharge = 0m,
                    Notes = "Standard coverage",
                    Bonus = 10m,
                    ChassisNumber = "CHS1234567890",
                    Color = "Red",
                    VehicleType = "Sedan",
                    Purpose = "Personal",
                    Category = "Private",
                    RegistrationPlate = "ABC-123",
                    ProductionYear = 2018,
                    PowerKw = 85,
                    EngineCcm = 1600,
                    Type = "Comprehensive"
                },
                new PropertyInsurance
                {
                    AgentId = agent2.Id,
                    ClientId = client2.Id,
                    StartDate = DateTime.UtcNow.AddMonths(-1),
                    EndDate = DateTime.UtcNow.AddYears(1),
                    PolicyNumber = $"PROP-{Guid.NewGuid():N}".Substring(0,16),
                    TotalAmount = 2500m,
                    Discount = 100m,
                    Surcharge = 0m,
                    Notes = "Includes flood protection",
                    Address = client2.Address ?? "34 Oak Ave",
                    City = client2.City,
                    Risks = "Fire, Flood",
                    SquareMeters = 180m
                },
                new CarInsurance
                {
                    AgentId = agent1.Id,
                    ClientId = client3.Id,
                    StartDate = DateTime.UtcNow.AddYears(-1),
                    EndDate = DateTime.UtcNow.AddMonths(2),
                    PolicyNumber = $"CAR-{Guid.NewGuid():N}".Substring(0,16),
                    TotalAmount = 900m,
                    Discount = 0m,
                    Surcharge = 25m,
                    Notes = "Low-mileage discount removed",
                    Bonus = 5m,
                    ChassisNumber = "CHS0987654321",
                    Color = "Blue",
                    VehicleType = "Hatchback",
                    Purpose = "Commute",
                    Category = "Private",
                    RegistrationPlate = "XYZ-789",
                    ProductionYear = 2015,
                    PowerKw = 60,
                    EngineCcm = 1300,
                    Type = "Third-party"
                },
                new PropertyInsurance
                {
                    AgentId = agent3.Id,
                    ClientId = client4.Id,
                    StartDate = DateTime.UtcNow.AddMonths(-3),
                    EndDate = DateTime.UtcNow.AddMonths(9),
                    PolicyNumber = $"PROP-{Guid.NewGuid():N}".Substring(0,16),
                    TotalAmount = 6000m,
                    Discount = 300m,
                    Surcharge = 0m,
                    Notes = "High-value contents included",
                    Address = client4.Address ?? "221B Baker St",
                    City = client4.City,
                    Risks = "Fire, Theft, Earthquake",
                    SquareMeters = 320m
                }
            };

            await context.AddRangeAsync(insurances);
            await context.SaveChangesAsync();
        }
    }
}
