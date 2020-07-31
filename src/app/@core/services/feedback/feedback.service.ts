import { Injectable } from '@angular/core';
import { BaseService } from '../../base/services';
import { Feedback } from '../../models/feedback/feedback.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService extends BaseService<Feedback> {
  static API = 'v1/feedback';

  constructor(readonly http: HttpClient) {
    super(http);
  }

  protected getApi() {
    return FeedbackService.API;
  }
}
