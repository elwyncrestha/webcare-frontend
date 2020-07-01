import { BaseEntity } from '../../base/models';
import { User } from '../user/user.model';
import { Department } from '../department/department.model';

export class Doctor extends BaseEntity {
    user?: User;
    department?: Department;
    specializationField?: string;
}
