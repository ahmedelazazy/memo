import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { ActionStatus, MemoMode } from "../models/enums";

@Injectable({
  providedIn: "root"
})
export class MemoService {
  apiUrl = environment["url"] + "memo/";
  serverUrl = environment["api"] + "memos/";

  constructor(private http: HttpClient, private authService: AuthService) {}

  add(obj) {
    this.formatProperties(obj);
    return this.http.post(this.serverUrl, obj);
  }

  formatProperties(memo) {
    for (let i = 0; i < memo.tasks.length; i++) {
      memo.tasks[i].order = i;
    }
  }

  get(status) {
    let url = "";
    let filter;
    if (status == MemoMode.Mine) {
      url = this.serverUrl + MemoMode.Mine;
      return this.http.get<any>(url);
    } else {
      url = this.serverUrl + "filter";
      filter = status;

      // if (status == 'active') {
      //   let filter = MemoMode.Active;
      // } else if (status == 'inactive') {
      //   let filter = MemoMode.Inactive;
      // }

      return this.http.post<any>(url, { filter });
    }
  }

  getById(id) {
    return this.http.get<any>(this.serverUrl + id);
  }

  update(id, task) {
    if (task.tasks && task.tasks.length > 0) {
      for (let i = 0; i < task.tasks.length; i++) {
        task.tasks[i].order = i;
      }
    }
    return this.http.post(this.serverUrl + id, task);
  }
}
