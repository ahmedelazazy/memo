import { Injectable } from '@angular/core';
import { Process } from '../models/process';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { pipe } from 'rxjs';
import { LogService } from './log.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';
import { serializePath } from '@angular/router/src/url_tree';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {
  serverUrl = environment['api'] + 'processes/';

  constructor(private http: HttpClient, private logService: LogService, private authService: AuthService) {}

  add(obj: Process) {
    return this.http.post(this.serverUrl, obj);
  }

  get() {
    return this.http.get<any>(this.serverUrl);
  }
}
