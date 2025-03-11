import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'; 
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';

interface VerificationRequest {
  verificationCode: string;
  verifiedBy: string;
}

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent {
  verificationRequest: VerificationRequest = {
    verificationCode: '',
    verifiedBy: ''
  };
  isSubmitted: boolean = false;
  errorMessage: string | null = null;

  constructor(private apiService: ApiService, private router: Router) {} 

  onSubmit(form: NgForm): void {
    this.isSubmitted = true;
    this.errorMessage = null; // Reset error message on new submission

    if (form.invalid) {
      return;
    }

    this.apiService.verifyDocument(
      this.verificationRequest.verificationCode,
      this.verificationRequest.verifiedBy
    ).subscribe(
      (response) => {
        this.router.navigate(['/dashboard']); 
      },
      (error) => {
        console.error('Error verifying document:', error);
        this.errorMessage = 'Failed to verify document. Please try again.'; // Provide user feedback
      }
    );
  }


    // Navigate back to the Dashboard
    goBack(): void {
      this.router.navigate(['/dashboard']);
    }
}