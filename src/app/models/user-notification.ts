
export class UserNotification {
  id?: number;
  user_id: number;
  text: string;
  entity: string;
  entity_id: number;
  url: string;
  date: Date;
  is_new: boolean;
  details: string;
}
