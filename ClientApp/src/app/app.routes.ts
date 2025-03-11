import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { VerificationComponent } from './verification/verification.component';
import { ViewDetailsComponent } from './view-details/view-details.component'; 
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Default route
  { path: 'dashboard', component: DashboardComponent },
  { path: 'upload', component: DocumentUploadComponent },
  { path: 'verify', component: VerificationComponent },
  { path: 'details/:id', component: ViewDetailsComponent }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }