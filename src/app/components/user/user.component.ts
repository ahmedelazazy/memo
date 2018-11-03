import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: Array<User> = [];
  newUser: User = new User();
  oldUser: User = new User();


  constructor(private service: UserService) { }


  ngOnInit() {
    // this.getStudents();
    this.service.getAll();
    this.service.init();
    this.service.usersChange.subscribe(users => this.users = users, error => console.log(error));
  }

  getAll() {
    // this.service.getAll().
    //   subscribe(users => {
    //     this.users = users;
    //   }, error => {
    //     console.error(error);
    //     // alert(error.message);
    //   });
  }

  add() {
    this.service.add(this.newUser)
      .subscribe(
        () => {
          this.clearNewUser();
          // alert('Successfully added');
          console.log('Successfully added');
        },
        error => {
          console.error(error);
          // alert(error.message);
        });
  }

  clearNewUser() {
    this.newUser = new User();
  }

  delete(id) {
    this.service.delete(id)
      .subscribe(
        () => {
          // alert('Successfully deleted');
          console.log('Successfully added');
        },
        error => {
          console.error(error);
          // alert(error.message);
        }
      )
  }

  clearOldStudent() {
    this.oldUser = new User();
  }

  get(id) {
    this.oldUser = this.users.find(user => user.id == id);
  }

  update() {
    const updatedValue = new User().init(this.oldUser.name, this.oldUser.email, this.oldUser.password);
    this.service.update(this.oldUser.id, updatedValue)
      .subscribe(
        rowsUpdated => {
          if (rowsUpdated > 0) {
            this.clearOldStudent();
            // alert('Successfully updated');
            console.log('Successfully added');
          }
        },
        error => {
          console.error(error);
          // alert(error.message);
        }
      );
  }
  cancelAll() {
    this.users.forEach(u => u['editing'] = false);
  }
}
