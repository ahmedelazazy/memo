import { Injectable } from '@angular/core';
import { Template } from '../models/template';
import { Subject, from } from 'rxjs';
import { StepService } from './step.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  tableName = 'Templates';
  templates: Template[] = [];
  usersChange: Subject<Template[]> = new Subject();
  apiUrl = environment['url'] + 'template/';

  currentTemplate: { template: Template, form: BehaviorSubject<any> };

  constructor(private stepService: StepService, private http: HttpClient) {
    this.currentTemplate = { template: null, form: new BehaviorSubject(null) };

    this.currentTemplate.form.subscribe(data => {

      if (this.currentTemplate && this.currentTemplate.template && this.currentTemplate.template.steps) {
        const steps = this.currentTemplate.template.steps;

        for (let i = 0; i < steps.length; i++) {
          let dataCopy = _.cloneDeep(data);
          const step = steps[i];

          if (step) {
            if (!step.stepVisibility || step.stepVisibility.length == 0) {
              step.stepVisibility = dataCopy;
            }

            for (let i = 0; i < dataCopy.sections.length; i++) {
              let newSection = dataCopy.sections[i];
              let existingSection = step.stepVisibility.sections.find(s => s.sectionId == newSection.sectionId);

              if (existingSection) {
                for (let j = 0; j < newSection.fields.length; j++) {
                  const newField = newSection.fields[j];
                  let existingField = existingSection.fields.find(f => f.fieldId == newField.fieldId);
                  if (existingField) {
                    newField.visibility = existingField.visibility;
                  }
                }
              }
            }
            step.stepVisibility = dataCopy;
          }
        }
      }

    });

  }

  init() {
    this.getAll()
      .subscribe(data => {
        // console.log(users);
        // this.templates = data;
        this.usersChange.next(this.templates.slice());
      }
      );
  }

  getAll() {

    let url = this.apiUrl + 'getWithDetails';

    return this.http.get<Template[]>(url).pipe(
      tap(
        data => console.log("template Service > getAll", data)
      )
    );
  }

  get(id: number) {

    let url = this.apiUrl + 'getbyid';
    let data = { 'id': id };
    return this.http.post(url, data).pipe(
      tap(data => console.log("template service > get by id", data))
    );
  }

  add(obj: Template) {

    // for (let index = 0; index < obj.steps.length; index++) {
    //   const element = obj.steps[index];
    //   element.order = index + 1;
    // }

    let url = this.apiUrl + 'add';
    return this.http.post(url, obj);
  }

  delete(id: number) {

    let url = this.apiUrl + 'remove';

    const body = new HttpParams()
      .set('id', id + "")

    let result = this.http.post(url,
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    ).pipe(tap(data => console.log(data)));

    this.init();
    return result;
  }

  update(id: number, obj: Template) {

    let url = this.apiUrl + 'edit';

    const body = new HttpParams()
      .set('id', id + "")
      .set('title', obj.title)
      .set('description', obj.description)

    let result = this.http.post(url,
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    ).pipe(tap(data => console.log(data)));

    this.init();
    return result;
  }
}
