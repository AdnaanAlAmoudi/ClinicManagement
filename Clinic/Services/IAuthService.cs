using ClinicApp.Models;

namespace ClinicApp.Services
{
    public interface IAuthService
    {
        Task<LoginResponse> LoginAsync(LoginRequest request);
        Task<User?> GetUserByIdAsync(int id);
        string GenerateJwtToken(User user);
    }
}
