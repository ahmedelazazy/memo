import { Step } from './step';

export class Action {
  id?: number;
  date: Date;
  action: number;
  step?: Step;
  stepId?: number;
  template_id?: number;
  comment?: string;
  status: string;

  constructor() {}
}
