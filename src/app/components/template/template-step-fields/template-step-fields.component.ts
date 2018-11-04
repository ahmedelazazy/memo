import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TemplateService } from 'src/app/services/template.service';
import { Helper } from 'src/app/models/helper';

@Component({
  selector: 'app-template-step-fields',
  templateUrl: './template-step-fields.component.html',
  styleUrls: ['./template-step-fields.component.css']
})
export class TemplateStepFieldsComponent implements OnInit, OnChanges {

  @Input('step') step;

  constructor(public templateService: TemplateService) { }

  ngOnInit() {
    // this.templateService.currentTemplate.form.subscribe(data => {
    //   if (this.step) {
    //     if (!this.step.stepVisibility || this.step.stepVisibility.length == 0) {
    //       this.step.stepVisibility = data;
    //     }

    //     for (let i = 0; i < data.sections.length; i++) {
    //       let newSection = data.sections[i];
    //       let existingSection = this.step.stepVisibility.sections.find(s => s.sectionId == newSection.sectionId);

    //       if (existingSection) {
    //         for (let j = 0; j < newSection.fields.length; j++) {
    //           const newField = newSection.fields[j];
    //           let existingField = existingSection.fields.find(f => f.fieldId == newField.fieldId);
    //           if (existingField) {
    //             newField.visibility = existingField.visibility;
    //           }
    //         }
    //       }
    //     }
    //     this.step.stepVisibility = data;
    //   }
    // });
  }

  ngOnChanges() {
    if (this.templateService.currentTemplate.template.steps[0] &&
      this.templateService.currentTemplate.template.steps[0].stepVisibility &&
      this.templateService.currentTemplate.template.steps[0].stepVisibility.sections[0].fields[0].visible)
      console.log("service1", this.templateService.currentTemplate.template.steps[0].stepVisibility.sections[0].fields[0].visible);

    if (this.step && this.step.stepVisibility && this.step.stepVisibility.sections[0].fields[0].visible)
      console.log("local1", this.step.stepVisibility.sections[0].fields[0].visible);

    console.log("service2", this.templateService.currentTemplate.template.steps);
    console.log("local2", this.step);

    // this.step.stepVisibility = this.templateService.currentTemplate.form.getValue();
  }
}
