import { Component, OnInit } from '@angular/core';
import { Template } from './../../../models/template';
import { Step } from 'src/app/models/step';
import { TouchSequence } from 'selenium-webdriver';
import { TemplateService } from 'src/app/services/template.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-template-create',
  templateUrl: './template-create.component.html',
  styleUrls: ['./template-create.component.css']
})
export class TemplateCreateComponent implements OnInit {

  showError = false;
  template: Template;
  selectedStep: Step;
  isEdit = false;
  users: User[];

  constructor(private templateService: TemplateService, private toastrService: ToastrService, private router: Router, private userService: UserService) {
    if (!this.isEdit) {
      this.template = new Template();
      this.template.steps = [];
    }

  }

  ngOnInit() {
    this.userService.getAll().subscribe(data => this.users = data);
  }

  addStep() {
    let emptyStep = new Step();
    emptyStep.order = this.template.steps.length + 1;
    this.template.steps.push(emptyStep);
    this.resort();
  }

  edit(step) {
    this.selectedStep = step;
  }
  remove(index) {
    this.template.steps.splice(index, 1)
    this.resort();
  }

  onStepUpdated(step: Step) {
    step.user = this.users.find(user => user.id == step.user_id);
    this.selectedStep = null;
  }

  up(index) {
    if (index == 0) return;
    this.arraymove(this.template.steps, index, --index);
    this.resort();
  }

  down(index) {
    if (index == this.template.steps.length - 1) return;
    this.arraymove(this.template.steps, index, ++index);
    this.resort();
  }

  arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }

  resort() {
    for (let i = 0; i < this.template.steps.length; i++) {
      const step = this.template.steps[i];
      step.order = i + 1;
    }
  }

  addTemplate(f) {
    if (f.invalid) return;

    if (this.template.steps.length == 0) {
      this.toastrService.error('Template must have at least one step');
      return;
    }

    for (let i = 0; i < this.template.steps.length; i++) {
      const step = this.template.steps[i];
      if (!step || !step.title || !step.user_id || !step.type) {
        this.toastrService.error('Please fill all requied data');
        return;
      }
    }

    for (let i = 0; i < this.template.steps.length; i++) {
      this.template.steps[i].user = undefined;
    }

    this.templateService.add(this.template).subscribe(
      data => {
        this.toastrService.success('Data saved successfully');
        this.router.navigate(['/templates']);
      },
      error => {
        this.toastrService.error('Error wile saving');
        console.error(error);
      }
    );

  }

}
