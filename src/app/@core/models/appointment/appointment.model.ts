import { BaseEntity } from '../../base/models';
import { Time } from '@angular/common';
import { Department } from '../department/department.model';
import { Doctor } from '../doctor/doctor.model';
import { Gender } from '../../enums';
import { Patient } from '../patient/patient.model';

export class Appointment extends BaseEntity {
  patient?: Patient;
  department?: Department;
  doctor?: Doctor;
  appointmentDate?: Date;
  appointmentTime?: Time;
}
