using ClinicApp.Data;
using ClinicApp.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ClinicApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SymptomsController : ControllerBase
    {
        private readonly ClinicDbContext _context;

        public SymptomsController(ClinicDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SymptomDto>>> GetSymptoms()
        {
            var symptoms = await _context.Symptoms.ToListAsync();
            var symptomDtos = symptoms.Select(s => new SymptomDto
            {
                Id = s.Id,
                Name = s.Name,
                Category = s.Category
            }).ToList();

            return Ok(symptomDtos);
        }
    }
}
