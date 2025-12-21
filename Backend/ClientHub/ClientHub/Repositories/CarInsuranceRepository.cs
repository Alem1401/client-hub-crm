using ClientHub.Data;
using ClientHub.DTOs.CarInsurance;
using ClientHub.Interfaces;
using ClientHub.Models;
using Microsoft.EntityFrameworkCore;

namespace ClientHub.Repositories
{
    public class CarInsuranceRepository : ICarInsuranceRepository
    {
        public DataContext _context;

        public CarInsuranceRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<int> AddCarInsurance(CreateCarInsuranceDto carInsuranceDto, CancellationToken ct)
        {
            try
            {
                bool policyExists = await _context.Insurances
                    .AnyAsync(ci => ci.PolicyNumber == carInsuranceDto.PolicyNumber, ct);

                if (policyExists)
                {
                    return -1;
                }

                bool clientExists = await _context.Clients
                    .AnyAsync(c => c.Id == carInsuranceDto.ClientId, ct);

                if (!clientExists)
                {
                    return -2;
                }

                bool agentExists = await _context.Agents
                    .AnyAsync(a => a.Id == carInsuranceDto.AgentId, ct);

                if (!agentExists)
                {
                    return -3;
                }

                if (carInsuranceDto.EndDate <= carInsuranceDto.StartDate)
                {
                    return -4;
                }

                var carInsurance = new CarInsurance
                {
                    Bonus = carInsuranceDto.Bonus,
                    ChassisNumber = carInsuranceDto.ChassisNumber,
                    Color = carInsuranceDto.Color,
                    VehicleType = carInsuranceDto.VehicleType,
                    Purpose = carInsuranceDto.Purpose,
                    Category = carInsuranceDto.Category,
                    RegistrationPlate = carInsuranceDto.RegistrationPlate,
                    ProductionYear = carInsuranceDto.ProductionYear,
                    PowerKw = carInsuranceDto.PowerKw,
                    EngineCcm = carInsuranceDto.EngineCcm,
                    Type = carInsuranceDto.Type,

                    StartDate = carInsuranceDto.StartDate,
                    EndDate = carInsuranceDto.EndDate,
                    PolicyNumber = carInsuranceDto.PolicyNumber,
                    TotalAmount = carInsuranceDto.TotalAmount,
                    Discount = carInsuranceDto.Discount,
                    Surcharge = carInsuranceDto.Surcharge,
                    Notes = carInsuranceDto.Notes,

                    ClientId = carInsuranceDto.ClientId,
                    AgentId = carInsuranceDto.AgentId
                };

                _context.Insurances.Add(carInsurance);
                await _context.SaveChangesAsync(ct);

                return carInsurance.Id;
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine($"Database error: {ex.Message}");
                return -5;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return -6;
            }
        }

        public async Task<bool> DeleteCarInsurance(int id, CancellationToken ct)
        {
            var toDelete = await _context.Insurances
                .OfType<CarInsurance>()
                .FirstOrDefaultAsync(ci => ci.Id == id, ct);

            if (toDelete == null)
            {
                return false;
            }

            _context.Insurances.Remove(toDelete);
            await _context.SaveChangesAsync(ct);
            return true;
        }

        public async Task<IEnumerable<ResponseCarInsuranceDto>> getCarInsuranceByClientId(int id, CancellationToken ct)
        {
            var responseList = await _context.Insurances
                .OfType<CarInsurance>()
                .Where(ci => ci.ClientId == id)
                .Select(ci => new ResponseCarInsuranceDto
                {
                    Id = ci.Id,
                    Bonus = ci.Bonus,
                    ChassisNumber = ci.ChassisNumber,
                    Color = ci.Color,
                    VehicleType = ci.VehicleType,
                    Purpose = ci.Purpose,
                    Category = ci.Category,
                    RegistrationPlate = ci.RegistrationPlate,
                    ProductionYear = ci.ProductionYear,
                    PowerKw = ci.PowerKw,
                    EngineCcm = ci.EngineCcm,
                    Type = ci.Type,
                    StartDate = ci.StartDate,
                    EndDate = ci.EndDate,
                    PolicyNumber = ci.PolicyNumber,
                    TotalAmount = ci.TotalAmount,
                    Discount = ci.Discount,
                    Surcharge = ci.Surcharge,
                    Notes = ci.Notes,
                    ClientId = ci.ClientId,
                    AgentId = ci.AgentId
                })
                .ToListAsync(ct);

            return responseList;
        }

