import { ChangeDetectorRef, Component,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskDetails } from '../task-details';
import { TeamMembers } from '../team-members';
import { ManagerService } from '../manager.service';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent{

  task: TaskDetails = {
    project_id: 1,
    user_id: 1,
    status: 'Pending',
    due_date: '',
    priority: '',
    name:''
  };

  team:TeamMembers[]=[];

  constructor(public dialogRef: MatDialogRef<AddTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: { projectId: number },private managerService:ManagerService, private cdr:ChangeDetectorRef) {
    // Assign the projectId from injected data to task.project_id
    this.task.project_id = data.projectId;

    this.managerService.getAllTeamMembers().subscribe(
      (data) => {
        this.team = (data as any).team;
        this.cdr.detectChanges;
      },
      (error) => {
        console.error('Error fetching project managers:', error);
      }
    )
  }


  submitForm(): void {

     // Extract just the date part from start and end dates
     const dueDate = new Date(this.task.due_date);

    this.task.due_date=dueDate.toISOString().split('T')[0]
    
    this.managerService.addTask(this.task)

    // Close the dialog after successful submission
    this.dialogRef.close();

    this.cdr.detectChanges();


  }
  
}
