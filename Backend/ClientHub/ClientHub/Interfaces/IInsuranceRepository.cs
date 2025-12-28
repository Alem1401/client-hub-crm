using ClientHub.DTOs.Insurances;

namespace ClientHub.Interfaces
{
    public interface IInsuranceRepository
    {
        public Task<IEnumerable<InsuranceSummaryDto>> GetInsurancesByAgentId(int id, CancellationToken ct);
        public Task<IEnumerable<InsuranceSummaryDto>> GetInsurancesByClientId(int id, CancellationToken ct);

        public Task<decimal> GetMonthlyRevenueByAgentId(int agentId, CancellationToken ct);
    }
}
