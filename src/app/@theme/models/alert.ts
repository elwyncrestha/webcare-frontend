export enum AlertType {
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info',
    WARNING = 'warning',
    PRIMARY = 'primary',
}

export class Alert {
    constructor(readonly type: AlertType, readonly message: string) {
    }
}
