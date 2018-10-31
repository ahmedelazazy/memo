import { Task } from './task';
import { Template } from './template';

export class Process {
  id?: number;
  title: string;
  description: string;
  template: Template;
  tasks: Task[];

  init() {
    if (!this.template) return;

    this.tasks = [];

    for (let i = 0; i < this.template.steps.length; i++) {
      let t = new Task();
      t.step = { ...this.template.steps[i] };
      this.tasks.push(t);
    }
  }
}
