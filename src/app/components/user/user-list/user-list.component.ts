import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { trigger, transition, useAnimation } from '@angular/animations';
import { zoomIn } from 'ng-animate';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  animations: [trigger('animation', [transition('* => *', useAnimation(zoomIn))])]
})
export class UserListComponent implements OnInit {
  users: Array<User> = [];
  p = 1;
  animate;

  constructor(private service: UserService) {}

  ngOnInit() {
    this.service.getAll();
    this.service.init();
    this.service.usersChange.subscribe(users => (this.users = users), error => console.log(error));
  }

  onUserSelect() {}
}
