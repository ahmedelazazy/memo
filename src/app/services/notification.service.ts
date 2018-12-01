import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { environment } from "src/environments/environment";
import { UserNotification } from "../models/user-notification";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  apiUrl = environment["url"] + "notification/";
  serverUrl = environment["api"] + "notifications/";

  constructor(private http: HttpClient, private authService: AuthService) {}

  get() {
    return this.http.get<UserNotification[]>(this.serverUrl);
  }

  markRead(id) {
    return this.http.get(this.serverUrl + id);
  }

  getNewNotificationCount() {
    let url = this.serverUrl + "new";
    return this.http.get(url);
  }
}
