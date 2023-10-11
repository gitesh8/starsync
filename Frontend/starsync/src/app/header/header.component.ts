import { Component, ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';
import { LoggedinStatusService } from "../loggedin-status.service"


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userAuthenticated: boolean = false;
  userName: string = '';

  constructor(private cdr: ChangeDetectorRef, private router: Router, private LoggedinStatusService: LoggedinStatusService) {}

  ngOnInit() {
    this.LoggedinStatusService.userAuthenticated$.subscribe((userAuthenticated) => {
      this.userAuthenticated = userAuthenticated;
      this.cdr.detectChanges();
    });

    this.LoggedinStatusService.userName$.subscribe((userName) => {
      this.userName = userName;
      this.cdr.detectChanges();
    });
  }

  logoutUser() {
    this.LoggedinStatusService.setUserAuthenticated(false);
    this.LoggedinStatusService.setUserName('');
    this.router.navigate(['/login']);
  }
}
