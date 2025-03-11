// src/app/state/store.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DocumentState, Document } from './store.model';

@Injectable({
  providedIn: 'root', // Make the service available globally
})
export class StoreService {
  // Initial state
  private initialState: DocumentState = {
    documents: [],
    loading: false,
    error: null,
  };

  // BehaviorSubject to hold the state
  private stateSubject = new BehaviorSubject<DocumentState>(this.initialState);

  // Observable to expose the state
  state$ = this.stateSubject.asObservable();

  constructor() {}

  // Method to get the current state
  getState(): DocumentState {
    return this.stateSubject.value;
  }

  // Method to update the state
  setState(newState: Partial<DocumentState>): void {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({ ...currentState, ...newState });
  }

  // Method to add a document to the state
  addDocument(document: Document): void {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({
      ...currentState,
      documents: [...currentState.documents, document],
    });
  }

  // Method to update a document in the state
  updateDocument(updatedDocument: Document): void {
    const currentState = this.stateSubject.value;
    const updatedDocuments = currentState.documents.map((doc) =>
      doc.id === updatedDocument.id ? updatedDocument : doc
    );
    this.stateSubject.next({
      ...currentState,
      documents: updatedDocuments,
    });
  }

  // Method to delete a document from the state
  deleteDocument(documentId: number): void {
    const currentState = this.stateSubject.value;
    const updatedDocuments = currentState.documents.filter(
      (doc) => doc.id !== documentId
    );
    this.stateSubject.next({
      ...currentState,
      documents: updatedDocuments,
    });
  }

  // Method to reset the state to initial state
  resetState(): void {
    this.stateSubject.next(this.initialState);
  }
}