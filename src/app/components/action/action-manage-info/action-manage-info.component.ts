import { Component, OnInit, Input } from "@angular/core";
import {
  FieldVisibility,
  ActionStatus,
  TaskType,
  ProcessStatus
} from "src/app/models/enums";

@Component({
  selector: "app-action-manage-info",
  templateUrl: "./action-manage-info.component.html",
  styleUrls: ["./action-manage-info.component.css"]
})
export class ActionManageInfoComponent implements OnInit {
  @Input("action") action;
  @Input("showForm") showForm;

  fieldVisibilityEnum = FieldVisibility;
  actionStatusEnum = ActionStatus;
  taskTypeEnum = TaskType;
  processStatusEnum = ProcessStatus;

  constructor() {}

  ngOnInit() {}

  getStepStatus(stepId) {
    return this.action.process.actions.find(a => a.stepId == stepId).status;
  }
}
