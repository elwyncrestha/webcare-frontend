import { Injectable } from '@angular/core';
import { BaseService } from '../../base/services';
import { Patient } from '../../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PatientService extends BaseService<Patient> {
  static API = 'v1/patient';

  constructor(readonly http: HttpClient) {
    super(http);
  }

  protected getApi(): string {
    return PatientService.API;
  }
}
