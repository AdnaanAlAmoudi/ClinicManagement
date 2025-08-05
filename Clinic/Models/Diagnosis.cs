namespace ClinicApp.Models
{
    public class Diagnosis
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; } // ICD-10 code
        public string Category { get; set; }
    }
}
