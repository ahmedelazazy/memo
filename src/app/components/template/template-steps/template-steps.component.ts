import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Step } from "src/app/models/step";
import { TemplateService } from "src/app/services/template.service";
import * as _ from "lodash";
import { FormArray, FormGroup } from "@angular/forms";
import { FormHelper } from "../form-helper";
import { TabsetComponent } from "ngx-bootstrap";

@Component({
  selector: "app-template-steps",
  templateUrl: "./template-steps.component.html",
  styleUrls: ["./template-steps.component.css"]
})
export class TemplateStepsComponent implements OnInit {
  @Input("users") users;
  @Input("templateContainer") templateContainer: FormGroup;
  selectedStep: FormGroup;
  processSelected: boolean;
  steps: FormArray;
  constructor(public templateService: TemplateService) {}

  ngOnInit() {
    this.processSelected = true;
  }

  onProcessClick() {
    this.selectedStep = null;
    this.processSelected = true;
  }

  addStep() {
    let emptyStep = this.templateService.getEmptyStep();
    this.steps.push(emptyStep);
  }

  edit(step) {
    this.selectedStep = step;
    this.processSelected = false;
  }
  remove(index) {
    this.steps.removeAt(index);
    // this.resort();

    if (this.steps.controls.length > index + 1) {
      this.selectedStep = this.selectedStep[index + 1]; //select the one beneath it
    } else {
      this.selectedStep = this.selectedStep[index - 1]; //select the one beneath it
    }

    if (this.steps.controls.length == 1) {
      this.selectedStep = this.steps.controls[0] as FormGroup;
    }
  }

  onStepUpdated(step: Step) {
    step.user = this.users.find(user => user.id == step.userId);
    this.selectedStep = null;
  }

  ngOnChanges() {
    this.steps = this.templateContainer.get("steps") as FormArray;
  }
}
