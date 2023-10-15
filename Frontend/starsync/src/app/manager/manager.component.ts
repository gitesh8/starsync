import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  tabName:any= "Dashboard"

 constructor(private route:ActivatedRoute){}
 ngOnInit() {
  this.route.data.subscribe(data => {
    this.tabName = data['TabName'];
  });

 }

}
