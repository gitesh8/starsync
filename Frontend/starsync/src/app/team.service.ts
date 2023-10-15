import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/config.environment';
import { LoggedinStatusService } from './loggedin-status.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  apibaseUrl=environment.apiBaseUrl

  constructor(private http: HttpClient, private loggedinStatusService:LoggedinStatusService, private _snackBar: MatSnackBar) { }
  public token = this.loggedinStatusService.getCurrentToken()

  getAllTaks(): Observable<any[]>{

    const apiUrl:string = `${this.apibaseUrl}team/tasks`;

     // Replace 'your_token_here' with the actual authorization bearer token
     const headers = new HttpHeaders().set('Authorization', 'Bearer '+this.token);

     return this.http.get<any[]>(`${apiUrl}`, { headers });
  }

  updateTaskStatus(id:number,status:string): Observable<any[]>{

    const apiUrl:string = `${this.apibaseUrl}/team/tasks/${id}/update-status/${status}`;

     // Replace 'your_token_here' with the actual authorization bearer token
     const headers = new HttpHeaders().set('Authorization', 'Bearer '+this.token);

     return this.http.get<any[]>(`${apiUrl}`, { headers });
  }
}
