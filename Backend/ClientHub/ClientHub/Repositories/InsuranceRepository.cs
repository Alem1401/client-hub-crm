using ClientHub.Data;
using ClientHub.DTOs.Insurances;
using ClientHub.Interfaces;
using ClientHub.Models;
using Microsoft.EntityFrameworkCore;

namespace ClientHub.Repositories
{
    public class InsuranceRepository : IInsuranceRepository
    {
        private readonly DataContext _context;

        public InsuranceRepository(DataContext context)
        {
            _context = context;
        }

        
        public async Task<IEnumerable<InsuranceSummaryDto>> GetInsurancesByAgentId(int agentId, CancellationToken ct)
        {
            var carInsurances = await _context.Insurances
                .OfType<CarInsurance>()
                .Where(i => i.AgentId == agentId)
                .Include(i => i.Client)
                .Select(r => new InsuranceSummaryDto
                {
                    Id = r.Id,
                    ClientName = r.Client.FirstName + " " + r.Client.LastName,
                    EndDate = r.EndDate,
                    PolicyNumber = r.PolicyNumber,
                    PolicyType = "Car",
                    clientId = r.ClientId
                })
                .ToListAsync(ct);

            var propertyInsurances = await _context.Insurances
                .OfType<PropertyInsurance>()
                .Where(i => i.AgentId == agentId)
                .Include(i => i.Client)
                .Select(r => new InsuranceSummaryDto
                {
                    Id = r.Id,
                    ClientName = r.Client.FirstName + " " + r.Client.LastName,
                    EndDate = r.EndDate,
                    PolicyNumber = r.PolicyNumber,
                    PolicyType = "Property",
                    clientId = r.ClientId
                })
                .ToListAsync(ct);

            return carInsurances.Concat(propertyInsurances).ToList();
        }

  
        public async Task<IEnumerable<InsuranceSummaryDto>> GetInsurancesByClientId(int clientId, CancellationToken ct)
        {
            var carInsurances = await _context.Insurances
                .OfType<CarInsurance>()
                .Where(i => i.ClientId == clientId)
                .Include(i => i.Client)
                .Select(r => new InsuranceSummaryDto
                {
                    Id = r.Id,
                    ClientName = r.Client.FirstName + " " + r.Client.LastName,
                    EndDate = r.EndDate,
                    PolicyNumber = r.PolicyNumber,
                    PolicyType = "Car",
                    clientId = r.ClientId
                })
                .ToListAsync(ct);

            var propertyInsurances = await _context.Insurances
                .OfType<PropertyInsurance>()
                .Where(i => i.ClientId == clientId)
                .Include(i => i.Client)
                .Select(r => new InsuranceSummaryDto
                {
                    Id = r.Id,
                    ClientName = r.Client.FirstName + " " + r.Client.LastName,
                    EndDate = r.EndDate,
                    PolicyNumber = r.PolicyNumber,
                    PolicyType = "Property",
                    clientId = r.ClientId
                })
                .ToListAsync(ct);

            return carInsurances.Concat(propertyInsurances).ToList();
        }

        public async Task<decimal> GetMonthlyRevenueByAgentId(int agentId, CancellationToken ct)
        {
            var insurance = _context.Insurances
                .Where(i => i.AgentId == agentId && i.StartDate.Month == DateTime.Now.Month && i.StartDate.Year == DateTime.Now.Year)
                .Select(i => i.TotalAmount);
            return await insurance.SumAsync(ct);
        }
    }
}
