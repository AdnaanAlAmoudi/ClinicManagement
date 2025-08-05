using System.ComponentModel.DataAnnotations;

namespace ClinicApp.DTOs
{
    public class PatientCreateDto
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string Sex { get; set; }

        public decimal? Weight { get; set; }

        public decimal? Height { get; set; }

        public string ShoeSize { get; set; }

        [Required]
        public DateTime AppointmentTime { get; set; }

        public string InsuranceName { get; set; }

        public string PhoneNumber { get; set; }

        public string Address { get; set; }

        public string EmergencyContact { get; set; }

        public string EmergencyPhone { get; set; }

        public string MedicalHistory { get; set; }

        public string Allergies { get; set; }
    }
}