import { Component, OnInit } from '@angular/core';
import { Template } from './../../../models/template';
import { Step } from 'src/app/models/step';
import { TouchSequence } from 'selenium-webdriver';
import { TemplateService } from 'src/app/services/template.service';

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
  constructor(private templateService: TemplateService) {
    if (!this.isEdit) {
      this.template = new Template();
      this.template.steps = [];
    }

  }

  ngOnInit() {
  }

  addStep() {
    let emptyStep = new Step();
    this.template.steps.push(emptyStep);
  }

  edit(step) {
    this.selectedStep = step;
  }
  remove(index) {
    this.template.steps.splice(index, 1)
  }

  onStepUpdated(step) {
    this.selectedStep = null;
  }

  up(index) {
    if (index == 0) return;
    this.arraymove(this.template.steps, index, --index);
    // if (!this.template.steps[--index]) return;
    // let temp = this.template.steps[--index];
    // this.template.steps[--index] = this.template.steps[index];
    // this.template.steps[index] = temp;
  }

  down(index) {
    if (index == this.template.steps.length - 1) return;
    this.arraymove(this.template.steps, index, ++index);


    // if (!this.template.steps[++index]) return;
    // let temp = this.template.steps[++index];
    // this.template.steps[++index] = this.template.steps[index];
    // this.template.steps[index] = temp;
  }



  arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }

  addTemplate(f) {
    if (f.invalid) return;
    if (this.template.steps.length == 0) {
      alert('You must add some steps');
      return;
    }

    this.templateService.add(this.template);

  }

}
