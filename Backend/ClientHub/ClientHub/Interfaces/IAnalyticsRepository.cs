using ClientHub.DTOs.Analytics;

namespace ClientHub.Interfaces
{
    public interface IAnalyticsRepository
    {

        public Task<RevenueAnalyticsDto> GetRevenueAnalytics(int agentId, CancellationToken ct);

        public Task<ClientCountAnalyticsDto> GetClientCountAnalytics(int agentId, CancellationToken ct);
        
        public Task<int> GetCarInsuranceCountByAgentId(int agentId, CancellationToken ct);
        public Task<int> GetPropertyInsuranceCountByAgentId(int agentId, CancellationToken ct);
        public Task<int> GetTotalPoliciesCount(int agentId, CancellationToken ct);
        public Task<int> GetNewPoliciesThisMonth(int agentId, CancellationToken ct);
        public Task<int> GetExpiredPoliciesCount(int agentId, CancellationToken ct);
        public Task<decimal> GetAveragePolicyValue(int agentId, CancellationToken ct);
    }
}
