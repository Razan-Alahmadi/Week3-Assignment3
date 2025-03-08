using System.ComponentModel.DataAnnotations;

namespace ElmDocumentVerification.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [MaxLength(100)]
        public string Email { get; set; }

        [Required]
        [MaxLength(100)]
        public string Password { get; set; }

        [Required]
        [MaxLength(50)]
        public string Role { get; set; } // e.g., Admin, User

        // Navigation property for Documents
        public ICollection<Document> Documents { get; set; }
    }
}