import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

//  for showing side bar accordingly to Activated Component 

 currentRole = sessionStorage.getItem("user_role");

 ngOnInit(){
  this.currentRole= sessionStorage.getItem("user_role");
 }

 
}
