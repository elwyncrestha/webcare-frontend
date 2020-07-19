import { Injectable } from '@angular/core';
import { BaseService } from '../../base/services';
import { HttpClient } from '@angular/common/http';
import { AppointmentReport } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class AppointmentReportService extends BaseService<AppointmentReport> {
  static API = 'v1/appointment-report';

  constructor(readonly http: HttpClient) {
    super(http);
  }

  protected getApi(): string {
    return AppointmentReportService.API;
  }
}
