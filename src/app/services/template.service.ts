import { Injectable } from '@angular/core';
import { Template } from '../models/template';
import { Subject, from } from 'rxjs';
import { StepService } from './step.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';
import { FormHelper } from '../components/template/form-helper';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { FieldVisibility } from '../models/enums';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {


  containerForm: FormGroup;


  tableName = 'Templates';
  templates: Template[] = [];
  usersChange: Subject<Template[]> = new Subject();
  apiUrl = environment['url'] + 'template/';
  users;
  templateForm$: BehaviorSubject<any>;
  // containerForm = new FormHelper().getContainer();

  constructor(private stepService: StepService, private http: HttpClient, private userService: UserService) {

    this.containerForm = new FormHelper().getContainer();
    this.templateForm$ = new BehaviorSubject(null);


    this.templateForm$.subscribe(data => {
      if (data && this.containerForm && this.containerForm.get('steps')) {
        const steps: FormArray = (this.containerForm.get('steps') as FormArray);
        let flatData = this.flattenData(data);
        for (let i = 0; i < steps.controls.length; i++) {
          const step = steps.controls[i];
          this.syncStep(step, flatData);
        }
      }
    });

    this.userService.getAll().subscribe(data => this.users = data);
  }

  getEmptyStep() {
    let step = new FormHelper().getEmptyStep();
    let data = this.templateForm$.value;
    let flatData = this.flattenData(data);
    return this.syncStep(step, flatData);
  }

  flattenData(data) {
    let flatData = [];
    if (data && data.sections) {
      for (let i = 0; i < data.sections.length; i++) {
        const section = data.sections[i];
        if (section) {
          for (let j = 0; j < section.fields.length; j++) {
            const field = section.fields[j];
            if (field) {
              flatData.push({ field_ui_id: field.field_ui_id, visibility: FieldVisibility.Editable });
            }
          }
        }
      }
    }
    return flatData;
  }

  syncStep(step, flatData) {
    let dataCopy = _.cloneDeep(flatData);

    if (step) {
      if (step.get('fieldsVisibility') && step.get('fieldsVisibility').value) {
        for (let i = 0; i < dataCopy.length; i++) {

          let newField = dataCopy[i];
          let existingField = step.get('fieldsVisibility').value.find(f => f.field_ui_id == newField.field_ui_id);
          if (existingField) {
            newField.visibility = existingField.visibility;
          }
        }
      }
      step.patchValue({ fieldsVisibility: dataCopy });
    }
    return step;
  }

  getAll() {
    let url = this.apiUrl + 'getWithDetails';
    return this.http.get<Template[]>(url);
  }

  get(id: number) {
    let url = this.apiUrl + 'getbyid';
    let data = { 'id': id };
    return this.http.post(url, data);
  }

  add(obj: Template) {
    for (let index = 0; index < obj.steps.length; index++) {
      obj.steps[index].order = index + 1;
    }

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
    );
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
    );

    return result;
  }

  getUserName(userId) {
    if (userId) {
      return this.users.find(u => u.id == userId).name;
    }
  }
}
