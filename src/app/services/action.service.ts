import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Action } from '../models/action';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  apiUrl = environment['url'] + 'action/';

  constructor(private http: HttpClient, private authService: AuthService) { }

  get() {

    let url = this.apiUrl + 'index';
    let data = { 'user_id': this.authService.user.id };

    return this.http.post<Action[]>(url, data).pipe(
      tap(data => console.log("Action service > get", data))
    );
  }

  update(action: Action) {
    let url = this.apiUrl + 'edit';
    let data = {
      'id': action.id,
      'comment': action.comment,
      'status': action.status,
    };

    return this.http.post(url, data);
  }
}
