import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggedinStatusService } from './loggedin-status.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  

  constructor(private http: HttpClient, private loggedinStatusService:LoggedinStatusService, private _snackBar: MatSnackBar) { }
  private token = this.loggedinStatusService.getCurrentToken()

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000, // Adjust the duration as needed
    })};

  getProjectManager(): Observable<any[]> {

    const apiUrl:string = 'http://127.0.0.1:5000/admin/get-all-project-managers';

    // Replace 'your_token_here' with the actual authorization bearer token
    const headers = new HttpHeaders().set('Authorization', 'Bearer '+this.token);

    return this.http.get<any[]>(`${apiUrl}`, { headers });
  }

  createNewProject(newProject:NgForm){

    //creating json object to avoid circular dependency problem

    const apiUrl:string="http://127.0.0.1:5000/admin/project/new"

    // Extract just the date part from start and end dates
    const startDate = new Date(newProject.value.startdate);
    const endDate = new Date(newProject.value.startdate);

    // Format the date to 'yyyy-MM-dd' format
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];

    const newProjectData ={

        name:newProject.value.projectname,
        description:newProject.value.description,
        start_date:formattedStartDate,
        end_date :formattedEndDate,
        project_manager_id :newProject.value.projectmanager
    }

        // Define the headers with the token
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}` // Assuming a Bearer token for authorization
        });
    
        // Make the POST request to your API
        this.http.post(apiUrl, newProjectData, { headers }).subscribe(
          (response) => {
            console.log('Project created successfully:', response);
            this.openSnackBar("Project Created Successfully","CLOSE")
          },
          (error) => {
            console.error('Error creating project:', error);
            // Handle errors here
          }
        );
  }

  getAllProjects(): Observable<any[]>{

    const apiUrl:string = 'http://127.0.0.1:5000/admin/projects';

     // Replace 'your_token_here' with the actual authorization bearer token
     const headers = new HttpHeaders().set('Authorization', 'Bearer '+this.token);

     return this.http.get<any[]>(`${apiUrl}`, { headers });
  }

  adminDashboard(){
    const apiUrl:string='http://127.0.0.1:5000/admin/dashboard'

     // Replace 'your_token_here' with the actual authorization bearer token
     const headers = new HttpHeaders().set('Authorization', 'Bearer '+this.token);

     return this.http.get<any[]>(`${apiUrl}`, { headers });
  }
}
