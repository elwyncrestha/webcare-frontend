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

  public replyQuery(helpDeskQueryId: number) {
    return `${this.getApi()}/reply?helpDeskQueryId=${helpDeskQueryId}&status=${status}`;
  }

  protected getApi(): string {
    return HelpDeskService.API;
  }
}
