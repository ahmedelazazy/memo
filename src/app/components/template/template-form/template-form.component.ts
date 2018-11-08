import { Component, OnInit, ChangeDetectorRef, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { SortablejsOptions } from 'angular-sortablejs';
import { TemplateService } from 'src/app/services/template.service';
import { Helper } from 'src/app/models/helper';
import { FormHelper } from '../form-helper';
import { removeDebugNodeFromIndex } from '@angular/core/src/debug/debug_node';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  @Input('templateContainer') templateContainer;
  templateForm: FormGroup;
  subscription: Subscription;

  private sortableOptions: SortablejsOptions = {
    handle: '.move',
    onUpdate: (event) => {
      this._updateValueAndValidity(this.templateForm);
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
    this.templateForm = this.templateContainer.get('dataForm');

  }

  onAddForm() {
    this.templateService.templateForm$.next({});

    this.subscription = this.templateForm.valueChanges.subscribe(
      (value) => {
        this.templateService.templateForm$.next(value);
      });
    this.templateForm.addControl('sections', new FormHelper().getFormData());
  }

  onAddSection() {
    const control = new FormHelper().getEmptySection();
    (<FormArray>this.templateForm.get('sections')).push(control);
  }

  onAddControl(parent) {
    const control = new FormHelper().getEmptyControl();
    parent.push(control);
  }



  onSubmitTemplateForm() { }


  deleteSection(index) {
    let sections = <FormArray>this.templateForm.controls.sections;
    // if (sections.length == 1) return;
    sections.removeAt(index);
    if (sections.controls.length == 0) {
      this.removeForm();
    }
  }

  deleteField(fields, index) {
    if (fields.length == 1) return;
    fields.removeAt(index);
  }
  removeForm() {
    this.templateForm.removeControl('sections');
    this.templateService.templateForm$.next(null);
    this.subscription.unsubscribe();
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
