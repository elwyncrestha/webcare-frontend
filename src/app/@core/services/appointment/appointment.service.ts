import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appointment } from '../../models/appointment/appointment.model';
import { BaseService } from '../../base/services';
import { Observable } from 'rxjs';
import { AppUtils } from '../../utils';
import { AppointmentStatus } from '../../enums';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService extends BaseService<Appointment> {
  static API = 'v1/appointment';

  constructor(readonly http: HttpClient) {
    super(http);
  }

  public confirmAppointment(
    appointmentId: number,
    status: AppointmentStatus
  ): Observable<any> {
    const api = `${this.getApi()}/confirm?appointmentId=${appointmentId}&status=${status}`;
    const req = AppUtils.getRequest(api);

    return this.http.get(req.url, { headers: req.header });
  }

  protected getApi(): string {
    return AppointmentService.API;
  }
}
