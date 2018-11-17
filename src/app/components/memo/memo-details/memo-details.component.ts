import { Component, OnInit } from '@angular/core';
import { MemoService } from 'src/app/services/memo.service';
import { ActivatedRoute } from '@angular/router';
import { tap, map } from 'rxjs/operators';
import { ActionStatus, TaskType } from 'src/app/models/enums';

@Component( {
  selector: 'app-memo-details',
  templateUrl: './memo-details.component.html',
  styleUrls: ['./memo-details.component.css']
} )
export class MemoDetailsComponent implements OnInit {
  step;
  actionStatusEnum = ActionStatus;
  taskTypeEnum = TaskType;

  constructor( private memoService: MemoService, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.route.params
      .subscribe( params => this.memoService.getById( params['id'] ).
        subscribe( step => {
          console.log( step );
          this.step = step;
        } ) );

  }

  getStepStatus( step_id ) {
    return this.step.memo.steps.find( a => a.step_id == step_id ).status;
  }



}
