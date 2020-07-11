import { BaseEntity } from '../../base/models';
import { User } from '../user/user.model';
import { NotificationStatus } from '../../enums';

export class Notification extends BaseEntity {
  from?: User;
  to?: User;
  message?: string;
  status?: NotificationStatus;
}
