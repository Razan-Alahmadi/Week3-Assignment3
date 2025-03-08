using ElmDocumentVerification.Models;
using ElmDocumentVerification.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using MySql.Data.MySqlClient;
using Dapper;

namespace ElmDocumentVerification.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public DocumentsController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // POST: api/documents
        [HttpPost]
        public async Task<ActionResult<Document>> UploadDocument(Document document)
        {
            // Generate a unique verification code
            document.VerificationCode = Guid.NewGuid().ToString();
            document.CreatedAt = DateTime.UtcNow;
            document.Status = "Pending";

            // Ensure User and VerificationLogs are not required in the request
            document.User = null; // Now allowed because User is nullable
            document.VerificationLogs = null; // Now allowed because VerificationLogs is nullable

            _context.Documents.Add(document);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDocument", new { id = document.Id }, document);
        }

        // GET: api/documents/getAll
        [HttpGet("getAll")]
        public async Task<ActionResult<IEnumerable<Document>>> GetAllDocuments()
        {
            var documents = await _context.Documents.ToListAsync();
            return Ok(documents);
        }

        // GET: api/documents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Document>> GetDocument(int id)
        {
            var document = await _context.Documents.FindAsync(id);

            if (document == null)
            {
                return NotFound();
            }

            return document;
        }

        // POST: api/verify
        [HttpPost("verify")]
        public async Task<IActionResult> VerifyDocument([FromBody] VerificationRequest request)
        {
            var stopwatch = System.Diagnostics.Stopwatch.StartNew();

            // Validate the request
            if (string.IsNullOrEmpty(request.VerificationCode))
            {
                return BadRequest("Verification code is required.");
            }
            if (string.IsNullOrEmpty(request.VerifiedBy))
            {
                return BadRequest("Verifier name is required.");
            }

            try
            {
                // Use Dapper for verification
                using (IDbConnection dbConnection = new MySqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    dbConnection.Open();

                    // Query the document using the verification code
                    var document = await dbConnection.QueryFirstOrDefaultAsync<Document>(
                        "SELECT * FROM Documents WHERE VerificationCode = @VerificationCode",
                        new { VerificationCode = request.VerificationCode });

                    if (document == null)
                    {
                        return BadRequest("Invalid verification code.");
                    }

                    // Update the document status
                    var affectedRows = await dbConnection.ExecuteAsync(
                        "UPDATE Documents SET Status = @Status WHERE Id = @Id",
                        new { Status = "Verified", Id = document.Id });

                    if (affectedRows == 0)
                    {
                        return BadRequest("Failed to verify the document.");
                    }

                    // Log the verification
                    var verificationLog = new VerificationLog
                    {
                        DocumentId = document.Id,
                        VerifiedBy = request.VerifiedBy,
                        Timestamp = DateTime.UtcNow,
                        Status = "Verified"
                    };

                    await dbConnection.ExecuteAsync(
                        "INSERT INTO VerificationLogs (DocumentId, VerifiedBy, Timestamp, Status) VALUES (@DocumentId, @VerifiedBy, @Timestamp, @Status)",
                        verificationLog);

                    stopwatch.Stop();
                    Console.WriteLine($"🔴Dapper Query Execution Time: {stopwatch.ElapsedMilliseconds} ms");

            return Ok($"Document verified successfully using Dapper. Time taken: {stopwatch.ElapsedMilliseconds} ms");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while verifying the document.");
            }
        }

        [HttpPost("verify-ef")]
        public async Task<IActionResult> VerifyDocumentEF([FromBody] VerificationRequest request)
        {
            var stopwatch = System.Diagnostics.Stopwatch.StartNew();

            // Validate the request
            if (string.IsNullOrEmpty(request.VerificationCode))
            {
                return BadRequest("Verification code is required.");
            }
            if (string.IsNullOrEmpty(request.VerifiedBy))
            {
                return BadRequest("Verifier name is required.");
            }

            try
            {
                // Use EF Core for verification
                var document = await _context.Documents
                    .FirstOrDefaultAsync(d => d.VerificationCode == request.VerificationCode);

                if (document == null)
                {
                    return BadRequest("Invalid verification code.");
                }

                // Update the document status
                document.Status = "Verified";
                _context.Documents.Update(document);

                // Log the verification
                var verificationLog = new VerificationLog
                {
                    DocumentId = document.Id,
                    VerifiedBy = request.VerifiedBy,
                    Timestamp = DateTime.UtcNow,
                    Status = "Verified"
                };

                _context.VerificationLogs.Add(verificationLog);
                await _context.SaveChangesAsync();

                stopwatch.Stop();
                Console.WriteLine($"🔴EF Core Query Execution Time: {stopwatch.ElapsedMilliseconds} ms");

                return Ok($"Document verified successfully using EF Core. Time taken: {stopwatch.ElapsedMilliseconds} ms");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while verifying the document.");
            }
        }
    }

    // Model for verification request
    public class VerificationRequest
    {
        public string VerificationCode { get; set; }
        public string VerifiedBy { get; set; }
    }
}