using ClientHub.DTOs.CarInsurance;

namespace ClientHub.Interfaces
{
    public interface ICarInsuranceRepository
    {
        public Task<int> AddCarInsurance(CreateCarInsuranceDto carInsurance,CancellationToken ct);
        public Task<bool> DeleteCarInsurance(int id, CancellationToken ct);

        public Task<IEnumerable<ResponseCarInsuranceDto>> getCarInsurancesByAgentId(int id, CancellationToken ct);

        public Task<IEnumerable<ResponseCarInsuranceDto>> getCarInsuranceByClientId(int id, CancellationToken ct); 

        public Task<ResponseCarInsuranceDto?> getCarInsuranceById(int id, CancellationToken ct);
    }
}
