import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { User } from '../models/user';
import { from, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  tableName = 'Users';
  users: User[] = [];
  usersChange: Subject<User[]> = new Subject();

  constructor() {
    super();
  }

  init() {
    this.getAll()
      .subscribe(users => {
        this.users = users;
        this.usersChange.next(this.users.slice());
      });

  }
  getAll() {
    var result = from(this.connection.select<User>({
      from: this.tableName
    }))
    return result;
  }

  get(id: number) {
    var result = this.connection.select<User>({
      from: this.tableName,
      where: {
        id: id
      }
    });
    this.init();
    return from(result);
  }

  add(obj: User) {
    var result = this.connection.insert<User>({
      into: this.tableName,
      return: true, // as id is autoincrement, so we would like to get the inserted value
      values: [obj]
    });
    this.init();
    return from(result);
  }

  delete(id: number) {
    var result = this.connection.remove({
      from: this.tableName,
      where: {
        id: id
      }
    });
    this.init();
    return from(result);
  }

  update(id: number, updateValue: User) {
    var result = this.connection.update({
      in: this.tableName,
      where: {
        id: id
      },
      set: updateValue
    });
    this.init();
    return from(result);
  }
}
