import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

// Define the Document interface outside the component class
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
  selector: 'app-view-details',
  standalone: true,
  imports: [CommonModule], // Import CommonModule for ngIf, ngClass, etc.
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {
  document: Document | undefined; // Document to display

  constructor(
    private route: ActivatedRoute, // To access route parameters
    private apiService: ApiService, // To fetch document details
    private router: Router // For navigation
  ) {}

  ngOnInit(): void {
    // Get the document ID from the route
    const documentId = this.route.snapshot.paramMap.get('id');

    if (documentId) {
      // Fetch the document details
      this.apiService.getDocument(+documentId).subscribe(
        (data: Document) => {
          this.document = data;
        },
        (error) => {
          console.error('Error fetching document details:', error);
          this.router.navigate(['/dashboard']); // Redirect to Dashboard on error
        }
      );
    } else {
      console.error('Document ID is missing.');
      this.router.navigate(['/dashboard']); // Redirect to Dashboard if no ID is provided
    }
  }

  // Navigate back to the Dashboard
  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}