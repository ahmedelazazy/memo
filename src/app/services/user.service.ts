import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { from, Subject, of } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  tableName = 'Users';
  users: User[] = [];
  usersChange: Subject<User[]> = new Subject();
  apiUrl = environment['url'] + 'user/';
  serverUrl = environment['api'] + 'users/';

  constructor(private http: HttpClient) {}

  init() {
    this.getAll().subscribe(users => {
      this.users = users;
      this.usersChange.next(this.users);
    });
  }
  getAll() {
    return this.http.get<User[]>(this.serverUrl);
  }

  get(id: number) {
    return this.http.get<User>(this.serverUrl + id);
  }

  add(obj: User) {
    return this.http.post(this.serverUrl, obj);
  }

  update(obj: User) {
    return this.http.post(this.serverUrl + obj.id, obj);
  }
}
