import { Component,OnInit } from '@angular/core';
import { AdminService } from '../admin.service'; 
import { AdminDashboard } from '../admin-dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  dashboard:AdminDashboard={
    project_managers: 0,
    projects: 0,
    team_members: 0,
    new_projects:0
  };

  constructor(private adminService:AdminService){}

  ngOnInit(): void {
    this.adminService.adminDashboard().subscribe(
      (data) => {
       this.dashboard.project_managers=(data as any).project_managers
       this.dashboard.projects=(data as any).projects
       this.dashboard.team_members=(data as any).team_members
       this.dashboard.new_projects=(data as any).new_projects
       
      },
      (error) => {
        console.error('Error fetching project managers:', error);
      }
    );
  }

}
