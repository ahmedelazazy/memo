import { Component, OnInit, Input } from "@angular/core";
import {
  FieldVisibility,
  ActionStatus,
  TaskType,
  ProcessStatus
} from "src/app/models/enums";

@Component({
  selector: "app-action-manage-history",
  templateUrl: "./action-manage-history.component.html",
  styleUrls: ["./action-manage-history.component.css"]
})
export class ActionManageHistoryComponent implements OnInit {
  @Input("action") action;

  fieldVisibilityEnum = FieldVisibility;
  actionStatusEnum = ActionStatus;
  taskTypeEnum = TaskType;
  processStatusEnum = ProcessStatus;

  constructor() {}

  ngOnInit() {
    console.log(this.action);
  }

  getStep(act) {
    return this.action.template.steps.find(s => act.stepId == s.id);
  }
}
