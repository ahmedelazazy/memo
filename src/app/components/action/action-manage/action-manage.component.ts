import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Action } from 'src/app/models/action';
import { ActionService } from 'src/app/services/action.service';
import { ToastrService } from 'ngx-toastr';
import { FieldVisibility, ActionStatus, TaskType, ProcessStatus } from 'src/app/models/enums';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-action-manage',
  templateUrl: './action-manage.component.html',
  styleUrls: ['./action-manage.component.css']
})
export class ActionManageComponent implements OnInit {
  action;

  fieldVisibilityEnum = FieldVisibility;
  actionStatusEnum = ActionStatus;
  taskTypeEnum = TaskType;
  processStatusEnum = ProcessStatus;

  actionForm: FormGroup;
  showForm;
  actionId: number;
  constructor(
    private router: Router,
    private actionService: ActionService,
    private toastrService: ToastrService,
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    // this.action = this.router.getNavigatedData();
    // if ((Object.keys(this.action).length === 0 && this.action.constructor === Object)) {
    //   this.router.navigate(['/action']);
    // }

    this.route.params
      .pipe(
        map(params => params['id']),
        tap(id => (this.actionId = +id))
      )
      .subscribe(id =>
        this.actionService.getById(id).subscribe(action => {
          if (!action) {
            this.router.navigate(['/action']);
            return;
          }
          console.log(action);

          this.action = action;
          this.actionForm = this.prepareForm();
        })
      );
  }

  prepareForm() {
    let sections = new FormArray([]);

    if (this.action.step.sections) {
      this.showForm = this.action.step.sections.length > 0;
      for (let i = 0; i < this.action.step.sections.length; i++) {
        const section = this.action.step.sections[i];
        sections.push(this.getSectionFields(section));
      }
    }

    return new FormGroup({
      id: new FormControl(this.action.id),
      comment: new FormControl(null),
      status: new FormControl(null),
      sections: sections
    });
  }

  getSectionFields(section) {
    let sectionFields = new FormArray([]);
    for (let i = 0; i < section.controls.length; i++) {
      const field = section.controls[i];
      sectionFields.push(
        new FormGroup({
          value: new FormControl(field.controlValue ? field.controlValue.value : null),
          id: new FormControl(field.controlValue ? field.controlValue.id : null)
        })
      );
    }
    return sectionFields;
  }
}
