import { Injectable } from '@angular/core';
import { Step } from '../models/step';
import { Subject, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepService {

  tableName = 'Steps';
  users: Step[] = [];
  usersChange: Subject<Step[]> = new Subject();

  constructor() { }

  init() {

  }

  getAll() {
    // var result = from(this.connection.select<Step>({
    //   from: this.tableName
    // }))
    // return result;
  }

  getByTemplateId(templateId) {
    // var result = from(this.connection.select<Step>({
    //   from: this.tableName,
    //   where: {
    //     templateId: templateId,
    //   }
    // }))
    // return result;
  }

  get(id: number) {
    // var result = this.connection.select<Step>({
    //   from: this.tableName,
    //   where: {
    //     id: id
    //   }
    // });
    // this.init();
    // return from(result);
  }

  add(obj: Step[]) {
    // return this.connection.insert<Step>({
    //   into: this.tableName,
    //   return: true, // as id is autoincrement, so we would like to get the inserted value
    //   values: obj
    // })
    //   .then()
    //   .catch()

    // this.init();
    // return from(result);
  }

  delete(id: number) {
    // var result = this.connection.remove({
    //   from: this.tableName,
    //   where: {
    //     id: id
    //   }
    // });
    // this.init();
    // return from(result);
  }

  update(id: number, updateValue: Step) {
    // var result = this.connection.update({
    //   in: this.tableName,
    //   where: {
    //     id: id
    //   },
    //   set: updateValue
    // });
    // this.init();
    // return from(result);
  }
}
