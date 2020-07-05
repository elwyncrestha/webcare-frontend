import { BaseEntity } from '../../base/models';
import { Time } from '@angular/common';
import { Department } from '../department/department.model';
import { Doctor } from '../doctor/doctor.model';
import { Gender } from '../../enums';

export class Appointment extends BaseEntity{
    name?: string;
    address?: string;
    contactNumber?: string;
    email?: string;
    gender?: Gender;
    age?: number;
    department?: Department;
    doctor?: Doctor;
    appointmentDate?: Date;
    preferredTime?: Time;
}
