using ClientHub.Data;
using ClientHub.DTOs.Analytics;
using ClientHub.Interfaces;
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
    }
}
