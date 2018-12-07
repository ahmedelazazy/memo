import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email;
  password;
  showError = false;
  constructor(public authService: AuthService) {}

  ngOnInit() {}

  login() {
    this.showError = false;
    this.authService.login(this.email, this.password).subscribe(data => {
      if (!data) {
        this.showError = true;
      }
    });
  }
}
