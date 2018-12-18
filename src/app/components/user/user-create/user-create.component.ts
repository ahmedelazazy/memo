import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  showError = false;
  isEdit = false;
  user = new User();
  id;
  submitted = false;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.isEdit = true;
        this.userService.get(params.id).subscribe(data => (this.user = data));
      }
    });
  }

  addUser(f) {
    this.submitted = true;
    if (f.invalid) {
      this.toastrService.error('Some fields have invalid values');
      return;
    }

    if (!this.isEdit) {
      //new
      this.userService.add(this.user).subscribe(
        () => {
          this.toastrService.success('Data saved successfully');
          this.router.navigate(['/users']);
        },
        error => {
          this.toastrService.error('Error wile saving');
          console.error(error);
        }
      );
    } else {
      this.userService.update(this.user).subscribe(
        () => {
          this.toastrService.success('Data saved successfully');
          this.router.navigate(['/users']);
        },
        error => {
          this.toastrService.error('Error wile saving');
          console.error(error);
        }
      );
    }
  }
}
