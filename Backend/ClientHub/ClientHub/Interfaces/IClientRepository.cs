using ClientHub.DTOs.Clients;
using ClientHub.Models;

namespace ClientHub.Interfaces
{
    public interface IClientRepository
    {
        public Task<Client> AddClient(CreateClientDto client, CancellationToken ct);
        public Task<IEnumerable<ResponseClientDto>> GetClientByAgent(int id, CancellationToken ct);

        public Task<ResponseClientDto> UpdateClient(int id, DetailsClientDto client, CancellationToken ct);

        public Task<bool> DeleteClient(int id,CancellationToken ct);
        public Task<IEnumerable<SearchClientDto>> SearchClientsByName(string name,int agentId,CancellationToken ct);
        public Task<IEnumerable<ResponseClientDto>> GetAllClients(CancellationToken ct);
        public Task<ResponseClientDto> GetClientById(int id, CancellationToken ct);

        public Task<int> GetClientCountByAgentId (int agentId, CancellationToken ct);

    }
}
