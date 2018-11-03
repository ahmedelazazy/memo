export class Step {
  id?: number;
  title: string;
  description: string;
  type: number;
  template_id?: number;
  user_id?: number;
  order?: number;
  user?: any;

  constructor() {
    this.type = 1;
  }



}
