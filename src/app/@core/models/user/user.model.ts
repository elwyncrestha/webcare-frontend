import { BaseEntity } from '../../base/models';
import { Status, UserType } from '../../enums';

export class User extends BaseEntity {
    username?: string;
    password?: string;
    name?: string;
    email?: string;
    status?: Status;
    userType?: UserType;
}
