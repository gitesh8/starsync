import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'; // Import NgForm


@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent {

  project = { projectname: '', desciption: '' };

  newProject(newProjectForm: NgForm) {
    alert(123);
  }

}
