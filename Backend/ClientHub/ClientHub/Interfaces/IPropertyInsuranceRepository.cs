using ClientHub.DTOs.PropertyInsurance;
using ClientHub.Models;

namespace ClientHub.Interfaces
{
    public interface IPropertyInsuranceRepository
    {
        Task<int> AddPropertyInsuranceAsync(CreatePropertyInsuranceDTO propertyInsurance, CancellationToken ct);
        Task<IEnumerable<ResponsePropertyInsuranceDTO>> GetPropertyInsurancesByAgentIdAsync(int agentId, CancellationToken ct);
        Task<ResponsePropertyInsuranceDTO?> GetPropertyInsuranceByIdAsync(int id, CancellationToken ct);
        public  Task<IEnumerable<ResponsePropertyInsuranceDTO>> GetPropertyInsurancesByClientIdAsync(int clientId, CancellationToken ct);

        public Task<bool> DeletePropertyInsurance(int id, CancellationToken ct);


    }
}