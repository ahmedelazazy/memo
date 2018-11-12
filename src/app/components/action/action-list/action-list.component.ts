import { Component, OnInit } from '@angular/core';
import { ActionService } from 'src/app/services/action.service';
import { Observable } from 'rxjs';
import { Action } from 'src/app/models/action';
import { Router } from '@angular/router';
import { TaskType } from 'src/app/models/enums';

@Component({
  selector: 'app-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.css']
})
export class ActionListComponent implements OnInit {

  pendingActions: any[];
  completedActions: any[];
  taskTypeEnum = TaskType;

  constructor(private actionService: ActionService, private router: Router) { }

  ngOnInit() {
    this.actionService.get().subscribe(
      actions => {
        console.log(actions);
        this.pendingActions = actions.filter(a => a.status == 1);
        this.completedActions = actions.filter(a => a.status != 1);
      }
    );
  }

  onActionSelect(action: Action) {
    // this.router.navigateByData({
    //   url: ["/action/view"],
    //   data: action
    // });
    // btoa(action.id.toString());
    this.router.navigate(["action", action.id]);
  }

  getProgress(action) {
    let total = action.process.actions.length;
    let completed = action.process.actions.filter(a => a.status == 2).length;
    return (completed / total * 100).toFixed(0) + "%";
  }



}
