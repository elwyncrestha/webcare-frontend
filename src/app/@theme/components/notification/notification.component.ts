import { Component, OnInit } from '@angular/core';
import { Notification } from '../../../@core/models';
import { NotificationService } from 'src/app/@core/services';
import { ToastService } from '../../services/toast.service';
import { EnumUtils } from 'src/app/@core/utils';
import { NotificationStatus } from 'src/app/@core/enums';
import { Alert, AlertType } from '../../models/alert';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  notifications: Array<Notification> = new Array<Notification>();

  constructor(
    private notificationService: NotificationService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.notificationService.notificationMessage.subscribe(
      (value) => (this.notifications = value)
    );
  }

  public markAsSeen(notification: Notification) {
    notification.status = EnumUtils.getEnum(
      NotificationStatus,
      NotificationStatus.SEEN
    );
    this.notificationService.save(notification).subscribe(
      () => {
        this.notificationService.fetchNotifications();
      },
      (error) => {
        console.error(error);
        this.toastService.show(
          new Alert(AlertType.ERROR, 'Failed to update notification status')
        );
      }
    );
  }
}
