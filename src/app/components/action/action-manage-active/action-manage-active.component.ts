import { Component, OnInit, Input } from '@angular/core';
import { FieldVisibility, ActionStatus, TaskType, ProcessStatus } from 'src/app/models/enums';
import { Router } from '@angular/router';
import { ActionService } from 'src/app/services/action.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-action-manage-active',
  templateUrl: './action-manage-active.component.html',
  styleUrls: ['./action-manage-active.component.css']
})
export class ActionManageActiveComponent implements OnInit {

  @Input('action') action;
  @Input('actionForm') actionForm;
  @Input('showForm') showForm;

  fieldVisibilityEnum = FieldVisibility;
  actionStatusEnum = ActionStatus;
  taskTypeEnum = TaskType;
  processStatusEnum = ProcessStatus;

  constructor(private router: Router, private actionService: ActionService, private toastrService: ToastrService) { }

  ngOnInit() {
  }

  onSave(actionStatus) {

    let flatFields = [];
    if (this.actionForm.value.sections) {
      for (let i = 0; i < this.actionForm.value.sections.length; i++) {
        const section = this.actionForm.value.sections[i];
        if (section.length > 0) {
          flatFields.push(...section);
        }
      }
    }

    this.actionForm.value.process_control_value = flatFields;
    this.actionForm.value.status = actionStatus;

    this.actionService.update(this.actionForm.value).subscribe(
      data => {
        this.toastrService.success('Data saved successfully');
        this.router.navigate(['/action']);
      },
      error => {
        this.toastrService.error('Error wile saving');
        console.error(error);
      }
    );
  }

}
