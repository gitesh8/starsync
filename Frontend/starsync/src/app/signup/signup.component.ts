import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/config.environment';
import { NgForm } from '@angular/forms'; // Import NgForm
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  baseApiurl=environment.apiBaseUrl;

  name: string = '';
  email: string = '';
  password: string = '';
  role: string = '';

  constructor(private http: HttpClient, private _snackBar: MatSnackBar,private router: Router) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000, // Adjust the duration as needed
    })};

  onSignup(signupForm: NgForm) {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const url = `${this.baseApiurl}register`

    const singupDetails={
      email:signupForm.value.email,
      name:signupForm.value.name,
      password:signupForm.value.password,
      role:signupForm.value.role
    }

    this.http.post(url, singupDetails, {headers: { 'Content-Type': 'application/json' }}).subscribe(
      (response) => {

        if((response as any).message=="Registration Successfull"){

          //redirect to url
          this.router.navigate(["/login"])

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
