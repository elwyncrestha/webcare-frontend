export enum DialogResponseType {
    SUCCESS = 'Success',
    ERROR = 'Error',
    DISMISS = 'Dismiss',
}

export class DialogResponse {
    type: DialogResponseType;
    message: any;

    constructor(type: DialogResponseType, message: any) {
        this.type = type;
        this.message = message;
    }
}
