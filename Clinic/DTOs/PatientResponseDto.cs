namespace ClinicApp.DTOs
{
    public class PatientResponseDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Sex { get; set; }
        public decimal? Weight { get; set; }
        public decimal? Height { get; set; }
        public string ShoeSize { get; set; }
        public DateTime AppointmentTime { get; set; }
        public string InsuranceName { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string EmergencyContact { get; set; }
        public string EmergencyPhone { get; set; }
        public string MedicalHistory { get; set; }
        public string Allergies { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public List<int> SelectedSymptoms { get; set; } = new List<int>();
        public List<int> SelectedDiagnoses { get; set; } = new List<int>();
        public string Prescriptions { get; set; }
        public string DoctorNotes { get; set; }
        public bool IsExamined { get; set; }
        public string? DoctorName { get; set; }
        public DateTime? ExaminationDate { get; set; }
        public int Age => DateTime.Now.Year - DateOfBirth.Year - (DateTime.Now.DayOfYear < DateOfBirth.DayOfYear ? 1 : 0);
    }
}
