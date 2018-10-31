import { Step } from './step';

export class Template {
  id?: number;
  title: string;
  description: string;
  steps: Step[];
}
