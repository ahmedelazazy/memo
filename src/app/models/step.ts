export class Step {
  id?: number;
  title: string;
  description: string;
  type: number;
  template_id?: number;
  userId?: number;
  order?: number;
  user?: any;
  stepVisibility: any;

  constructor() {
    this.type = 1;
  }
}
