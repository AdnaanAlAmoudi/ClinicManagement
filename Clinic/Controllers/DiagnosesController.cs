using ClinicApp.Data;
using ClinicApp.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ClinicApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DiagnosesController : ControllerBase
    {
        private readonly ClinicDbContext _context;

        public DiagnosesController(ClinicDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DiagnosisDto>>> GetDiagnoses()
        {
            var diagnoses = await _context.Diagnoses.ToListAsync();
            var diagnosisDtos = diagnoses.Select(d => new DiagnosisDto
            {
                Id = d.Id,
                Name = d.Name,
                Code = d.Code,
                Category = d.Category
            }).ToList();

            return Ok(diagnosisDtos);
        }
    }
}
