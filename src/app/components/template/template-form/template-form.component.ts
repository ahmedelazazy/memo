import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { SortablejsOptions } from 'angular-sortablejs';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {


  signupForm: FormGroup;
  templateForm: FormGroup;
  sortableOptions: SortablejsOptions = {
    handle: '.move',
    onUpdate: (event) => console.log(event),

  };



  constructor() { }

  ngOnInit() {

    // form > section > control

    this.templateForm = new FormGroup({
      // 'hidden': new FormControl(null),
      'sections': new FormArray([
        new FormGroup({
          // 'hidden': new FormControl(null),
          'sectionName': new FormControl(null),
          'fields': new FormArray([
            new FormGroup({
              // 'hidden': new FormControl(null),
              'fieldName': new FormControl(null),
              'fieldType': new FormControl(null),
            })
          ])
        })
      ])
    });

    this.templateForm.updateValueAndValidity({ onlySelf: false, emitEvent: true });


    this.templateForm.valueChanges.subscribe(
      (value) => console.log("change event: ", value)
    );
    // this.signupForm.statusChanges.subscribe(
    //   (status) => console.log(status)
    // );
    // this.signupForm.setValue({
    //   'userData': {
    //     'username': 'Max',
    //     'email': 'max@test.com'
    //   },
    //   'gender': 'male',
    //   'hobbies': []
    // });


  }

  onAddSection() {
    const control = new FormGroup({
      'sectionName': new FormControl(null),
      'fields': new FormArray([
        new FormGroup({
          // 'hidden': new FormControl(null),
          'fieldName': new FormControl(null),
          'fieldType': new FormControl(null)
        })
      ])
    });
    (<FormArray>this.templateForm.get('sections')).push(control);
  }

  onAddControl(parent) {
    const control = new FormGroup({
      'hidden': new FormControl(null),
      'fieldName': new FormControl(null),
      'fieldType': new FormControl(null)
    });
    parent.push(control);
  }



  onSubmitTemplateForm() {

    // this.templateForm.get('hidden').setValue({
    //   'hidden': 'hidden-form'
    // });

    // for (let index = 0; index < (<FormArray>this.templateForm.get('sections')).controls.length; index++) {
    //   const section = (<FormArray>this.templateForm.get('sections')).controls[index];
    //   section.get('hidden').setValue('section-hidden');

    //   for (let j = 0; j < (<FormArray>section.get('fields')).controls.length; j++) {
    //     const field = (<FormArray>section.get('fields')).controls[j];
    //     field.get('hidden').setValue('field-hidden');
    //   }
    // }

    console.log("submitting: ", this.templateForm.value);

  }


  deleteSection(index) {
    let sections = <FormArray>this.templateForm.controls.sections;
    sections.removeAt(index);
  }

  deleteField(fields, index) {
    fields.removeAt(index);
  }


  log(obj) {
    console.log(obj);
    return "Logged";
  }

}
