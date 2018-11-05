import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Step } from 'src/app/models/step';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { TemplateService } from 'src/app/services/template.service';

@Component({
  selector: 'app-step-create',
  templateUrl: './template-step-create.component.html',
  styleUrls: ['./template-step-create.component.css']
})
export class TemplateStepCreateComponent implements OnInit {

  @Input('step') step: Step;
  @Output('stepUpdated') stepUpdated = new EventEmitter<Step>();

  users;
  showError = false;
  isEdit = false;

  stepForm: FormGroup;

  constructor(private userService: UserService, private templateService: TemplateService) { }

  ngOnInit() {
    this.userService.getAll().subscribe(users => this.users = users);

    // this.stepForm = new FormGroup({
    //   'title': new FormControl(null),
    //   'type': new FormControl(null),
    //   'description': new FormControl(null),
    //   'user': new FormControl(null)
    // });






  }

  ngOnChanges() {

    this.stepForm = new FormGroup({
      'title': new FormControl(null),
      'type': new FormControl(null),
      'description': new FormControl(null),
      'user': new FormControl(null)
    });


    if (this.step) {
      this.stepForm.patchValue({
        title: this.step.title,
        type: this.step.type,
        description: this.step.description,
        user: this.step.user
      });

      this.stepForm.valueChanges.subscribe(data => {
        this.step.title = data.title;
        this.step.description = data.description;
        this.step.type = data.type;
        this.step.user = data.user;

        console.log("local1", this.step);
        console.log("service1", this.templateService.currentTemplate.template.steps);
      });


    }
  }

  addStep(f) {
    if (f.invalid) return;
    this.step.user_id = this.step.user.id;
    this.stepUpdated.emit(this.step);

  }
}
