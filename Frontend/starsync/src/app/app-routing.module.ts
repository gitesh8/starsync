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
  { path:'admin',component:AdminComponent},
  { path:'u',component:TeamComponent},
  { path:'manager',component:ManagerComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
