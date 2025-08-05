namespace ClinicApp.DTOs
{
    public class DoctorExaminationDto
    {
        public int PatientId { get; set; }
        public List<int> SelectedSymptoms { get; set; } = new List<int>();
        public List<int> SelectedDiagnoses { get; set; } = new List<int>();
        public string Prescriptions { get; set; }
        public string DoctorNotes { get; set; }
        public string DoctorName { get; set; }
    }
}
