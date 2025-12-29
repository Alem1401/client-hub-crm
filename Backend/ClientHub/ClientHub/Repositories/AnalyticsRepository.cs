using ClientHub.Data;
using ClientHub.DTOs.Analytics;
using ClientHub.Interfaces;
using ClientHub.Models;
using Microsoft.EntityFrameworkCore;

namespace ClientHub.Repositories
{
    public class AnalyticsRepository : IAnalyticsRepository
    {
        private readonly DataContext _context;

        public AnalyticsRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<ClientCountAnalyticsDto> GetClientCountAnalytics(int agentId, CancellationToken ct)
        {
            var currentDate = DateTime.Now;
            var months = new List<string>();
            var clientCount = new List<int>();

            for(int i = 5; i >= 0; i--)
            {
                var targetMonth = currentDate.AddMonths(-i);
                var monthName = targetMonth.ToString("MMMM");
                months.Add(monthName);
                var count = await _context.Clients
                    .Where(c => c.AgentId == agentId
                        && c.DateCreated.Month == targetMonth.Month
                        && c.DateCreated.Year == targetMonth.Year)
                    .CountAsync(ct);
                clientCount.Add(count);
            }

            var response = new ClientCountAnalyticsDto
            {
                Months = months,
                ClientCount = clientCount
            };
            return response;
        }

        public async Task<RevenueAnalyticsDto> GetRevenueAnalytics(int agentId, CancellationToken ct)
        {
            var currentDate = DateTime.Now;
            var months = new List<string>();
            var revenues = new List<decimal>();

           
            for (int i = 5; i >= 0; i--)
            {
                var targetDate = currentDate.AddMonths(-i);
                var monthName = targetDate.ToString("MMMM");
                months.Add(monthName);

                var revenue = await _context.Insurances
                    .Where(ins => ins.AgentId == agentId
                        && ins.StartDate.Month == targetDate.Month
                        && ins.StartDate.Year == targetDate.Year)
                    .SumAsync(ins => ins.TotalAmount, ct);

                revenues.Add(revenue);
            }

            return new RevenueAnalyticsDto
            {
                Months = months,
                MonthlyRevenues = revenues
            };
        }

        public async Task<int> GetCarInsuranceCountByAgentId(int agentId, CancellationToken ct)
        {
            return await _context.Insurances
                .OfType<CarInsurance>()
                .Where(i => i.AgentId == agentId)
                .CountAsync(ct);
        }

        public async Task<int> GetPropertyInsuranceCountByAgentId(int agentId, CancellationToken ct)
        {
            return await _context.Insurances
                .OfType<PropertyInsurance>()
                .Where(i => i.AgentId == agentId)
                .CountAsync(ct);
        }

        public async Task<int> GetTotalPoliciesCount(int agentId, CancellationToken ct)
        {
            return await _context.Insurances
                .Where(i => i.AgentId == agentId)
                .CountAsync(ct);
        }

        public async Task<int> GetNewPoliciesThisMonth(int agentId, CancellationToken ct)
        {
            var now = DateTime.Now;
            return await _context.Insurances
                .Where(i => i.AgentId == agentId
                    && i.StartDate.Month == now.Month
                    && i.StartDate.Year == now.Year)
                .CountAsync(ct);
        }

        public async Task<int> GetExpiredPoliciesCount(int agentId, CancellationToken ct)
        {
            return await _context.Insurances
                .Where(i => i.AgentId == agentId && i.EndDate < DateTime.Now)
                .CountAsync(ct);
        }

        public async Task<decimal> GetAveragePolicyValue(int agentId, CancellationToken ct)
        {
            var avg = await _context.Insurances
                .Where(i => i.AgentId == agentId)
                .AverageAsync(i => (decimal?)i.TotalAmount, ct);
            return avg ?? 0;
        }
    }
}
