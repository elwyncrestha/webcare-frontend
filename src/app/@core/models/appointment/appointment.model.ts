import { Time } from '@angular/common';
import { BaseEntity } from '../../base/models';
import { AppointmentStatus } from '../../enums';
import { Department } from '../department/department.model';
import { Doctor } from '../doctor/doctor.model';
import { Patient } from '../patient/patient.model';

export class Appointment extends BaseEntity {
  patient?: Patient;
  department?: Department;
  doctor?: Doctor;
  appointmentDate?: Date;
  appointmentTime?: Time;
  status?: AppointmentStatus;
}
