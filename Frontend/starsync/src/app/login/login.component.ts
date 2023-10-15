import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms'; // Import NgForm
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoggedinStatusService } from "../loggedin-status.service"
import { environment } from 'src/config.environment';
import { ChangeDetectorRef } from '@angular/core';
import { ManagerService } from '../manager.service';
import { AdminService } from '../admin.service';
import { TeamService } from '../team.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  baseApiUrl=environment.apiBaseUrl;

  email:string=''
  password:string=''

  constructor(private http: HttpClient, private _snackBar: MatSnackBar,private router: Router, private LoggedinStatusService:LoggedinStatusService, private cdr:ChangeDetectorRef, private managerService:ManagerService, private adminService:AdminService,private TeamService:TeamService) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000, // Adjust the duration as needed
    })};

  onLogin(loginForm: NgForm) {

    const url:string = `${this.baseApiUrl}login`

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // to fix circular dependency problem
    const loginFormDetails = {
      email: loginForm.value.email,
      password: loginForm.value.password
    };
   
    this.http.post(url, loginFormDetails, {headers: { 'Content-Type': 'application/json' }}).subscribe(
      (response) => {

        if((response as any).message=="Login Successfull"){

          sessionStorage.clear()

          sessionStorage.setItem('user_token', (response as any).token);
          sessionStorage.setItem('user_role', (response as any).role);
          sessionStorage.setItem('user_name', (response as any).name);
          sessionStorage.setItem("user_authenticated", "true");

          this.LoggedinStatusService.setUserName((response as any).name);
          this.LoggedinStatusService.setUserAuthenticated(true);
        
          this.managerService.token=(response as any).token;
          this.adminService.token=(response as any).token;
          this.TeamService.token=(response as any).token;

          this.cdr.detectChanges()

          console.log(response as any)

          //redirect to dashboard
          const role = (response as any).role

          if(role=="Admin"){
            this.router.navigate(["/admin/dashboard"])
          }
          else if(role=="Team Member"){
            this.router.navigate(["/team/dashboard"])
          }
          
          else if(role=="Project Manager"){
            
            this.router.navigate(["/manager/projects"])
          }
         else{
          this.router.navigate(["/"])
         }

        }
        this.openSnackBar((response as any).message,"CLOSE")
      },
      (error) => {
        console.error('Error:', error);
        // Handle the error here
        this.openSnackBar("Something Went Wrong, Please Try Again Later","CLOSE")
      }
    );
  }
}
