import { Injectable } from '@angular/core';
import { LoggedinStatusService } from './loggedin-status.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/config.environment';
import { TaskDetails } from './task-details';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  apibaseUrl=environment.apiBaseUrl

  constructor(private http: HttpClient, private loggedinStatusService:LoggedinStatusService, private _snackBar: MatSnackBar) { }
  public token = this.loggedinStatusService.getCurrentToken()

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000, // Adjust the duration as needed
    })};

    getAllProjects(): Observable<any[]>{

      const apiUrl:string = `${this.apibaseUrl}manager/projects`;
  
       // Replace 'your_token_here' with the actual authorization bearer token
       const headers = new HttpHeaders().set('Authorization', 'Bearer '+this.token);
  
       return this.http.get<any[]>(`${apiUrl}`, { headers });
    }

    getAllTeamMembers(): Observable<any[]>{

      const apiUrl:string = `${this.apibaseUrl}manager/team-members`;
  
       // Replace 'your_token_here' with the actual authorization bearer token
       const headers = new HttpHeaders().set('Authorization', 'Bearer '+this.token);
  
       return this.http.get<any[]>(`${apiUrl}`, { headers });
    }

    viewProject(projectid: number): Observable<any> {

       // Replace 'your_token_here' with the actual authorization bearer token
       const headers = new HttpHeaders().set('Authorization', 'Bearer '+this.token);

      const url = `${this.apibaseUrl}manager/projects/tasks/${projectid}`; 
      return this.http.get<any>(url,{ headers });
    }

    addTask(task:TaskDetails){

       // Define the headers with the token
       const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}` // Assuming a Bearer token for authorization
      });

      const url = `${this.apibaseUrl}manager/project/add_tasks`
  
      // Make the POST request to your API
      this.http.post(url, task, { headers }).subscribe(
        (response) => {
          console.log('Task Assign Successfully:', response);
          this.openSnackBar("Task Assign Successfully","CLOSE")
        },
        (error) => {
          console.error('Error creating project:', error);
          // Handle errors here
        }
      );
    }

    updateProjectStatus(id:number,status:string): Observable<any[]>{

      const apiUrl:string = `${this.apibaseUrl}manager/project/${id}/update-status/${status}`;
  
       // Replace 'your_token_here' with the actual authorization bearer token
       const headers = new HttpHeaders().set('Authorization', 'Bearer '+this.token);
  
       return this.http.get<any[]>(`${apiUrl}`, { headers });
    }

}
