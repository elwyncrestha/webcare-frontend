import { BaseEntity } from '../../base/models';

export class Feedback extends BaseEntity {
  fullName?: string;
  phoneNo?: string;
  email?: string;
  message?: string;
}
