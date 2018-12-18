import { Component, OnInit } from '@angular/core';
import { ActionService } from 'src/app/services/action.service';
import { Observable } from 'rxjs';
import { Action } from 'src/app/models/action';
import { Router } from '@angular/router';
import { TaskType, ActionStatus } from 'src/app/models/enums';
import { trigger, transition, useAnimation } from '@angular/animations';
import { zoomIn } from 'ng-animate';
@Component({
  selector: 'app-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.css'],
  animations: [trigger('animation', [transition('* => *', useAnimation(zoomIn))])]
})
export class ActionListComponent implements OnInit {
  animate: any;
  pendingActions: any[];
  completedActions: any[];
  taskTypeEnum = TaskType;
  p: number = 1;

  constructor(private actionService: ActionService, private router: Router) {}

  ngOnInit() {
    this.actionService.get().subscribe(actions => {
      console.log(actions);
      this.pendingActions = actions.filter(a => a.status == ActionStatus.assigned);
      this.completedActions = actions.filter(
        a => a.status == ActionStatus.completed_or_approved || a.status == ActionStatus.rejected
      );
    });
  }

  onActionSelect(action: Action) {
    // this.router.navigateByData({
    //   url: ["/action/view"],
    //   data: action
    // });
    // btoa(action.id.toString());
    this.router.navigate(['action', action.id]);
  }

  getProgress(action) {
    let total = action.process.actions.length;
    let completed = action.process.actions.filter(
      a => a.status == ActionStatus.completed_or_approved || a.status == ActionStatus.rejected
    ).length;
    return ((completed / total) * 100).toFixed(0) + '%';
  }

  doAnimation() {
    this.animate = !this.animate;
  }
}
