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
  apiUrl = environment['url'] + 'user/';

  constructor(private http: HttpClient, private router: Router) {
    let user = localStorage.getItem("user");
    let userObj = JSON.parse(user);
    if (user) {
      this.user = userObj;
      // this.router.navigate(['/']);
    } else {
      // this.router.navigate(['/login']);
    }
  }

  login(email, password) {
    let url = this.apiUrl + 'login';
    let data = { 'email': email, 'password': password };
    this.http.post<User>(url, data)
      .subscribe(data => {
        this.user = data
        if (data) {
          localStorage.setItem("user", JSON.stringify(this.user));
          this.router.navigate(['/']);
        } else {
          alert("invalid login");
        }
      });

  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(['/login']);

  }
}
