import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {

  tabName:any= "Dashboard"

 constructor(private route:ActivatedRoute){ }
 ngOnInit() {
  this.route.data.subscribe(data => {
    this.tabName = data['TabName'];
  });
}
}
