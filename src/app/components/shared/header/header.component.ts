import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  newNotificaitonsCount = null;
  user;

  constructor(public authService: AuthService, private notificationService: NotificationService) {}

  ngOnInit() {
    this.user = this.authService.user;

    this.notificationService.getNewNotificationCount().subscribe(count => (this.newNotificaitonsCount = +count));

    setInterval(this.getNotificationsCount.bind(this), 60000); //1 minute 60000
  }

  onLogout() {
    this.authService.logout();
  }

  getNotificationsCount() {
    this.notificationService.getNewNotificationCount().subscribe(count => (this.newNotificaitonsCount = +count));
  }
}
