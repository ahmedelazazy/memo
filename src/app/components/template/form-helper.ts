import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { Helper } from 'src/app/models/helper';
import { TaskType } from 'src/app/models/enums';

export class FormHelper {

  constructor() { }



  getContainer() {
    return new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null),
      steps: new FormArray([
        this.getEmptyStep()
      ]),
      dataForm: new FormGroup({})
    });
  }

  getEmptyStep() {
    return new FormGroup({
      'title': new FormControl(null),
      'type': new FormControl(TaskType.Task),
      'description': new FormControl(null),
      'user_id': new FormControl(null),
      'order': new FormControl(null),
      'fieldsVisibility': new FormControl([])
    });


  }


  getFormData() {
    return new FormArray([
      new FormGroup({
        'label': new FormControl(null),
        'section_ui_id': new FormControl(Helper.guid()),
        'fields': new FormArray([
          new FormGroup({
            'label': new FormControl(null),
            'type': new FormControl(null),
            'field_ui_id': new FormControl(Helper.guid()),
          })
        ])
      })
    ]);
  }

  getEmptySection() {
    return new FormGroup({
      'label': new FormControl(null),
      'section_ui_id': new FormControl(Helper.guid()),
      'fields': new FormArray([
        new FormGroup({
          'label': new FormControl(null),
          'type': new FormControl(null),
          'field_ui_id': new FormControl(Helper.guid()),
        })
      ])
    });
  }

  getEmptyControl() {
    return new FormGroup({
      'label': new FormControl(null),
      'type': new FormControl(null),
      'field_ui_id': new FormControl(Helper.guid()),
    });
  }
}
