import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Template } from '../models/template';
import { Subject, from } from 'rxjs';
import { StepService } from './step.service';

@Injectable({
  providedIn: 'root'
})
export class TemplateService extends BaseService {

  tableName = 'Templates';
  users: Template[] = [];
  usersChange: Subject<Template[]> = new Subject();

  constructor(private stepService: StepService) {
    super();
  }

  init() {

  }

  getAll() {
    var result = from(this.connection.select<Template>({
      from: this.tableName
    }))
    return result;
  }

  get(id: number) {
    var result = this.connection.select<Template>({
      from: this.tableName,
      where: {
        id: id
      }
    });
    this.init();
    return from(result);
  }

  add(obj: Template) {

    for(let i = 0; i<obj.steps.length; i++){
      obj.steps[i].order = i;
    }

    // var result =
    this.connection.insert<Template>({
      into: this.tableName,
      return: true, // as id is autoincrement, so we would like to get the inserted value
      values: [obj]
    }).then(
      templateId => {
        console.log("template saved successfully");
        // this.stepService.add(obj.steps)
        //   .then(() => console.log("steps saved successfully"))
        //   .catch(error => console.error(error))
      })
      .catch(error => console.error(error));

    // this.init();
    // return from(result);
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

  update(id: number, updateValue: Template) {
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
