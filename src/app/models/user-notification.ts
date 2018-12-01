export class UserNotification {
  id?: number;
  userId: number;
  text: string;
  entity: string;
  entity_id: number;
  url: string;
  addedOn: Date;
  isNew: boolean;
  details: string;
}
