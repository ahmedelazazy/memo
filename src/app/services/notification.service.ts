import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { UserNotification } from '../models/user-notification';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  apiUrl = environment['url'] + 'notification/';

  constructor(private http: HttpClient, private authService: AuthService) { }

  get() {
    let url = this.apiUrl + 'index';
    let data = { 'user_id': this.authService.user.id };

    return this.http.post<UserNotification[]>(url, data).pipe(
      tap(data => console.log("NotificationService > get", data))
    );
  }


  markRead(id) {
    let url = this.apiUrl + 'edit';
    let data = { 'id': id };

    this.http.post(url, data).pipe(
      tap(data => console.log("NotificationService > markRead", data))
    ).subscribe();
  }

}
