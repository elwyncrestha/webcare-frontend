import { BaseEntity } from '../../base/models';
import { User } from '../user/user.model';

export class Patient extends BaseEntity {
  user?: User;
  age?: number;
}
