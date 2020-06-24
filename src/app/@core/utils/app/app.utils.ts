import { HttpHeaders } from '@angular/common/http';
import { LocalStorageUtils } from '../storage/local-storage.utils'; // do not shorten
import { environment } from '../../../../environments/environment';

export class AppUtils {

    public static getRequest(api: string) {
        const fullApi = `${environment.URL}/${api}`;
        const at = LocalStorageUtils.getStorage().at;

        return {
            url: fullApi,
            header: new HttpHeaders({
                Authorization: 'Bearer ' + at,
                'Content-Type': 'application/json'
            })
        };
    }

    public static getRequestWithFileSupport(api: string) {
        const fullApi = `${environment.URL}/${api}`;
        const at = LocalStorageUtils.getStorage().at;
        return {
            url: fullApi,
            header: new HttpHeaders({
                Authorization: 'Bearer ' + at,
                enctype: 'multipart/form-data'
            })
        };
    }
}
