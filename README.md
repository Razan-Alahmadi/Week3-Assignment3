# Document Verification System

This project is a Document Verification System developed for Elm Company, providing secure digital solutions for businesses and government entities in Saudi Arabia. The system allows users to upload official documents and verify them using a unique digital code.

---

## Features

### Document Upload
- Users can upload official documents with details like title, user ID, and file path.
- A unique verification code is generated for each document.
- Shows error messages for invalid inputs.

### Document Verification
- Users can verify documents using the unique verification code and verifier name.

### Dashboard
- View a list of all uploaded documents.
- Navigate to the Upload Document or Verify Document pages.

### Document Details
- View detailed information about a specific document, including its verification status.

## State Management (Zustand)
- Stores document data globally.

## Performance Analysis
- Compares Entity Framework vs. Dapper using logs and analyzes performance.

---

## Technologies Used

### Backend:
- ASP.NET Core
- Entity Framework Core & Dapper

### Frontend:
- Angular
- TypeScript
- Bootstrap (for styling)
- Angular Router (for navigation)
- Zustand (for state management)

---

## Setup Instructions

### Prerequisites

#### Backend:
- .NET SDK (Download from [dotnet.microsoft.com](https://dotnet.microsoft.com))
- SQL Server (Download from Microsoft)

#### Frontend:
- Node.js (Download from [nodejs.org](https://nodejs.org))
- Angular CLI (Install using `npm install -g @angular/cli`)

---

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Razan-Alahmadi/Week3-Assignment3.git
```

### 2. Backend Setup (ASP.NET Core)

#### Database Setup:

Update the connection string in `appsettings.json`:

```json
"ConnectionStrings": {
    "DefaultConnection": "server=localhost;database=ElmDocumentVerificationDB;user=root;password=12345678;"
}
```

#### Run Migrations:

```bash
dotnet ef database update
```

#### Seed Data:

```bash
dotnet run
```

#### Run the Backend:

```bash
dotnet run
```

The backend API will be available at:

[http://localhost:5072](http://localhost:5072)

---

### 3. Frontend Setup (Angular)

#### Install Dependencies:

```bash
npm install
```

#### Configure API Base URL:

Set the `apiUrl` in the Angular service:

```typescript
private apiUrl = 'http://localhost:5072/api';
```

#### Run the Frontend:

```bash
ng serve
```

The application will be available at:

[http://localhost:4200](http://localhost:4200)

---

### 4. Explore the Application

#### Dashboard:
[http://localhost:4200/dashboard](http://localhost:4200/dashboard)

#### Upload Document:
[http://localhost:4200/upload](http://localhost:4200/upload)

#### Verify Document:
[http://localhost:4200/verify](http://localhost:4200/verify)

#### View Document Details:
Click **View** on the dashboard to see detailed document information.

---

## Development

### Run the Development Servers

#### Backend:

```bash
dotnet run
```

#### Frontend:

```bash
ng serve
```
