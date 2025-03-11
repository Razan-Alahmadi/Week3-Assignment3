// ClientApp\src\app\dashboard\dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from '../state/store.service'; // Import the StoreService

interface Document {
  id?: number;
  userId: number;
  title: string;
  filePath: string;
  verificationCode?: string;
  status?: string;
  createdAt?: Date;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, FormsModule],
})
export class DashboardComponent implements OnInit {
  documents: Document[] = []; // Local documents array
  loading = false; // Loading state
  error: string | null = null; // Error state

  constructor(
    private apiService: ApiService,
    private router: Router,
    private storeService: StoreService // Inject the StoreService
  ) {}

  ngOnInit(): void {
    // Subscribe to the global state
    this.storeService.state$.subscribe((state) => {
      this.documents = state.documents; // Update local documents
      this.loading = state.loading; // Update loading state
      this.error = state.error; // Update error state
    });

    // Load documents from the API and update the global state
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.storeService.setState({ loading: true, error: null }); // Set loading state

    this.apiService.getDocuments().subscribe({
      next: (data: Document[]) => {
        this.storeService.setState({ documents: data, loading: false }); // Update global state
      },
      error: (error) => {
        this.storeService.setState({ loading: false, error: 'Failed to load documents' }); // Update error state
        console.error('Error fetching documents:', error);
      },
    });
  }

  viewDocument(id: number | undefined): void {
    if (id === undefined) {
      console.error('Document ID is undefined.');
      return;
    }
    this.router.navigate(['/details', id]);
  }

  navigateToUpload(): void {
    this.router.navigate(['/upload']);
  }

  navigateToVerify(): void {
    this.router.navigate(['/verify']);
  }
}