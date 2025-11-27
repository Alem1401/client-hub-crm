using ClientHub.DTOs.PropertyInsurance;
using ClientHub.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ClientHub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyInsuranceController : ControllerBase
    {
        readonly IPropertyInsuranceRepository _repository;

        public PropertyInsuranceController(IPropertyInsuranceRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]

        public async Task<IActionResult> AddPropertyInsurance([FromBody] CreatePropertyInsuranceDTO dto, CancellationToken ct)
        {
            try
            {
                int result = await _repository.AddPropertyInsuranceAsync(dto, ct);
                return Ok(result);
            }
            catch (ArgumentNullException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPropertyInsuranceById(int id, CancellationToken ct)
        {
            try
            {
                var result = await _repository.GetPropertyInsuranceByIdAsync(id, ct);
                if (result == null)
                {
                    return NotFound($"Property insurance with ID {id} not found.");
                }
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("agent/{agentId}")]

        public async Task<IActionResult> GetPropertyInsurancesByAgentId(int agentId, CancellationToken ct)
        {
            try
            {
                var result = await _repository.GetPropertyInsurancesByAgentIdAsync(agentId, ct);
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }


        [HttpGet("client/{clientId}")]

        public async Task<IActionResult> GetPropertyInsurancesByClientId(int clientId, CancellationToken ct)
        {
            try
            {
                var result = await _repository.GetPropertyInsurancesByClientIdAsync(clientId, ct);
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }


        [HttpDelete("{id}")]

        public async Task<IActionResult> DeletePropertyInsurance(int id, CancellationToken ct)
        {
            try
            {
                var result = await _repository.DeletePropertyInsurance(id, ct);
                if (result)
                {
                    return NoContent();
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    success = false,
                    error = "Internal server error"
                });
            }
        }



    }
}
