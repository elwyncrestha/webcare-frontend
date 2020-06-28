import { NbDialogRef } from '@nebular/theme';
import { DialogResponse, DialogResponseType } from 'src/app/@theme/models/dialog-response';

export class DialogUtils {
    public static resolve(dialogRef: NbDialogRef<any>, callback: (obj: any) => void, obj: any): void {
        dialogRef.onClose.subscribe((response: DialogResponse) => {
            if (response) {
                if (response.type === DialogResponseType.SUCCESS) {
                    callback(obj);
                } else if (response.type === DialogResponseType.ERROR) {
                    console.error(`Modal closed with error: ${response.message}`);
                } else if (response.type === DialogResponseType.DISMISS) {
                    console.log(`Modal closed with message: ${response.message}`);
                } else {
                    console.log(`Modal closed with message: ${response}`);
                }
            } else {
                console.log('Modal escaped!!!');
            }
        });
    }
}
