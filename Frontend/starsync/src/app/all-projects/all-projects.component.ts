import { Component,OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { AllProjects } from '../all-projects';
@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit {

  constructor(private adminService:AdminService){}

  allProjects:AllProjects[]=[]

  ngOnInit(): void {
    this.adminService.getAllProjects().subscribe(
      (data) => {
        this.allProjects = (data as any).projects;
        console.log(this.allProjects)
        

      },
      (error) => {
        console.error('Error fetching project managers:', error);
      }
    )
  }
  


}
