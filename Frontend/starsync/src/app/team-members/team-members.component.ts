import { Component,OnInit } from '@angular/core';
import { TeamMembers } from '../team-members';
import { ManagerService } from '../manager.service';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.css']
})
export class TeamMembersComponent implements OnInit {

  team:TeamMembers[]=[]

  constructor(private managerService:ManagerService){}

  ngOnInit(): void {
    this.managerService.getAllTeamMembers().subscribe(
      (data) => {
        this.team = (data as any).team;
        console.log(this.team)
      },
      (error) => {
        console.error('Error fetching project managers:', error);
      }
    )
  }
}
