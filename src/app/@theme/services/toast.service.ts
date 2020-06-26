import { Injectable } from '@angular/core';
import { NbToastrService, NbToastrConfig } from '@nebular/theme';
import { Alert, AlertType } from '../models/alert';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private service: NbToastrService) { }

  public show(alert: Alert) {
    const config: Partial<NbToastrConfig> = {
      duration: 6000,
      destroyByClick: true,
    };
    switch (alert.type) {
      case AlertType.SUCCESS:
        this.service.success(alert.type, alert.message, config);
        break;
      case AlertType.INFO:
        this.service.info(alert.type, alert.message, config);
        break;
      case AlertType.WARNING:
        this.service.warning(alert.type, alert.message, config);
        break;
      case AlertType.PRIMARY:
        this.service.primary(alert.type, alert.message, config);
        break;
      case AlertType.ERROR:
        this.service.danger(alert.type, alert.message, config);
        break;
      default:
        this.service.default(alert.type, alert.message, config);
    }
  }
}
