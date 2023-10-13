import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { TeamComponent } from './team/team.component';
import { ManagerComponent } from './manager/manager.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent},
  { path: '', component:HomepageComponent},
  { path:'login', component:LoginComponent},
  { path:'admin',component:AdminComponent, data:{ComponentName: "Admin"}},
  { path:'u',component:TeamComponent, data:{ComponentName: "Team"}},
  { path:'manager',component:ManagerComponent, data:{ComponentName: "Manager"}},

  // admin routes
  {path:'admin/project/new',component:AdminComponent,data:{TabName: "AddProject"}},
  {path:'admin/projects',component:AdminComponent,data:{TabName: "AllProject"}},
  {path:'admin/dashboard',component:AdminComponent,data:{TabName: "Dashboard"}},


  // manager routes
  {path:'manager/projects',component:ManagerComponent,data:{TabName: "AssignProjects"}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
