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
  serverUrl = environment['api'] + 'actions/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  get() {
    return this.http.get<Action[]>(this.serverUrl);
  }

  update(id, action) {
    return this.http.post(this.serverUrl + id, action);
  }

  getById(id: any): any {
    return this.http.get(this.serverUrl + id);
  }
}
