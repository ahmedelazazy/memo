import { Step } from './step';

export class Action {
  id?: number;
  date: Date;
  action: number;
  step?: Step;
  step_id?: number;
  template_id?: number;
  comment?: string;
  status: number;

  constructor() {
  }

}
