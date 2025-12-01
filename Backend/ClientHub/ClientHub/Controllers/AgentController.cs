using ClientHub.DTOs.Agents;
using ClientHub.Interfaces;
using ClientHub.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ClientHub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgentController : ControllerBase
    {

        private readonly IAgentRepository _agentRepository;

        public AgentController(IAgentRepository agentRepository)
        {
            _agentRepository = agentRepository;
        }


        [HttpPost]

        public async Task<ActionResult<Agent>> register([FromBody] RegisterAgentDTO registration,CancellationToken ct)
        {
            var result = await _agentRepository.RegisterAgent(registration, ct);
            return Ok(result);
        }

        [HttpPost("login")]

        public async Task<ActionResult<Agent>> login([FromBody] LoginAgentDTO login, CancellationToken ct)
        {
            var result = await _agentRepository.LoginAgent(login, ct);
            if (result == null)
                return Unauthorized("Wrong email or password");
            return Ok(result);
        }

        [HttpGet("{email}")]

        public async Task<ActionResult<bool>> agentExists(string email,CancellationToken ct)
        {
            return await _agentRepository.AgentExists(email, ct);
        }
    }
}
