import { Action } from './action';
import { Template } from './template';

export class Process {
  id?: number;
  title: string;
  description: string;
  template: Template;
  templateId: number;
  userId?: number;
  actions: Action[];
  date: Date;

  init() {
    if (!this.template) return;

    this.actions = [];

    for (let i = 0; i < this.template.steps.length; i++) {
      let action = new Action();
      action.stepId = this.template.steps[i].id;
      action.template_id = this.template.id;
      this.actions.push(action);
    }
  }
}
