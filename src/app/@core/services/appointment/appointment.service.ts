import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appointment } from '../../models/appointment/appointment.model';
import { BaseService } from '../../base/services';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends BaseService<Appointment>{

  static API = 'v1/appointment';

    constructor(readonly http: HttpClient) {
        super(http)
    }

    protected getApi(): string {
        return AppointmentService.API;
    }
}
