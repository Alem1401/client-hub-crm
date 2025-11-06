using ClientHub.DTOs;
using ClientHub.Models;

namespace ClientHub.Interfaces
{
    public interface IAgentRepository
    {

        public Task<Agent> RegisterAgent(RegisterAgentDTO registerAgentDTO, CancellationToken ct);

        public Task<Agent?> LoginAgent(LoginAgentDTO loginAgentDTO, CancellationToken ct);
    }
}