        public async Task<IEnumerable<ResponseCarInsuranceDto>> getCarInsurancesByAgentId(int id, CancellationToken ct)
        {
            var responseList = await _context.Insurances
                .OfType<CarInsurance>()
                .Where(ci => ci.AgentId == id)
                .Select(ci => new ResponseCarInsuranceDto
                {
                    Id = ci.Id,
                    Bonus = ci.Bonus,
                    ChassisNumber = ci.ChassisNumber,
                    Color = ci.Color,
                    VehicleType = ci.VehicleType,
                    Purpose = ci.Purpose,
                    Category = ci.Category,
                    RegistrationPlate = ci.RegistrationPlate,
                    ProductionYear = ci.ProductionYear,
                    PowerKw = ci.PowerKw,
                    EngineCcm = ci.EngineCcm,
                    Type = ci.Type,
                    StartDate = ci.StartDate,
                    EndDate = ci.EndDate,
                    PolicyNumber = ci.PolicyNumber,
                    TotalAmount = ci.TotalAmount,
                    Discount = ci.Discount,
                    Surcharge = ci.Surcharge,
                    Notes = ci.Notes,
                    ClientId = ci.ClientId,
                    AgentId = ci.AgentId
                })
                .ToListAsync(ct);

            return responseList;
        }

        public async Task<ResponseCarInsuranceDto?> GetCarInsuranceById(int id, CancellationToken ct)
        {
            var carInsurance = await _context.Insurances
                .OfType<CarInsurance>()
                .AsNoTracking()
                .FirstOrDefaultAsync(ci => ci.Id == id, ct);

            if (carInsurance is null)
            {
                return null;
            }

            var response = new ResponseCarInsuranceDto
            {
                Id = carInsurance.Id,
                Bonus = carInsurance.Bonus,
                ChassisNumber = carInsurance.ChassisNumber,
                Color = carInsurance.Color,
                VehicleType = carInsurance.VehicleType,
                Purpose = carInsurance.Purpose,
                Category = carInsurance.Category,
                RegistrationPlate = carInsurance.RegistrationPlate,
                ProductionYear = carInsurance.ProductionYear,
                PowerKw = carInsurance.PowerKw,
                EngineCcm = carInsurance.EngineCcm,
                Type = carInsurance.Type,
                StartDate = carInsurance.StartDate,
                EndDate = carInsurance.EndDate,
                PolicyNumber = carInsurance.PolicyNumber,
                TotalAmount = carInsurance.TotalAmount,
                Discount = carInsurance.Discount,
                Surcharge = carInsurance.Surcharge,
                Notes = carInsurance.Notes,
                ClientId = carInsurance.ClientId,
                AgentId = carInsurance.AgentId
            };

            return response;
        }

        public async Task<ResponseCarInsuranceDto?> getCarInsuranceById(int id, CancellationToken ct)
        {
            var carInsurance = await _context.Insurances
                .OfType<CarInsurance>()
                .AsNoTracking()
                .FirstOrDefaultAsync(ci => ci.Id == id, ct);
            if (carInsurance is null)
            {
                return null;
            }
            else
            {
                var response = new ResponseCarInsuranceDto
                {
                    Id = carInsurance.Id,
                    Bonus = carInsurance.Bonus,
                    ChassisNumber = carInsurance.ChassisNumber,
                    Color = carInsurance.Color,
                    VehicleType = carInsurance.VehicleType,
                    Purpose = carInsurance.Purpose,
                    Category = carInsurance.Category,
                    RegistrationPlate = carInsurance.RegistrationPlate,
                    ProductionYear = carInsurance.ProductionYear,
                    PowerKw = carInsurance.PowerKw,
                    EngineCcm = carInsurance.EngineCcm,
                    Type = carInsurance.Type,
                    StartDate = carInsurance.StartDate,
                    EndDate = carInsurance.EndDate,
                    PolicyNumber = carInsurance.PolicyNumber,
                    TotalAmount = carInsurance.TotalAmount,
                    Discount = carInsurance.Discount,
                    Surcharge = carInsurance.Surcharge,
                    Notes = carInsurance.Notes,
                    ClientId = carInsurance.ClientId,
                    AgentId = carInsurance.AgentId
                };
                return response;
            }
        }
    }
}