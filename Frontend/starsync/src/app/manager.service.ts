import { Injectable } from '@angular/core';
import { LoggedinStatusService } from './loggedin-status.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http: HttpClient, private loggedinStatusService:LoggedinStatusService, private _snackBar: MatSnackBar) { }
  private token = this.loggedinStatusService.getCurrentToken()

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000, // Adjust the duration as needed
    })};

    getAllProjects(): Observable<any[]>{

      const apiUrl:string = 'http://127.0.0.1:5000/manager/projects';
  
       // Replace 'your_token_here' with the actual authorization bearer token
       const headers = new HttpHeaders().set('Authorization', 'Bearer '+this.token);
  
       return this.http.get<any[]>(`${apiUrl}`, { headers });
    }

}
