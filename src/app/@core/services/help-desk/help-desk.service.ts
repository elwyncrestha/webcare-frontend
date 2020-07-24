import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../base/services';
import { HelpDesk } from '../../models/help-desk/help-desk.model';
import { Observable } from 'rxjs';
import { AppUtils } from '../../utils';

@Injectable({
  providedIn: 'root',
})
export class HelpDeskService extends BaseService<HelpDesk> {
  static API = 'v1/helpdesk';

  constructor(readonly http: HttpClient) {
    super(http);
  }

  public replyQuery(model: HelpDesk): Observable<any> {
    const api = `${this.getApi()}/reply`;
    const req = AppUtils.getRequest(api);
    return this.http.post(req.url, model, { headers: req.header });
  }

  protected getApi(): string {
    return HelpDeskService.API;
  }
}
