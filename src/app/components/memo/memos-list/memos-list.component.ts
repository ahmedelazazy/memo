import { Component, OnInit } from '@angular/core';
import { TaskType } from 'src/app/models/enums';
import { MemoService } from 'src/app/services/memo.service';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-memos-list',
  templateUrl: './memos-list.component.html',
  styleUrls: ['./memos-list.component.css']
} )
export class MemosListComponent implements OnInit {


  pendingMemoSteps: any[];
  completedMemoSteps: any[];
  taskTypeEnum = TaskType;

  constructor( private memoService: MemoService, private router: Router ) { }

  ngOnInit() {
    this.memoService.get().subscribe(
      steps => {
        console.log( "the memo", steps );
        this.pendingMemoSteps = ( steps as any ).filter( a => a.status == 1 );
        this.completedMemoSteps = ( steps as any ).filter( a => a.status != 1 );
      }
    );
  }

  onStepSelect( step ) {
    this.router.navigate(["memo", step.id]);
  }

  getProgress( step ) {
    // let total = action.process.actions.length;
    // let completed = action.process.actions.filter(a => a.status == 2).length;
    // return (completed / total * 100).toFixed(0) + "%";
    return "50%";
  }

}
