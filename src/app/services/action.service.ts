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

    return this.http.post<Action[]>(url, data);
  }

  update(action) {
    delete action.sections; //remove the sections property as it is not used on the server

    let url = this.apiUrl + 'edit';
    return this.http.post(url, action);
  }

  getById(id: any): any {
    let url = this.apiUrl + 'getById';
    let data = { 'user_id': this.authService.user.id, id: id };

    return this.http.post<Action[]>(url, data);
  }
}
