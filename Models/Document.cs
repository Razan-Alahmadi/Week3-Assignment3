using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ElmDocumentVerification.Models
{
    public class Document
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string FilePath { get; set; }

        public string? VerificationCode { get; set; } // Not required in the request

        public string? Status { get; set; } // Not required in the request

        public DateTime CreatedAt { get; set; } // Not required in the request

        // Navigation properties (not required in the request)
        public User? User { get; set; }
        public ICollection<VerificationLog>? VerificationLogs { get; set; }
    }
}