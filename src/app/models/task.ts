import { Step } from './step';

export class Task {
  id?: number;
  date: Date;
  action: 'string';
  step: Step;

  constructor() {
  }

}
