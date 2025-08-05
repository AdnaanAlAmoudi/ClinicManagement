using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ClinicApp.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Diagnoses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Diagnoses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Patients",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Sex = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Weight = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Height = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    ShoeSize = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AppointmentTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    InsuranceName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    EmergencyContact = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    EmergencyPhone = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    MedicalHistory = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Allergies = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SelectedSymptoms = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SelectedDiagnoses = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Prescriptions = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DoctorNotes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsExamined = table.Column<bool>(type: "bit", nullable: false),
                    DoctorName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExaminationDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patients", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Symptoms",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Symptoms", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Role = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Diagnoses",
                columns: new[] { "Id", "Category", "Code", "Name" },
                values: new object[,]
                {
                    { 1, "Respiratory", "J00", "Common Cold" },
                    { 2, "Cardiovascular", "I10", "Hypertension" },
                    { 3, "Endocrine", "E11", "Type 2 Diabetes" },
                    { 4, "Mental Health", "F41.9", "Anxiety Disorder" },
                    { 5, "Neurological", "G43", "Migraine" },
                    { 6, "Gastrointestinal", "K29", "Gastritis" },
                    { 7, "Respiratory", "J30", "Allergic Rhinitis" },
                    { 8, "Musculoskeletal", "M54.5", "Lower Back Pain" },
                    { 9, "Dermatological", "L30", "Eczema" },
                    { 10, "Genitourinary", "N39.0", "Urinary Tract Infection" },
                    { 11, "Respiratory", "J40", "Bronchitis" },
                    { 12, "Mental Health", "F32", "Depression" },
                    { 13, "Musculoskeletal", "M15", "Osteoarthritis" },
                    { 14, "Respiratory", "J45", "Asthma" },
                    { 15, "Nutritional", "E55", "Vitamin D Deficiency" }
                });

            migrationBuilder.InsertData(
                table: "Symptoms",
                columns: new[] { "Id", "Category", "Name" },
                values: new object[,]
                {
                    { 1, "General", "Fever" },
                    { 2, "Neurological", "Headache" },
                    { 3, "Respiratory", "Cough" },
                    { 4, "Respiratory", "Shortness of breath" },
                    { 5, "Cardiovascular", "Chest pain" },
                    { 6, "Gastrointestinal", "Nausea" },
                    { 7, "Gastrointestinal", "Vomiting" },
                    { 8, "Gastrointestinal", "Diarrhea" },
                    { 9, "General", "Fatigue" },
                    { 10, "Neurological", "Dizziness" },
                    { 11, "Musculoskeletal", "Joint pain" },
                    { 12, "Musculoskeletal", "Back pain" },
                    { 13, "Dermatological", "Skin rash" },
                    { 14, "General", "Insomnia" },
                    { 15, "General", "Weight loss" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "FirstName", "IsActive", "LastName", "Password", "Role", "Username" },
                values: new object[] { 1, new DateTime(2025, 7, 30, 18, 49, 51, 499, DateTimeKind.Utc).AddTicks(2682), "admin@hospital.com", "Admin", true, "User", "$2a$11$JVglH0ppou62UragLOHhCOVQrow0Hi4mHtIsE8cq1tjJo81PrWNjG", 1, "Adnaan" });

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_Username",
                table: "Users",
                column: "Username",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Diagnoses");

            migrationBuilder.DropTable(
                name: "Patients");

            migrationBuilder.DropTable(
                name: "Symptoms");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
