import { Injectable } from '@angular/core';
import { Process } from '../models/process';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessService extends BaseService {

  constructor() {
    super();
  }

  save(process: Process) {

    return this.connection.insert<Process>({
      into: 'Processes',
      return: true,
      values: [process]
    })


  }
}
