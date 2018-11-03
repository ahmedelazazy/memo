import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Step } from 'src/app/models/step';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-step-create',
  templateUrl: './step-create.component.html',
  styleUrls: ['./step-create.component.css']
})
export class StepCreateComponent implements OnInit {

  @Input('step') step: Step;
  @Output('stepUpdated') stepUpdated = new EventEmitter<Step>();

  users;
  showError = false;
  isEdit = false;


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAll().subscribe(users => this.users = users);
  }

  addStep(f) {
    if (f.invalid) return;
    this.step.user_id = this.step.user.id;
    this.stepUpdated.emit(this.step);

  }
}
