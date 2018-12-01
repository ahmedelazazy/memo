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
    let url = this.apiUrl + 'getbyid';
    let data = { id: id };
    return this.http.post(url, data).pipe(
      map(data => {
        if (data && Array.isArray(data)) return data[0] as User[];
        else return data as User[];
      })
    );
  }

  add(obj: User) {
    let url = this.apiUrl + 'add';

    const body = new HttpParams()
      .set('email', obj.email)
      .set('password', obj.password)
      .set('name', obj.name);

    let result = this.http.post(url, body.toString(), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    });

    this.init();
    return result;
  }

  delete(id: number) {
    let url = this.apiUrl + 'remove';

    const body = new HttpParams().set('id', id + '');

    let result = this.http.post(url, body.toString(), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    });

    this.init();
    return result;
  }

  update(id: number, obj: User) {
    let url = this.apiUrl + 'edit';

    const body = new HttpParams()
      .set('id', id + '')
      .set('email', obj.email)
      .set('password', obj.password)
      .set('name', obj.name);

    let result = this.http.post(url, body.toString(), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    });

    this.init();
    return result;
  }
}
