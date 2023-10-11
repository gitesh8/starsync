import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedinStatusService {
  private userAuthenticated = new BehaviorSubject<boolean>(false);
  private userName = new BehaviorSubject<string>('');

  // Create Observables for userAuthenticated and userName
  userAuthenticated$ = this.userAuthenticated.asObservable();
  userName$ = this.userName.asObservable();

  setUserAuthenticated(isAuthenticated: boolean) {
    this.userAuthenticated.next(isAuthenticated);
  }

  setUserName(name: string) {
    this.userName.next(name);
  }

  getUserAuthenticated(): boolean {
    return this.userAuthenticated.getValue();
  }

  getUserName(): string {
    return this.userName.getValue();
  }

  getCurrentToken():any{
    return sessionStorage.getItem("user_token")
  }
}
