export enum ActionStatus {
  pending = "pending",
  assigned = "assigned",
  completed_or_approved = "completed/approved",
  rejected = "rejected",
  revoked = "revoked"
}

export enum ProcessStatus {
  started = "started",
  completed_or_approved = "completed/approved",
  rejected = "rejected",
  revoked = "revoked"
}

export enum TaskType {
  Task = "task",
  Approval = "approval"
}

export enum FieldVisibility {
  Hidden = "hidden",
  Readonly = "readonly",
  Editable = "editable",
  Required = "required"
}

export enum MemoMode {
  Active = "active",
  Inactive = "inactive",
  Mine = "mine"
}
