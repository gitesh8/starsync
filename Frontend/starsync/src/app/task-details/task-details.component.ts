import { Component, OnInit } from '@angular/core';
import { TaskTeam } from '../task-team';
import { TeamService } from '../team.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit  {

  task:TaskTeam[]=[]

  constructor(private teamService:TeamService,private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.teamService.getAllTaks().subscribe(
      (data) => {
        this.task = (data as any).tasks;
        console.log(this.task)
      },
      (error) => {
        console.error('Error fetching project managers:', error);
      }
    )
  }

  updateStatus(id:number,status:string){

    this.teamService.updateTaskStatus(id,status).subscribe(
      (data) => {
       const message:any = (data as any).message

       if(message=="Task Status Updated to Completed" || message=="Task Status Updated to Pending" ){
        const taskToUpdate = this.task.find(task => task.taskid === id);
        if (taskToUpdate) {
          taskToUpdate.status = status;
          this.cdr.detectChanges();
        }
       }
      },
      (error) => {
        console.error('Error fetching project managers:', error);
      }
    )

  }

}
