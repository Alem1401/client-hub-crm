import { Injectable } from '@angular/core';
import { responseAgentDto } from '../dtos/agent/response-agent.dto';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {

  private currentUser = new BehaviorSubject<responseAgentDto | null>(null);
  currentUser$ = this.currentUser.asObservable();
  private readonly STORAGE_KEY = 'currentUser';

  constructor() {
   
    this.loadUserFromStorage();
  }

  setCurrentUser(user: responseAgentDto){
    this.currentUser.next(user);
  
    this.saveUserToStorage(user);
  }
  
  getCurrentUser(): responseAgentDto | null {
    return this.currentUser.value;
  }

  clearCurrentUser(): void {
    this.currentUser.next(null);
    this.removeUserFromStorage();
  }

  private saveUserToStorage(user: responseAgentDto): void {
    try {
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user to session storage:', error);
    }
  }

  private loadUserFromStorage(): void {
    try {
      const userJson = sessionStorage.getItem(this.STORAGE_KEY);
      if (userJson) {
        const user = JSON.parse(userJson) as responseAgentDto;
        this.currentUser.next(user);
      }
    } catch (error) {
      console.error('Error loading user from session storage:', error);
      this.removeUserFromStorage();
    }
  }

  private removeUserFromStorage(): void {
    try {
      sessionStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Error removing user from session storage:', error);
    }
  }
}
