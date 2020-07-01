import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../base/services';
import { Doctor } from '../../models/doctor/doctor.model';

@Injectable({
    providedIn: 'root'
})
export class DoctorService extends BaseService<Doctor> {
    static API = 'v1/doctors';

    constructor(readonly http: HttpClient) {
        super(http);
    }

    protected getApi(): string {
        return DoctorService.API;
    }

}
