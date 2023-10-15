import { Component,OnInit } from '@angular/core';
import { ManagerService } from '../manager.service';
import { AllProjects } from '../all-projects';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-manager-projects',
  templateUrl: './manager-projects.component.html',
  styleUrls: ['./manager-projects.component.css']
})
export class ManagerProjectsComponent implements OnInit {

  constructor(private managerService:ManagerService, private cdr:ChangeDetectorRef){}

  allProjects:AllProjects[]=[]

  ngOnInit(): void {
    this.managerService.getAllProjects().subscribe(
      (data) => {
        this.allProjects=[]
        this.allProjects = (data as any);
        console.log(this.allProjects)
        this.cdr.detectChanges()
      },
      (error) => {
        console.error('Error fetching project managers:', error);
      }
    )
  }
}
