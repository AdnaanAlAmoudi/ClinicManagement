using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClinicApp.Data;
using ClinicApp.Models;
using ClinicApp.DTOs;
using System.Text.Json;

namespace ClinicApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientsController : ControllerBase
    {
        private readonly ClinicDbContext _context;

        public PatientsController(ClinicDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PatientResponseDto>>> GetPatients()
        {
            var patients = await _context.Patients.ToListAsync();
            var patientDtos = patients.Select(MapToResponseDto).ToList();
            return Ok(patientDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PatientResponseDto>> GetPatient(int id)
        {
            var patient = await _context.Patients.FindAsync(id);
            if (patient == null)
                return NotFound();

            return Ok(MapToResponseDto(patient));
        }

        [HttpPost]
        public async Task<ActionResult<PatientResponseDto>> CreatePatient(PatientCreateDto patientDto)
        {
            var patient = new Patient
            {
                FirstName = patientDto.FirstName,
                LastName = patientDto.LastName,
                DateOfBirth = patientDto.DateOfBirth,
                Sex = patientDto.Sex,
                Weight = patientDto.Weight,
                Height = patientDto.Height,
                ShoeSize = patientDto.ShoeSize,
                AppointmentTime = patientDto.AppointmentTime,
                InsuranceName = patientDto.InsuranceName,
                PhoneNumber = patientDto.PhoneNumber,
                Address = patientDto.Address,
                EmergencyContact = patientDto.EmergencyContact,
                EmergencyPhone = patientDto.EmergencyPhone,
                MedicalHistory = patientDto.MedicalHistory,
                Allergies = patientDto.Allergies,
                CreatedAt = DateTime.UtcNow
            };

            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPatient), new { id = patient.Id }, MapToResponseDto(patient));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePatient(int id, PatientCreateDto patientDto)
        {
            var patient = await _context.Patients.FindAsync(id);
            if (patient == null)
                return NotFound();

            patient.FirstName = patientDto.FirstName;
            patient.LastName = patientDto.LastName;
            patient.DateOfBirth = patientDto.DateOfBirth;
            patient.Sex = patientDto.Sex;
            patient.Weight = patientDto.Weight;
            patient.Height = patientDto.Height;
            patient.ShoeSize = patientDto.ShoeSize;
            patient.AppointmentTime = patientDto.AppointmentTime;
            patient.InsuranceName = patientDto.InsuranceName;
            patient.PhoneNumber = patientDto.PhoneNumber;
            patient.Address = patientDto.Address;
            patient.EmergencyContact = patientDto.EmergencyContact;
            patient.EmergencyPhone = patientDto.EmergencyPhone;
            patient.MedicalHistory = patientDto.MedicalHistory;
            patient.Allergies = patientDto.Allergies;
            patient.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost("{id}/examination")]
        public async Task<IActionResult> UpdateExamination(int id, DoctorExaminationDto examinationDto)
        {
            var patient = await _context.Patients.FindAsync(id);
            if (patient == null)
                return NotFound();

            patient.SelectedSymptoms = JsonSerializer.Serialize(examinationDto.SelectedSymptoms);
            patient.SelectedDiagnoses = JsonSerializer.Serialize(examinationDto.SelectedDiagnoses);
            patient.Prescriptions = examinationDto.Prescriptions;
            patient.DoctorNotes = examinationDto.DoctorNotes;
            patient.DoctorName = examinationDto.DoctorName;
            patient.IsExamined = true;
            patient.ExaminationDate = DateTime.UtcNow;
            patient.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatient(int id)
        {
            var patient = await _context.Patients.FindAsync(id);
            if (patient == null)
                return NotFound();

            _context.Patients.Remove(patient);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private PatientResponseDto MapToResponseDto(Patient patient)
        {
            var dto = new PatientResponseDto
            {
                Id = patient.Id,
                FirstName = patient.FirstName,
                LastName = patient.LastName,
                DateOfBirth = patient.DateOfBirth,
                Sex = patient.Sex,
                Weight = patient.Weight,
                Height = patient.Height,
                ShoeSize = patient.ShoeSize,
                AppointmentTime = patient.AppointmentTime,
                InsuranceName = patient.InsuranceName,
                PhoneNumber = patient.PhoneNumber,
                Address = patient.Address,
                EmergencyContact = patient.EmergencyContact,
                EmergencyPhone = patient.EmergencyPhone,
                MedicalHistory = patient.MedicalHistory,
                Allergies = patient.Allergies,
                CreatedAt = patient.CreatedAt,
                UpdatedAt = patient.UpdatedAt,
                Prescriptions = patient.Prescriptions,
                DoctorNotes = patient.DoctorNotes,
                IsExamined = patient.IsExamined,
                DoctorName = patient.DoctorName,
                ExaminationDate = patient.ExaminationDate
            };

            if (!string.IsNullOrEmpty(patient.SelectedSymptoms))
            {
                dto.SelectedSymptoms = JsonSerializer.Deserialize<List<int>>(patient.SelectedSymptoms) ?? new List<int>();
            }

            if (!string.IsNullOrEmpty(patient.SelectedDiagnoses))
            {
                dto.SelectedDiagnoses = JsonSerializer.Deserialize<List<int>>(patient.SelectedDiagnoses) ?? new List<int>();
            }

            return dto;
        }
    }

   

   
}