// src/app/state/store.model.ts

export interface Document {
    id?: number;
    userId: number; // Add this property
    title: string;
    filePath: string;
    verificationCode?: string;
    status?: string;
    createdAt?: Date;
  }
  
  export interface DocumentState {
    documents: Document[]; // List of documents
    loading: boolean; // Loading state for API calls
    error: string | null; // Error message for API calls
  }