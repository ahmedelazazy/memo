import { Component, OnInit } from "@angular/core";
import { ProcessService } from "src/app/services/process.service";
import { ProcessStatus, ActionStatus } from "src/app/models/enums";

@Component({
  selector: "app-process-progress-list",
  templateUrl: "./process-progress-list.component.html",
  styleUrls: ["./process-progress-list.component.css"]
})
export class ProcessProgressListComponent implements OnInit {
  pendingProcesses;
  completedProcesses;

  constructor(private processService: ProcessService) {}

  ngOnInit() {
    this.processService.get().subscribe(data => {
      console.log(data);

      this.pendingProcesses = data.filter(
        a => a.status == ProcessStatus.started
      );
      this.completedProcesses = data.filter(
        a => a.status != ProcessStatus.started
      );
    });
  }

  onProcessSelect() {}

  getProgress(process) {
    let total = process.actions.length;
    let completed = process.actions.filter(
      a =>
        a.status == ActionStatus.completed_or_approved ||
        a.status == ActionStatus.rejected
    ).length;
    return ((completed / total) * 100).toFixed(0) + "%";
  }
}
