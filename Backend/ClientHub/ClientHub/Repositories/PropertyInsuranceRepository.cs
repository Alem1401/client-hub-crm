using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ClientHub.Data;
using ClientHub.DTOs.PropertyInsurance;
using ClientHub.Interfaces;
using ClientHub.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace ClientHub.Repositories
{
    public class PropertyInsuranceRepository : IPropertyInsuranceRepository
    {
        private readonly DataContext _context;

        public PropertyInsuranceRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<int> AddPropertyInsuranceAsync(CreatePropertyInsuranceDTO dto, CancellationToken ct)
        {
            if (dto is null)
            {
                throw new ArgumentNullException(nameof(dto));
            }

           
            var client = await _context.Clients
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == dto.ClientId, ct);

            if (client is null)
            {
                throw new InvalidOperationException("Client not found.");
            }

            
            if (client.AgentId != dto.AgentId)
            {
                throw new InvalidOperationException("Client does not belong to the specified agent.");
            }



            var newPropertyInsurance = new PropertyInsurance
            {
                AgentId = dto.AgentId,
                ClientId = dto.ClientId,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                PolicyNumber = dto.PolicyNumber,
                TotalAmount = dto.TotalAmount,
                Discount = dto.Discount,
                Surcharge = dto.Surcharge,
                Notes = dto.Notes,
                Address = dto.Address,
                City = dto.City,
                Risks = dto.Risks,
                SquareMeters = dto.SquareMeters
            };
            _context.Insurances.Add(newPropertyInsurance);
            await _context.SaveChangesAsync(ct);
            return  newPropertyInsurance.Id;
        }

        public async Task<ResponsePropertyInsuranceDTO?> GetPropertyInsuranceByIdAsync(int id, CancellationToken ct)
        {
            var propertyInsurance = await _context.Insurances.OfType<PropertyInsurance>()
                .AsNoTracking()
                .FirstOrDefaultAsync(pi => pi.Id == id, ct);    
            if (propertyInsurance is null)
            {
                return null;
            }
            else
            {
               var response = new ResponsePropertyInsuranceDTO
                {
                    Id = propertyInsurance.Id,
                    AgentId = propertyInsurance.AgentId,
                    ClientId = propertyInsurance.ClientId,
                    StartDate = propertyInsurance.StartDate,
                    EndDate = propertyInsurance.EndDate,
                    PolicyNumber =propertyInsurance.PolicyNumber,
                    TotalAmount = propertyInsurance.TotalAmount,
                    Discount = propertyInsurance.Discount,
                    Surcharge = propertyInsurance.Surcharge,
                    Notes = propertyInsurance.Notes,
                    Address = propertyInsurance.Address,
                    City = propertyInsurance.City,
                    Risks = propertyInsurance.Risks,
                    SquareMeters = propertyInsurance.SquareMeters
                };
                return response;
            }
        }

        public async Task<IEnumerable<ResponsePropertyInsuranceDTO>> GetPropertyInsurancesByAgentIdAsync(int agentId, CancellationToken ct)
        {
            return await _context.Insurances.
                OfType<PropertyInsurance>().
                AsNoTracking().
                Where(pi => pi.AgentId == agentId)
                .Select(pi => new ResponsePropertyInsuranceDTO
                {
                    Id = pi.Id,
                    AgentId = pi.AgentId,
                    ClientId = pi.ClientId,
                    StartDate = pi.StartDate,
                    EndDate = pi.EndDate,
                    PolicyNumber = pi.PolicyNumber,
                    TotalAmount = pi.TotalAmount,
                    Discount = pi.Discount,
                    Surcharge = pi.Surcharge,
                    Notes = pi.Notes,
                    Address = pi.Address,
                    City = pi.City,
                    Risks = pi.Risks,
                    SquareMeters = pi.SquareMeters
                })
                .ToListAsync(ct);

        }

        public async Task<IEnumerable<ResponsePropertyInsuranceDTO>> GetPropertyInsurancesByClientIdAsync(int clientId, CancellationToken ct)
        {
            return await _context.Insurances.
                OfType<PropertyInsurance>().
                AsNoTracking().
                Where(pi => pi.ClientId == clientId)
                .Select(pi => new ResponsePropertyInsuranceDTO
                {
                    Id = pi.Id,
                    AgentId = pi.AgentId,
                    ClientId = pi.ClientId,
                    StartDate = pi.StartDate,
                    EndDate = pi.EndDate,
                    PolicyNumber = pi.PolicyNumber,
                    TotalAmount = pi.TotalAmount,
                    Discount = pi.Discount,
                    Surcharge = pi.Surcharge,
                    Notes = pi.Notes,
                    Address = pi.Address,
                    City = pi.City,
                    Risks = pi.Risks,
                    SquareMeters = pi.SquareMeters
                })
                .ToListAsync(ct);

        }

        public async Task<bool> DeletePropertyInsurance(int id, CancellationToken ct)
        {
            var toDelete = await _context.Insurances
                .OfType<PropertyInsurance>()
                .FirstOrDefaultAsync(pi => pi.Id == id, ct);
            if (toDelete == null)
            {
                return false;
            }
            _context.Insurances.Remove(toDelete);
            await _context.SaveChangesAsync(ct);
            return true;
        }

        public async Task<ResponsePropertyInsuranceDTO?>  GetPropertyInsuranceById(int id, CancellationToken ct)
        {
            var propertyInsurance =await  _context.Insurances.OfType<PropertyInsurance>()
                .AsNoTracking()
                .FirstOrDefaultAsync(pi => pi.Id == id, ct);
            if (propertyInsurance is null)
            {
                return null;
            }
            else
            {
                var response = new ResponsePropertyInsuranceDTO
                {
                    Id = propertyInsurance.Id,
                    AgentId = propertyInsurance.AgentId,
                    ClientId = propertyInsurance.ClientId,
                    StartDate = propertyInsurance.StartDate,
                    EndDate = propertyInsurance.EndDate,
                    PolicyNumber = propertyInsurance.PolicyNumber,
                    TotalAmount = propertyInsurance.TotalAmount,
                    Discount = propertyInsurance.Discount,
                    Surcharge = propertyInsurance.Surcharge,
                    Notes = propertyInsurance.Notes,
                    Address = propertyInsurance.Address,
                    City = propertyInsurance.City,
                    Risks = propertyInsurance.Risks,
                    SquareMeters = propertyInsurance.SquareMeters
                };
                return response;
            }


        }
    }
}
