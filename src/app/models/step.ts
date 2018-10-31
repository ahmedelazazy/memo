export class Step {
  id?: number;
  title: string;
  description: string;
  type: 'task' | 'approval' | null;
  templateId?: number;
  userId?: number;
  order?: number;

  constructor() {
    this.type = 'task';
  }

}
