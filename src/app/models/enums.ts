export enum ActionStatus {
  assigned = 1,
  completed_or_approved = 2,
  rejected = 3,
  revoked = 4


}

export enum ProcessStatus {
  started = 1,
  completed_or_approved = 2,
  rejected = 3,
  revoked = 4
}

export enum TaskType {
  Task = "1",
  Approval = "2"
}

export enum FieldVisibility {
  Hidden = 1,
  Readonly = 2,
  Editable = 3,
  Required = 4,
}


