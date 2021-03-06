import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  serverUrl = environment['api'] + 'users/';

  constructor(private http: HttpClient, private router: Router) {
    let user = localStorage.getItem('user');
    let userObj = JSON.parse(user);
    if (user) {
      this.user = userObj;
    }
  }

  login(email, password) {
    let url = this.serverUrl + 'login';
    let user = { email: email, password: password };

    return this.http.post<User>(url, user).pipe(
      tap(data => {
        this.user = data;
        if (data) {
          localStorage.setItem('user', JSON.stringify(this.user));
          this.router.navigate(['/']);
        }
      })
    );
  }

  logout() {
    this.user = null;
    localStorage.removeItem('user');
    this.router.navigate(['/', 'login']);
  }
}
