import { Component, OnInit } from "@angular/core";
import { NotificationService } from "src/app/services/notification.service";

@Component({
  selector: "app-notification-list",
  templateUrl: "./notification-list.component.html",
  styleUrls: ["./notification-list.component.css"]
})
export class NotificationListComponent implements OnInit {
  notifications$;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notifications$ = this.notificationService.get();
  }

  onMarkRead(notification) {
    notification.isNew = false;
    this.notificationService.markRead(notification.id).subscribe();
  }
}
