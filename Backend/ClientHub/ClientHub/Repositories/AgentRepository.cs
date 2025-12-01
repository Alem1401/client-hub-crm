using ClientHub.Data;
using ClientHub.Interfaces;
using ClientHub.Models;
using ClientHub.Helpers;
using Microsoft.EntityFrameworkCore;
using ClientHub.DTOs.Agents;

namespace ClientHub.Repositories
{
    public class AgentRepository : IAgentRepository
    {
        private readonly DataContext _context;

        public AgentRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Agent?> LoginAgent(LoginAgentDTO loginAgentDTO, CancellationToken ct)
        {
         
            var agent = await _context.Agents.FirstOrDefaultAsync(a => a.Email == loginAgentDTO.Email, ct);

            if (agent == null)
                return null; 

      
            bool validPassword = PasswordHelper.VerifyPasswordHash(
                loginAgentDTO.Password,
                agent.PasswordHash,
                agent.PasswordSalt
            );

            if (!validPassword)
                return null; 

        
            return agent;
        }

        public async Task<Agent> RegisterAgent(RegisterAgentDTO registerAgentDTO, CancellationToken ct)
        {
          
          

          
            PasswordHelper.CreatePasswordHash(registerAgentDTO.Password, out byte[] hash, out byte[] salt);

            
            var newAgent = new Agent
            {
                FirstName = registerAgentDTO.FirstName,
                LastName = registerAgentDTO.LastName,
                Email = registerAgentDTO.Email,
                PasswordHash = hash,
                PasswordSalt = salt
            };

            _context.Agents.Add(newAgent);
            await _context.SaveChangesAsync(ct);

            return newAgent;
        }

        public async Task<bool> AgentExists(string email, CancellationToken ct)
        {
          return await _context.Agents.AnyAsync(a => a.Email == email, ct);
        }

       
    }
}
