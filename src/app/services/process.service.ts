import { Injectable } from '@angular/core';
import { Process } from '../models/process';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { pipe } from 'rxjs';
import { LogService } from './log.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {
  apiUrl = environment['url'] + 'process/';

  constructor(private http: HttpClient, private logService: LogService, private authService: AuthService) { }

  add(obj: Process) {

    let url = this.apiUrl + 'add';
    return this.http.post(url, obj);
  }

  get() {
    let url = this.apiUrl + 'index';
    let data = { 'user_id': this.authService.user.id };
    return this.http.post<any>(url, data)
  }
}
