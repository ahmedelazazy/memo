import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { SortablejsOptions } from 'angular-sortablejs';
import { TemplateService } from 'src/app/services/template.service';
import { Helper } from 'src/app/models/helper';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  @ViewChild('formRef') formRef;
  templateForm: FormGroup;
  private sortableOptions: SortablejsOptions = {
    handle: '.move',
    onUpdate: (event) => {

      this._updateValueAndValidity(this.templateForm);

      //update the formArray order
      // let sections: any = this.templateForm.get('sections');
      // if (sections && sections.controls) {
      //   for (let i = 0; i < sections.controls.length; i++) {
      //     const section = sections.controls[i];
      //     section.updateValueAndValidity();

      //     let fields: any = section.get('fields');
      //     if (fields && fields.controls) {
      //       for (let j = 0; j < fields.controls.length; j++) {
      //         const field = fields.controls[j];
      //         field.updateValueAndValidity();
      //       }
      //     }
      //   }
      // }
    }
  };


  constructor(private cdRef: ChangeDetectorRef, private templateService: TemplateService) { }


  ngAfterViewChecked() {
    this.cdRef.detectChanges();
    // setTimeout(() => {
    //   this.dateNow = new Date();
    // });
  }

  ngOnInit() {



    this.templateForm = new FormGroup({
      'sections': new FormArray([
        new FormGroup({
          'sectionName': new FormControl(null),
          'sectionId': new FormControl(Helper.guid()),
          'fields': new FormArray([
            new FormGroup({
              'fieldName': new FormControl(null),
              'fieldType': new FormControl(null),
              'fieldId': new FormControl(Helper.guid()),
            })
          ])
        })
      ])
    });

    // this.templateForm.updateValueAndValidity({ onlySelf: false, emitEvent: true });


    this.templateForm.valueChanges.subscribe(
      (value) => {
        this.templateService.currentTemplate.form.next(value);
      }
    );
  }

  onAddSection() {
    const control = new FormGroup({
      'sectionName': new FormControl(null),
      'sectionId': new FormControl(Helper.guid()),
      'fields': new FormArray([
        new FormGroup({
          'fieldName': new FormControl(null),
          'fieldType': new FormControl(null),
          'fieldId': new FormControl(Helper.guid()),
        })
      ])
    });
    (<FormArray>this.templateForm.get('sections')).push(control);
  }

  onAddControl(parent) {
    const control = new FormGroup({
      'fieldName': new FormControl(null),
      'fieldType': new FormControl(null),
      'fieldId': new FormControl(Helper.guid()),
    });
    parent.push(control);
  }



  onSubmitTemplateForm() {
  }


  deleteSection(index) {
    let sections = <FormArray>this.templateForm.controls.sections;
    if (sections.length == 1) return;
    sections.removeAt(index);
  }

  deleteField(fields, index) {
    if (fields.length == 1) return;
    fields.removeAt(index);
  }



  public _updateValueAndValidity(group: FormGroup | FormArray): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.controls[key];

      if (abstractControl instanceof FormGroup || abstractControl instanceof FormArray) {
        this._updateValueAndValidity(abstractControl);
      } else {
        abstractControl.updateValueAndValidity();
      }
    });
  }

}
