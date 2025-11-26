using ClientHub.DTOs.CarInsurance;
using ClientHub.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Formats.Asn1;

namespace ClientHub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarInsuranceController : ControllerBase
    {

        public ICarInsuranceRepository _repository;

        public CarInsuranceController(ICarInsuranceRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        public async Task<IActionResult> AddCarInsurance([FromBody] CreateCarInsuranceDto carInsuranceDto, CancellationToken ct)
        {
            try
            {
               
                if (!ModelState.IsValid)
                {
                    return BadRequest(new
                    {
                        success = false,
                        errors = ModelState.Values
                            .SelectMany(v => v.Errors)
                            .Select(e => e.ErrorMessage)
                    });
                }

                var result = await _repository.AddCarInsurance(carInsuranceDto, ct);

                if (result > 0)
                {
                    return Ok(new
                    {
                        success = true,
                        id = result,
                        message = "Car insurance created !"
                    });
                }
                else
                {
                    var errorMessage = result switch
                    {
                        -1 => "Number of policiy already exists",
                        -2 => "Client doesn't exist",
                        -3 => "Agent doesn't exist",
                        -4 => "Invalid date",
                        -5 => "Error while saving to database",
                        -6 => "Unknown error",
                        _ => "Error while saving insurance"
                    };

                    return BadRequest(new
                    {
                        success = false,
                        error = errorMessage
                    });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    error = "Internal server error"
                });
            }
        }
        [HttpGet("agent/{id}")]

        public async Task<IEnumerable<ResponseCarInsuranceDto>> GetCarInsuranceByAgent(int id, CancellationToken ct)
        {
            return await _repository.getCarInsurancesByAgentId(id, ct);
        }

        [HttpGet("client/{id}")]

        public async Task<IEnumerable<ResponseCarInsuranceDto>> GetCarInsuranceByClient(int id, CancellationToken ct)
        {
            return await _repository.getCarInsuranceByClientId(id, ct);
        }   
    }
}
