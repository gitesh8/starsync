import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoggedinStatusService {
  private userAuthenticated = new BehaviorSubject<boolean>(false);
  private userName = new BehaviorSubject<string>('');
  private role = new BehaviorSubject<string>('');

  // Create Observables for userAuthenticated, userName, and role
  userAuthenticated$ = this.userAuthenticated.asObservable();
  userName$ = this.userName.asObservable();
  role$ = this.role.asObservable();

  constructor() {
    // Check session storage for initial user data on service initialization
    const isAuthenticated = sessionStorage.getItem('user_authenticated') === 'true';
    const userName = sessionStorage.getItem('user_name') || '';
    const role = sessionStorage.getItem('user_role') || '';

    this.userAuthenticated.next(isAuthenticated);
    this.userName.next(userName);
    this.role.next(role);
  }

  setUserAuthenticated(isAuthenticated: boolean) {
    this.userAuthenticated.next(isAuthenticated);
  }

  setUserName(name: string) {
    this.userName.next(name);
  }

  setRole(role: string) {
    this.role.next(role);
  }

  getUserAuthenticated(): Observable<boolean> {
    return this.userAuthenticated.asObservable();
  }

  getUserName(): string {
    return this.userName.value;
  }

  getRole(): string {
    return this.role.value;
  }

  getCurrentToken(): any {
    return sessionStorage.getItem('user_token');
  }

  getUserRoleFromSessionStorage(): string {
    return sessionStorage.getItem('user_role') || '';
  }
}
