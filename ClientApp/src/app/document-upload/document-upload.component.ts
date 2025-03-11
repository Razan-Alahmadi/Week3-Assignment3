// ClientApp\src\app\document-upload\document-upload.component.ts

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StoreService } from '../state/store.service'; // Import the StoreService
import { Document } from '../state/store.model'; // Import the Document interface

@Component({
  selector: 'app-document-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css'],
})
export class DocumentUploadComponent {
  document: Document = {
    userId: 0, // Initialize with default values
    title: '',
    filePath: '',
  };
  isSubmitted: boolean = false;
  errorMessage: string | null = null;


  constructor(
    private apiService: ApiService,
    private router: Router,
    public storeService: StoreService // Change to public
  ) {}

  onSubmit(form: any): void {
    this.errorMessage = null; // Reset error message on new submission
    this.isSubmitted = true;
    if (form.invalid) {
      return;
    }

    // Upload the document via the API
    this.apiService.uploadDocument(this.document).subscribe({
      next: (response: Document) => {
        // Update the global state with the new document
        const currentState = this.storeService.getState();
        this.storeService.setState({
          documents: [...currentState.documents, response],
        });

        // Navigate back to the dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error uploading document:', error);
        this.errorMessage = 'Failed to verify document. Please try again.'; // Provide user feedback
      },
    });
  }

  // Navigate back to the Dashboard
  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}