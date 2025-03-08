
Document Verification System

This project is a Document Verification System developed for Elm Company, providing secure digital solutions for businesses and government entities in Saudi Arabia. The system allows users to upload official documents and verify them using a unique digital code.


Features

Document Upload
- Users can upload official documents with details like title, user ID, and file path.
- A unique verification code is generated for each document.

Document Verification
- Users can verify documents using the unique verification code and verifier name.

Dashboard
- View a list of all uploaded documents.
- Navigate to the Upload Document or Verify Document pages.

Document Details
- View detailed information about a specific document, including its verification status.

Technologies Used

Backend:
- ASP.NET Core
- Entity Framework Core & Dapper

Frontend:
- Angular
- TypeScript
- Bootstrap (for styling)
- Angular Router (for navigation)

Setup Instructions

Follow these steps to set up and run the project locally.

Prerequisites

Backend:
- .NET SDK (Download from dotnet.microsoft.com)
- SQL Server (Download from Microsoft)

Frontend:
- Node.js (Download from nodejs.org)
- Angular CLI (Install using npm install -g @angular/cli)

Other Tools:
- SQL Server Management Studio (SSMS)
- Git (Optional)

Step 1: Clone the Repository

git clone https://github.com/Razan-Alahmadi/Week3-Assignment-3.git
cd document-verification-system

Step 2: Backend Setup (ASP.NET Core)

Database Setup:
  "ConnectionStrings": {
    "DefaultConnection": "server=localhost;database=ElmDocumentVerificationDB;user=root;password=12345678;"
  }

Run Migrations:
dotnet ef database update

Seed Data:

dotnet run

Run the Backend:

dotnet run

The backend API will be available at:

http://localhost:5072

Step 3: Frontend Setup (Angular)

Install Dependencies:

npm install

Configure API Base URL:

private apiUrl = 'http://localhost:5072/api';

Run the Frontend:

ng serve

The application will be available at:

http://localhost:4200

Step 4: Explore the Application

Dashboard:
http://localhost:4200/dashboard

Upload Document:
http://localhost:4200/upload

Verify Document:
http://localhost:4200/verify

View Document Details:
Click View on the dashboard to see detailed document information.

Development

Run the Development Servers

Backend:
dotnet run

Frontend:
ng serve
