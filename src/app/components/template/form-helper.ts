import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Helper } from 'src/app/models/helper';
import { TaskType } from 'src/app/models/enums';

export class FormHelper {
  constructor() {}

  getContainer() {
    return new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null),
      steps: new FormArray([this.getEmptyStep()]),
      dataForm: new FormGroup({})
    });
  }

  getEmptyStep() {
    return new FormGroup({
      title: new FormControl(null, Validators.required),
      type: new FormControl(TaskType.Task),
      description: new FormControl(null),
      userId: new FormControl(null, Validators.required),
      order: new FormControl(null),
      stepUiId: new FormControl(Helper.guid()),
      fieldsVisibility: new FormControl([])
    });
  }

  getFormData() {
    return new FormArray([this.getEmptySection()]);
  }

  getEmptySection() {
    return new FormGroup({
      label: new FormControl(null, Validators.required),
      controlUiId: new FormControl(Helper.guid()),
      fields: new FormArray([this.getEmptyControl()])
    });
  }

  getEmptyControl() {
    return new FormGroup({
      label: new FormControl(null, Validators.required),
      type: new FormControl(null),
      controlUiId: new FormControl(Helper.guid())
    });
  }

  updateValueAndValidity(group: FormGroup | FormArray): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.controls[key];

      if (abstractControl instanceof FormGroup || abstractControl instanceof FormArray) {
        this.updateValueAndValidity(abstractControl);
      } else {
        abstractControl.updateValueAndValidity();
      }
    });
  }
}
