using Microsoft.EntityFrameworkCore;
using ClinicApp.Models;

namespace ClinicApp.Data
{
    public class ClinicDbContext : DbContext
    {
        public ClinicDbContext(DbContextOptions<ClinicDbContext> options) : base(options)
        {
        }

        public DbSet<Patient> Patients { get; set; }
        public DbSet<Symptom> Symptoms { get; set; }
        public DbSet<Diagnosis> Diagnoses { get; set; }
        public DbSet<User> Users { get; set; }

       
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Patient entity
            modelBuilder.Entity<Patient>(entity =>
            {
                entity.Property(e => e.DoctorName).IsRequired(false);
                entity.Property(e => e.SelectedSymptoms).IsRequired(false);
                entity.Property(e => e.SelectedDiagnoses).IsRequired(false);
                entity.Property(e => e.Prescriptions).IsRequired(false);
                entity.Property(e => e.DoctorNotes).IsRequired(false);
            });

            // Seed symptoms data
            modelBuilder.Entity<Symptom>().HasData(
                new Symptom { Id = 1, Name = "Fever", Category = "General" },
                new Symptom { Id = 2, Name = "Headache", Category = "Neurological" },
                new Symptom { Id = 3, Name = "Cough", Category = "Respiratory" },
                new Symptom { Id = 4, Name = "Shortness of breath", Category = "Respiratory" },
                new Symptom { Id = 5, Name = "Chest pain", Category = "Cardiovascular" },
                new Symptom { Id = 6, Name = "Nausea", Category = "Gastrointestinal" },
                new Symptom { Id = 7, Name = "Vomiting", Category = "Gastrointestinal" },
                new Symptom { Id = 8, Name = "Diarrhea", Category = "Gastrointestinal" },
                new Symptom { Id = 9, Name = "Fatigue", Category = "General" },
                new Symptom { Id = 10, Name = "Dizziness", Category = "Neurological" },
                new Symptom { Id = 11, Name = "Joint pain", Category = "Musculoskeletal" },
                new Symptom { Id = 12, Name = "Back pain", Category = "Musculoskeletal" },
                new Symptom { Id = 13, Name = "Skin rash", Category = "Dermatological" },
                new Symptom { Id = 14, Name = "Insomnia", Category = "General" },
                new Symptom { Id = 15, Name = "Weight loss", Category = "General" }
            );

            // Seed diagnosis data
            modelBuilder.Entity<Diagnosis>().HasData(
                new Diagnosis { Id = 1, Name = "Common Cold", Code = "J00", Category = "Respiratory" },
                new Diagnosis { Id = 2, Name = "Hypertension", Code = "I10", Category = "Cardiovascular" },
                new Diagnosis { Id = 3, Name = "Type 2 Diabetes", Code = "E11", Category = "Endocrine" },
                new Diagnosis { Id = 4, Name = "Anxiety Disorder", Code = "F41.9", Category = "Mental Health" },
                new Diagnosis { Id = 5, Name = "Migraine", Code = "G43", Category = "Neurological" },
                new Diagnosis { Id = 6, Name = "Gastritis", Code = "K29", Category = "Gastrointestinal" },
                new Diagnosis { Id = 7, Name = "Allergic Rhinitis", Code = "J30", Category = "Respiratory" },
                new Diagnosis { Id = 8, Name = "Lower Back Pain", Code = "M54.5", Category = "Musculoskeletal" },
                new Diagnosis { Id = 9, Name = "Eczema", Code = "L30", Category = "Dermatological" },
                new Diagnosis { Id = 10, Name = "Urinary Tract Infection", Code = "N39.0", Category = "Genitourinary" },
                new Diagnosis { Id = 11, Name = "Bronchitis", Code = "J40", Category = "Respiratory" },
                new Diagnosis { Id = 12, Name = "Depression", Code = "F32", Category = "Mental Health" },
                new Diagnosis { Id = 13, Name = "Osteoarthritis", Code = "M15", Category = "Musculoskeletal" },
                new Diagnosis { Id = 14, Name = "Asthma", Code = "J45", Category = "Respiratory" },
                new Diagnosis { Id = 15, Name = "Vitamin D Deficiency", Code = "E55", Category = "Nutritional" }
            );

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.Username).IsUnique();
                entity.HasIndex(e => e.Email).IsUnique();
                entity.Property(e => e.Role).HasConversion<int>();
            });

            // Seed admin user
            modelBuilder.Entity<User>().HasData(new User
            {
                Id = 1,
                Username = "Adnaan",
                Password = BCrypt.Net.BCrypt.HashPassword("Phyclone@2002"),
                FirstName = "Admin",
                LastName = "User",
                Email = "admin@hospital.com",
                Role = UserRole.Admin,
                CreatedAt = DateTime.UtcNow,
                IsActive = true
            });
        }
    }
}