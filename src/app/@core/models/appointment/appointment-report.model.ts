import { Appointment } from './appointment.model';
import { BaseEntity } from '../../base/models';

export class AppointmentReport extends BaseEntity {
  appointment?: Appointment;
  data?: string;
}
