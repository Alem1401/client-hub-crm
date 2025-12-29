using ClientHub.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ClientHub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnalyticsController : ControllerBase
    {
        IAnalyticsRepository _repository;
        public AnalyticsController(IAnalyticsRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("revenue/{agentId}")]
        public async Task<IActionResult> GetRevenueAnalytics(int agentId, CancellationToken ct)
        {
            var analytics = await _repository.GetRevenueAnalytics(agentId, ct);
            return Ok(analytics);
        }

        [HttpGet("client-count/{agentId}")]
        public async Task<IActionResult> GetClientCountAnalytics(int agentId, CancellationToken ct)
        {
            var analytics = await _repository.GetClientCountAnalytics(agentId, ct);
            return Ok(analytics);
        }

        [HttpGet("count/car/{agentId}")]
        public async Task<IActionResult> GetCarInsuranceCountByAgentId(int agentId, CancellationToken ct)
        {
            var count = await _repository.GetCarInsuranceCountByAgentId(agentId, ct);
            return Ok(count);
        }

        [HttpGet("count/property/{agentId}")]
        public async Task<IActionResult> GetPropertyInsuranceCountByAgentId(int agentId, CancellationToken ct)
        {
            var count = await _repository.GetPropertyInsuranceCountByAgentId(agentId, ct);
            return Ok(count);
        }

        [HttpGet("total-policies/{agentId}")]
        public async Task<IActionResult> GetTotalPoliciesCount(int agentId, CancellationToken ct)
        {
            var count = await _repository.GetTotalPoliciesCount(agentId, ct);
            return Ok(count);
        }

        [HttpGet("new-this-month/{agentId}")]
        public async Task<IActionResult> GetNewPoliciesThisMonth(int agentId, CancellationToken ct)
        {
            var count = await _repository.GetNewPoliciesThisMonth(agentId, ct);
            return Ok(count);
        }

        [HttpGet("expired/{agentId}")]
        public async Task<IActionResult> GetExpiredPoliciesCount(int agentId, CancellationToken ct)
        {
            var count = await _repository.GetExpiredPoliciesCount(agentId, ct);
            return Ok(count);
        }

        [HttpGet("avg-policy-value/{agentId}")]
        public async Task<IActionResult> GetAveragePolicyValue(int agentId, CancellationToken ct)
        {
            var avg = await _repository.GetAveragePolicyValue(agentId, ct);
            return Ok(avg);
        }
    }
}
