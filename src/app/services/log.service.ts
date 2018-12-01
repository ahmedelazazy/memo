import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LogService {
  enable = true;

  constructor() {}

  log(file, func, message) {
    if (this.enable) {
      console.log(`${file}  >  ${func} >  `, message);
    }
  }
}
