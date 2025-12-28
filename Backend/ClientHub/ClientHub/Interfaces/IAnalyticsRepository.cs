using ClientHub.DTOs.Analytics;

namespace ClientHub.Interfaces
{
    public interface IAnalyticsRepository
    {

        public Task<RevenueAnalyticsDto> GetRevenueAnalytics(int agentId, CancellationToken ct);
    }
}
