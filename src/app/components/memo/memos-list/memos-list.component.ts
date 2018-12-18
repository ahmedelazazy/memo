import { Component, OnInit } from '@angular/core';
import { TaskType, ActionStatus, MemoMode } from 'src/app/models/enums';
import { MemoService } from 'src/app/services/memo.service';
import { Router } from '@angular/router';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';
import { trigger, transition, useAnimation } from '@angular/animations';
import { zoomIn } from 'ng-animate';

@Component({
  selector: 'app-memos-list',
  templateUrl: './memos-list.component.html',
  styleUrls: ['./memos-list.component.css'],
  animations: [trigger('animation', [transition('* => *', useAnimation(zoomIn))])]
})
export class MemosListComponent implements OnInit {
  animate: any;

  taskTypeEnum = TaskType;
  tasks = [];
  memos = [];
  Mode = MemoMode;
  selectedMode = this.Mode.Active;
  p: number = 1;

  constructor(private memoService: MemoService, private router: Router) {}

  ngOnInit() {
    this.memoService.get('active').subscribe(tasks => (this.tasks = tasks));
  }

  getTasks(status) {
    this.animate = !this.animate;

    this.tasks = [];
    this.memos = [];
    this.selectedMode = status;
    if (this.selectedMode == this.Mode.Active || this.selectedMode == this.Mode.Inactive) {
      this.memoService.get(status).subscribe(tasks => (this.tasks = tasks));
    } else if (this.selectedMode == this.Mode.Mine) {
      this.memoService.get(status).subscribe(memos => (this.memos = memos));
    }
  }

  onStepSelect(task) {
    if (this.selectedMode == this.Mode.Active || this.selectedMode == this.Mode.Inactive) {
      this.router.navigate(['memo', task.id]);
    } else if (this.selectedMode == this.Mode.Mine) {
      this.router.navigate(['memo', task.tasks[0].id]);
    }
  }

  getProgress(memo) {
    if (!memo || !memo.tasks) {
      console.error('getProgress error');
      return '0%';
    }
    let total = memo.tasks.length;
    let completed = memo.tasks.filter(
      t => t.status == ActionStatus.completed_or_approved || t.status == ActionStatus.rejected
    ).length;
    return ((completed / total) * 100).toFixed(0) + '%';
  }
}
