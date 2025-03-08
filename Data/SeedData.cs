using ElmDocumentVerification.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace ElmDocumentVerification.Data
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new ApplicationDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<ApplicationDbContext>>()))
            {
                // Check if the database already has data
                if (context.Users.Any() || context.Documents.Any())
                {
                    return; // Database has been seeded already
                }

                // Seed Users
                var users = new[]
                {
                    new User
                    {
                        Name = "Admin User",
                        Email = "admin@example.com",
                        Password = "admin123", // In a real app, hash the password!
                        Role = "Admin"
                    },
                    new User
                    {
                        Name = "Regular User",
                        Email = "user@example.com",
                        Password = "user123", // In a real app, hash the password!
                        Role = "User"
                    }
                };

                context.Users.AddRange(users);
                context.SaveChanges();

                // Seed Documents
                var documents = new[]
                {
                    new Document
                    {
                        UserId = users[0].Id, // Admin User
                        Title = "Admin's Passport",
                        FilePath = "/uploads/admin_passport.pdf",
                        VerificationCode = Guid.NewGuid().ToString(),
                        Status = "Pending",
                        CreatedAt = DateTime.UtcNow
                    },
                    new Document
                    {
                        UserId = users[1].Id, // Regular User
                        Title = "User's ID Card",
                        FilePath = "/uploads/user_id_card.pdf",
                        VerificationCode = Guid.NewGuid().ToString(),
                        Status = "Pending",
                        CreatedAt = DateTime.UtcNow
                    }
                };

                context.Documents.AddRange(documents);
                context.SaveChanges();
            }
        }
    }
}