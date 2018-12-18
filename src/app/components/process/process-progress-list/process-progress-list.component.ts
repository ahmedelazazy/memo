import { Component, OnInit } from '@angular/core';
import { ProcessService } from 'src/app/services/process.service';
import { ProcessStatus, ActionStatus } from 'src/app/models/enums';
import { trigger, transition, useAnimation } from '@angular/animations';
import { zoomIn } from 'ng-animate';

@Component({
  selector: 'app-process-progress-list',
  templateUrl: './process-progress-list.component.html',
  styleUrls: ['./process-progress-list.component.css'],
  animations: [trigger('animation', [transition('* => *', useAnimation(zoomIn))])]
})
export class ProcessProgressListComponent implements OnInit {
  animate: any;
  pendingProcesses;
  completedProcesses;
  p: number = 1;

  constructor(private processService: ProcessService) {}

  ngOnInit() {
    this.processService.get().subscribe(data => {
      this.pendingProcesses = data.filter(a => a.status == ProcessStatus.started);
      this.completedProcesses = data.filter(a => a.status != ProcessStatus.started);
    });
  }

  onProcessSelect() {}

  getProgress(process) {
    let total = process.actions.length;
    let completed = process.actions.filter(
      a => a.status == ActionStatus.completed_or_approved || a.status == ActionStatus.rejected
    ).length;
    return ((completed / total) * 100).toFixed(0) + '%';
  }
  doAnimation() {
    this.animate = !this.animate;
  }
}
