import { Injectable } from '@angular/core';
import { BaseService } from '../../base/services';
import { User } from '../../models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppUtils } from '../../utils';
import { Status } from '../../enums';

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService<User> {
    static API = 'v1/users';

    constructor(readonly http: HttpClient) {
        super(http);
    }

    public getAuthenticated(): Observable<any> {
        const req = AppUtils.getRequest(`${this.getApi()}/authenticated`);

        return this.http.get(req.url, { headers: req.header });
    }

    public changeStatus(id: number, status: Status): Observable<any> {
        const req = AppUtils.getRequest(`${this.getApi()}/changeStatus?id=${id}&status=${status}`);

        return this.http.get(req.url, { headers: req.header });
    }

    protected getApi(): string {
        return UserService.API;
    }

}
