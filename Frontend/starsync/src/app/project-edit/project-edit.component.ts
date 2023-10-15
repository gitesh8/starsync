import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManagerService } from '../manager.service';
import { ProjectEdit } from 'src/app/project-edit'; // Assuming ProjectData is the correct type
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  projectId: number = 1;

  projectData: ProjectEdit = {
    project: {
      description: '',
      end_date: '',
      id: 0,
      name: '',
      project_status: '',
      start_date: '',
    },
    tasks: [
      {
        due_date: '',
        member_name: '',
        priority: '',
        status: '',
        task_id: 0,
        user_email: '',
        name:''
      },
    ]
  };

  constructor(private activatedRoute: ActivatedRoute, private managerService: ManagerService, private dialog:MatDialog, private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {
    const id = this.activatedRoute?.snapshot.paramMap?.get('id');
    this.projectId = id ? +id : 1;
  
    if (this.projectId) {
      this.getProjectData(this.projectId);
     
    } else {
      
    }
  }
  
  getProjectData(id: number) {
    this.managerService.viewProject(id).subscribe(
      (data:ProjectEdit) => {
        this.projectData = data;
        console.log(this.projectData)
      },
      (error:any) => {
        console.error('Error fetching project data:', error);
      }
    );
  }
  openTaskFormModal(projectid:number): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '400px', // Adjust the width as needed
      data: { projectId: projectid }
    });
  
    // After the modal is closed, you can handle any actions here
    dialogRef.afterClosed().subscribe(result => {
      this.getProjectData(projectid)
    });

    
  }
  updateProjectStatus(id:number,status:string):void{

    this.managerService.updateProjectStatus(id,status).subscribe(
      (data) => {
       const message:any = (data as any).message

       if(message=="Project Status Updated to Completed" || message=="Project Status Updated to Pending" ){
        this.projectData.project.project_status=status;
        this.cdr.detectChanges()
       }
      },
      (error) => {
        console.error('Error fetching project managers:', error);
      }
    )
  }
}
