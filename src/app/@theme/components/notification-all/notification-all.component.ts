import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/@core/models';
import { NotificationService } from 'src/app/@core/services';
import { ToastService } from '../../services/toast.service';
import { LocalStorageUtils } from 'src/app/@core/utils';
import { Alert, AlertType } from '../../models/alert';

@Component({
  selector: 'app-notification-all',
  templateUrl: './notification-all.component.html',
  styleUrls: ['./notification-all.component.scss'],
})
export class NotificationAllComponent implements OnInit {
  public notifications: Notification[] = [];
  public page = 1;
  private loading = false;

  constructor(
    private notificationService: NotificationService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {}

  public loadData(): void {
    if (this.loading) {
      return;
    }

    this.loading = true;
    const filter = { to: LocalStorageUtils.getStorage().userId };
    this.notificationService
      .getPaginationWithSearchObject(filter, this.page, 5)
      .subscribe(
        (response: any) => {
          this.notifications.push(...response.detail.content);
          this.loading = false;
          this.page++;
        },
        (error) => {
          console.error(error);
          this.toastService.show(
            new Alert(AlertType.ERROR, 'Failed to load notifications')
          );
          this.loading = false;
        }
      );
  }
}
