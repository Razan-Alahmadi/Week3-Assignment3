import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Document {
  id?: number;
  userId: number;
  title: string;
  filePath: string;
  verificationCode?: string;
  status?: string;
  createdAt?: Date;
}

interface VerificationRequest {
  verificationCode: string;
  verifiedBy: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5072/api/Documents';

  constructor(private http: HttpClient) { }

  // Fetch all documents
  getDocuments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAll`);
  }

  // Get a document by ID
  getDocument(id: number): Observable<Document> {
    return this.http.get<Document>(`${this.apiUrl}/${id}`);
  }

  // Uplode document
  uploadDocument(document: Document): Observable<Document> {
    return this.http.post<Document>(`${this.apiUrl}`, document);
  }

  // Verfy document
  verifyDocument(verificationCode: string, verifiedBy: string): Observable<string> {
    const request: VerificationRequest = { verificationCode, verifiedBy };
    return this.http.post(`${this.apiUrl}/verify`, request, { responseType: 'text' });
  }
}