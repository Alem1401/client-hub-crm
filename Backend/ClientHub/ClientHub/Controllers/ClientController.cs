using ClientHub.DTOs.Clients;
using ClientHub.Interfaces;
using ClientHub.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace ClientHub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {

        IClientRepository _repository;

        public ClientController(IClientRepository repository)
        {
            _repository = repository;
        }


        [HttpPost]

        public async Task<ActionResult<Client>> AddClient([FromBody] CreateClientDto client,CancellationToken ct)
        {
            if (client == null)
            {
                return BadRequest("Client is null.");
            }

            var response = await _repository.AddClient(client, ct);
            return Ok(response);
        }

        [HttpGet("agent/{id}")]

        public async Task<ActionResult<IEnumerable<ResponseClientDto>>> GetClientsByAgent(int id, CancellationToken ct)
        {
            var clients = await _repository.GetClientByAgent(id, ct);
            return Ok(clients);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ResponseClientDto>> GetClientById(int id, CancellationToken ct)
        {
            var client = await _repository.GetClientById(id, ct);
            if (client == null)
                return NotFound();

            return Ok(client);
        }

        [HttpPut("{id}")]

        public async Task<ActionResult<ResponseClientDto>> UpdateClient(int id, [FromBody] DetailsClientDto client, CancellationToken ct)
        {
            if (client == null)
            {
                return BadRequest("Client is null.");
            }

            var updatedClient = await _repository.UpdateClient(id, client, ct);
            return Ok(updatedClient);
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult> DeleteClient(int id, CancellationToken ct)
        {
            var result = await _repository.DeleteClient(id, ct);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
