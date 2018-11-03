import { Component, OnInit } from '@angular/core';
import { ProcessService } from 'src/app/services/process.service';

@Component({
  selector: 'app-process-progress-list',
  templateUrl: './process-progress-list.component.html',
  styleUrls: ['./process-progress-list.component.css']
})
export class ProcessProgressListComponent implements OnInit {

  pendingProcesses;
  completedProcesses;

  constructor(private processService: ProcessService) { }

  ngOnInit() {
    this.processService.get().subscribe(data => {
      this.pendingProcesses = data.filter(a => a.status == 1);
      this.completedProcesses = data.filter(a => a.status != 1);
    });
  }

  onProcessSelect() { }

  getProgress(process) {
    let total = process.actions.length;
    let completed = process.actions.filter(a => a.status == 2).length;
    return (completed / total * 100).toFixed(0) + "%";
  }
}
