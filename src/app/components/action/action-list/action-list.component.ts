import { Component, OnInit } from '@angular/core';
import { ActionService } from 'src/app/services/action.service';
import { Observable } from 'rxjs';
import { Action } from 'src/app/models/action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.css']
})
export class ActionListComponent implements OnInit {

  pendingActions: any[];
  completedActions: any[];
  constructor(private actionService: ActionService, private router: Router) { }

  ngOnInit() {
    this.actionService.get().subscribe(
      actions => {
        this.pendingActions = actions.filter(a => a.status == 1);
        this.completedActions = actions.filter(a => a.status != 1);
      }
    );
  }

  onActionSelect(action: Action) {
    this.router.navigateByData({
      url: ["/action/view"],
      data: action
    });
  }





}
