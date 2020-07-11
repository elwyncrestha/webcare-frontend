import { Injectable } from '@angular/core';
import { BaseService } from '../../base/services';
import { Notification } from '../../models';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocalStorageUtils, EnumUtils } from '../../utils';
import { NotificationStatus } from '../../enums';

@Injectable({
  providedIn: 'root',
})
export class NotificationService extends BaseService<Notification> {
  static API = 'v1/notification';

  private notificationCountSource = new BehaviorSubject<number>(0);
  notificationCount = this.notificationCountSource.asObservable();

  private notificationMessageSource = new BehaviorSubject<any>(null);
  notificationMessage = this.notificationMessageSource.asObservable();

  constructor(protected http: HttpClient) {
    super(http);
  }

  protected getApi(): string {
    return NotificationService.API;
  }

  private setNotificationCount(count: any) {
    this.notificationCountSource.next(count);
  }

  private setNotificationMessage(message: Array<Notification>) {
    this.notificationMessageSource.next(message);
  }

  public fetchNotifications(): void {
    const search = {
      to: LocalStorageUtils.getStorage().userId,
      status: EnumUtils.getEnum(NotificationStatus, NotificationStatus.UNSEEN),
    };
    this.getPaginationWithSearchObject(search, 1, 5).subscribe(
      (response: any) => {
        this.setNotificationCount(response.detail.totalElements);
        this.setNotificationMessage(
          response.detail.content as Array<Notification>
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
