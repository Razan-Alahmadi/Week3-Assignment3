using System;
using System.ComponentModel.DataAnnotations;

namespace ElmDocumentVerification.Models
{
    public class VerificationLog
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int DocumentId { get; set; } // Foreign key to Document

        [Required]
        [MaxLength(100)]
        public string VerifiedBy { get; set; } // Name or ID of the verifier

        [Required]
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;

        [Required]
        [MaxLength(50)]
        public string Status { get; set; } // e.g., Verified, Rejected

        // Navigation property for Document
        public Document Document { get; set; }
    }
}