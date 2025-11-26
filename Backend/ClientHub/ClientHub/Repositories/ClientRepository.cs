using ClientHub.Data;
using ClientHub.DTOs.Clients;
using ClientHub.Interfaces;
using ClientHub.Models;
using Microsoft.EntityFrameworkCore;

namespace ClientHub.Repositories
{
    public class ClientRepository : IClientRepository
    {
        DataContext _context;

        public ClientRepository(DataContext context)
        {
            _context = context;
        }   

        public async Task<Client> AddClient(CreateClientDto client, CancellationToken ct)
        {
           var newClient = new Client
            {
                FirstName = client.FirstName,
                LastName = client.LastName,
                Email = client.Email,
                PhoneNumber = client.PhoneNumber,
                Address = client.Address,
                City = client.City,
                DateOfBirth = client.DateOfBirth,
                Status = client.Status,
                Notes = client.Notes,
                AgentId = client.AgentId,
                DateCreated = DateTime.UtcNow
            };
            _context.Clients.Add(newClient);
           await _context.SaveChangesAsync(ct);
            return newClient;
        }

        public async Task<bool> DeleteClient(int id, CancellationToken ct)
        {
            var client = await _context.Clients.FirstOrDefaultAsync(c => c.Id == id, ct);

            if (client is null)
                return false;

            _context.Clients.Remove(client);
            await _context.SaveChangesAsync(ct);

            return true;
        }

        public async Task<IEnumerable<ResponseClientDto>> GetClientByAgent(int id, CancellationToken ct)
        {
            var clients =await _context.Clients.Where( c=> c.AgentId == id).ToListAsync(ct);
            return clients.Select(c => new ResponseClientDto
            {
                Id = c.Id,
                FirstName = c.FirstName,
                LastName = c.LastName,
                Email = c.Email,
                PhoneNumber = c.PhoneNumber,
                Address = c.Address,
                City = c.City,
            });
        }

        public async Task<ResponseClientDto> UpdateClient(int id, DetailsClientDto client, CancellationToken ct)
        {
            var toUpdate = _context.Clients.FirstOrDefault(c => c.Id == id);
            if(toUpdate == null)
            {
                throw new Exception("Client not found");
            }
            toUpdate.FirstName = client.FirstName;
            toUpdate.LastName = client.LastName;
            toUpdate.Email = client.Email;
            toUpdate.PhoneNumber = client.PhoneNumber;
            toUpdate.Address = client.Address;
            toUpdate.City = client.City;
            toUpdate.DateOfBirth = client.DateOfBirth;
            toUpdate.Status = client.Status;
            toUpdate.Notes = client.Notes;
            _context.Clients.Update(toUpdate);
            await _context.SaveChangesAsync(ct);
            return new ResponseClientDto
            {
                Id = toUpdate.Id,
                FirstName = toUpdate.FirstName,
                LastName = toUpdate.LastName,
                Email = toUpdate.Email,
                PhoneNumber = toUpdate.PhoneNumber,
                Address = toUpdate.Address,
                City = toUpdate.City,
            };

        }
    }
}
