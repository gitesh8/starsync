import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; // Import NgForm
import { AdminService } from '../admin.service'; 
import { ProjectManager } from '../project-manager';


@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  constructor(private adminService:AdminService ){}
  

  project = { projectname: '', desciption: '' };

  projectManagers:ProjectManager[] = [
   
  ];


  ngOnInit() {
    this.adminService.getProjectManager().subscribe(
      (data) => {
        this.projectManagers = (data as any).projectManagers;
        console.log(this.projectManagers)
      },
      (error) => {
        console.error('Error fetching project managers:', error);
      }
    );

   
  }

  newProject(newProjectForm: NgForm) {
   this.adminService.createNewProject(newProjectForm)
  }

}
