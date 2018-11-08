import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TemplateService } from 'src/app/services/template.service';
import { Helper } from 'src/app/models/helper';
import { FormGroup, FormArray } from '@angular/forms';
import * as _ from 'lodash';
import { FieldVisibility } from 'src/app/models/enums';

@Component({
  selector: 'app-template-step-fields',
  templateUrl: './template-step-fields.component.html',
  styleUrls: ['./template-step-fields.component.css']
})
export class TemplateStepFieldsComponent implements OnInit {

  @Input('step') stepForm: FormGroup;
  templateForm: any;

  constructor(public templateService: TemplateService) { }

  ngOnInit() {


  }

  ngOnChanges() {

    if (!this.stepForm) return;

    let fieldsVisibilityValues = this.stepForm.get('fieldsVisibility').value;

    this.templateService.templateForm$.subscribe(
      data => {
        if (data) {
          let dataCopy = _.cloneDeep(data);
          if (dataCopy) {
            for (let i = 0; i < dataCopy.sections.length; i++) {
              const section = dataCopy.sections[i];
              if (section) {
                for (let j = 0; j < section.fields.length; j++) {
                  const field = section.fields[j];
                  let exisitngField = fieldsVisibilityValues.find(f => f.field_ui_id == field.field_ui_id);
                  if (exisitngField) {
                    field.visibility = exisitngField.visibility;
                  }
                  field.visibility = field.visibility == null ? FieldVisibility.Editable : field.visibility;
                }
              }
            }
          }
          this.templateForm = dataCopy;
        }
      });
  }

  onVisibilityChange(val, field_ui_id) {
    let arr = this.stepForm.get('fieldsVisibility').value;
    console.log("before", arr);
    let searchResult = arr.find(c => c.field_ui_id == field_ui_id);
    searchResult.visibility = val;
    console.log("after", arr);

    this.stepForm.get('fieldsVisibility').setValue(arr);

    console.log(this.stepForm);
  }
}
