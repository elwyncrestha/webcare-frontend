import { Injectable } from '@angular/core';
import { BaseService } from '../../base/services';
import { Department } from '../../models/department/department.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService extends BaseService<Department>{

  static API = 'v1/departments';

  constructor(readonly http: HttpClient) {super(http); }

protected getApi(): string {
    return DepartmentService.API;
}
}
