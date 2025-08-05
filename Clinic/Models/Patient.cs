using System.ComponentModel.DataAnnotations;

namespace ClinicApp.Models
{
    public class Patient
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(100)]
        public string LastName { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string Sex { get; set; } // Male, Female, Other

        public decimal? Weight { get; set; } // in kg

        public decimal? Height { get; set; } // in cm

        public string ShoeSize { get; set; }

        [Required]
        public DateTime AppointmentTime { get; set; }

        [StringLength(100)]
        public string InsuranceName { get; set; }

        [StringLength(20)]
        public string PhoneNumber { get; set; }

        [StringLength(200)]
        public string Address { get; set; }

        [StringLength(100)]
        public string EmergencyContact { get; set; }

        [StringLength(20)]
        public string EmergencyPhone { get; set; }

        public string MedicalHistory { get; set; }

        public string Allergies { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        // Doctor fields
        public string SelectedSymptoms { get; set; } // JSON string of selected symptoms

        public string SelectedDiagnoses { get; set; } // JSON string of selected diagnoses

        public string Prescriptions { get; set; }

        public string DoctorNotes { get; set; }

        public bool IsExamined { get; set; } = false;

        public string? DoctorName { get; set; }

        public DateTime? ExaminationDate { get; set; }
    }

}