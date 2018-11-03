import { Injectable } from '@angular/core';
import { Template } from '../models/template';
import { Subject, from } from 'rxjs';
import { StepService } from './step.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  tableName = 'Templates';
  templates: Template[] = [];
  usersChange: Subject<Template[]> = new Subject();
  apiUrl = environment['url'] + 'template/';

  constructor(private stepService: StepService, private http: HttpClient) {
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
