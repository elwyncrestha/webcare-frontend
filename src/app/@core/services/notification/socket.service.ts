import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocalStorageUtils } from '../../utils';
import { ToastService } from 'src/app/@theme/services/toast.service';
import { NotificationService } from './notification.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Alert, AlertType } from 'src/app/@theme/models/alert';
import { Notification } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private stompClient;
  private endpoint = `${environment.URL}/webcare-websocket`;
  private socketOpen = false;
  private userId = Number(LocalStorageUtils.getStorage().userId);

  constructor(
    private toastService: ToastService,
    private notificationService: NotificationService
  ) {}

  public initializeWebSocketConnection() {
    const webSocket = new SockJS(this.endpoint);
    this.stompClient = Stomp.over(webSocket);
    this.stompClient.connect({}, () => this.openSocket());
    this.stompClient.debug = null;
  }

  private openSocket() {
    if (!this.socketOpen) {
      this.socketOpen = true;
      this.stompClient.subscribe(`/webcare-subscriber/${this.userId}`, () => {
        this.toastService.show(
          new Alert(AlertType.INFO, 'You have new notifications!')
        );
        this.notificationService.fetchNotifications();
      });
    }
  }

  public closeSocket() {
    this.stompClient.unsubscribe(`/webcare-subscriber/${this.userId}`);
    this.stompClient.disconnect();
  }

  public send(notification: Notification) {
    this.stompClient.send(
      '/webcare-publisher/send',
      {},
      JSON.stringify(notification)
    );
  }
}
