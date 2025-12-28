using ClientHub.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ClientHub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InsuranceController : ControllerBase
    {
        private readonly IInsuranceRepository _repository;

        public InsuranceController(IInsuranceRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("agent/{agentId}")]

        public async Task<IActionResult> GetInsurancesByAgentId(int agentId, CancellationToken ct)
        {
            var insurances = await _repository.GetInsurancesByAgentId(agentId, ct);
            return Ok(insurances);
        }

        [HttpGet("client/{clientId}")]

        public async Task<IActionResult> GetInsurancesByClientId(int clientId, CancellationToken ct)
        {
            var insurances = await _repository.GetInsurancesByClientId(clientId, ct);
            return Ok(insurances);
        }


        [HttpGet("revenue/{agentid}")]

        public async Task<IActionResult> getMonthlyRevenueByAgentId(int agentid, CancellationToken ct)
        {
            var totalRevenue = await _repository.GetMonthlyRevenueByAgentId(agentid, ct);
            return Ok(totalRevenue);
        }
    }
}
