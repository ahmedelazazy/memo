import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Step } from 'src/app/models/step';
import { TemplateService } from 'src/app/services/template.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-template-steps',
  templateUrl: './template-steps.component.html',
  styleUrls: ['./template-steps.component.css']
})
export class TemplateStepsComponent implements OnInit {

  @Input('users') users;
  selectedStep: Step;
  steps;

  constructor(public templateService: TemplateService) { }

  ngOnInit() {
    this.steps = this.templateService.currentTemplate.template.steps;
    if (this.steps.length == 1) {
      this.selectedStep = this.steps[0];
    }
  }

  addStep() {
    let emptyStep = new Step();
    emptyStep.stepVisibility = _.cloneDeep(this.templateService.currentTemplate.form.getValue())
    emptyStep.order = this.steps.length + 1;
    this.steps.push(emptyStep);
    this.resort();
  }

  edit(step) {
    this.selectedStep = step;
  }
  remove(index) {
    this.steps.splice(index, 1)
    // this.resort();

    if (this.steps.length > index + 1){
      this.selectedStep = this.selectedStep[index + 1]; //select the one beneath it
    }else{
      this.selectedStep = this.selectedStep[index -1 ]; //select the one beneath it
    }

    if (this.steps.length == 1) {
      this.selectedStep = this.steps[0];
    }
  }

  onStepUpdated(step: Step) {
    step.user = this.users.find(user => user.id == step.user_id);
    this.selectedStep = null;
  }

  // up(index) {
  //   if (index == 0) return;
  //   this.arraymove(this.steps, index, --index);
  //   this.resort();
  // }

  // down(index) {
  //   if (index == this.steps.length - 1) return;
  //   this.arraymove(this.steps, index, ++index);
  //   this.resort();
  // }

  // arraymove(arr, fromIndex, toIndex) {
  //   var element = arr[fromIndex];
  //   arr.splice(fromIndex, 1);
  //   arr.splice(toIndex, 0, element);
  // }

  // resort() {
  //   for (let i = 0; i < this.steps.length; i++) {
  //     const step = this.steps[i];
  //     step.order = i + 1;
  //   }
  // }

}
