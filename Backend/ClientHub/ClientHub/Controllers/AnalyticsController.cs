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
    }
}
