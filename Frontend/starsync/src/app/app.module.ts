import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './signup/signup.component';

import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule for input fields
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule for buttons
import { MatFormFieldModule } from '@angular/material/form-field';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HomepageComponent } from './homepage/homepage.component'; // Import MatFormFieldModule for form fields
import { MatSelectModule } from '@angular/material/select';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { TeamComponent } from './team/team.component';
import { ManagerComponent } from './manager/manager.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { NewProjectComponent } from './new-project/new-project.component'; 
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import {MatCardModule} from '@angular/material/card';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagerProjectsComponent } from './manager-projects/manager-projects.component';
import { TeamMembersComponent } from './team-members/team-members.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HeaderComponent,
    HomepageComponent,
    LoginComponent,
    AdminComponent,
    TeamComponent,
    ManagerComponent,
    SidebarComponent,
    NewProjectComponent,
    AllProjectsComponent,
    DashboardComponent,
    ManagerProjectsComponent,
    TeamMembersComponent
  ],
  imports: [
    BrowserModule,
    MatSidenavModule,
    MatIconModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
