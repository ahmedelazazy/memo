import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from 'src/app/models/action';
import { ActionService } from 'src/app/services/action.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-action-manage',
  templateUrl: './action-manage.component.html',
  styleUrls: ['./action-manage.component.css']
})
export class ActionManageComponent implements OnInit {

  action;
  constructor(private router: Router, private actionService: ActionService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.action = this.router.getNavigatedData();
    if ((Object.keys(this.action).length === 0 && this.action.constructor === Object)) {
      this.router.navigate(['/action']);
    }
  }

  onSave(actionStatus) {
    this.action.status = actionStatus;
    this.actionService.update(this.action).subscribe(
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

  getStep(act) {
    return this.action.template.steps.find(s => act.step_id == s.id);
  }

  getStepStatus(step_id){
    return this.action.process.actions.find(a => a.step_id == step_id).status;
  }
}
