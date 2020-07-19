import { BaseEntity } from '../../base/models';

export class HelpDesk extends BaseEntity {
  name?: string;
  contactNumber?: string;
  email?: string;
  query?: string;
  reply?: string;
}
