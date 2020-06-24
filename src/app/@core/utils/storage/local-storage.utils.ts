import { CryptoJsUtils } from '../encryption/crypto-js.utils'; // do not shorten
import { ObjectUtils } from '../app/object.utils'; // do not shorten
import { environment } from '../../../../environments/environment';


export class LocalStorageUtils {
    /**
     * @description
     * Get an instance of LocalStorage.
     */
    public static getStorage(): LocalStorage {
        return ObjectUtils.isEmpty(localStorage.getItem(environment.LOCAL_STORAGE_NAME)) ?
            new LocalStorage() :
            JSON.parse(CryptoJsUtils.decrypt(localStorage.getItem(environment.LOCAL_STORAGE_NAME)));
    }

    /**
     * @param data A local storage instance to save.
     *
     * @description
     * Make sure you use LocalStorageUtils.getStorage() method before
     * to get instance of LocalStorage. Edit the instance and use
     * LocalStorageUtils.setStorage() to set in the browser's localStorage.
     */
    public static setStorage(data: LocalStorage): void {
        localStorage.setItem(environment.LOCAL_STORAGE_NAME, CryptoJsUtils.encrypt(JSON.stringify(data)));
    }

    /**
     * @description
     * Passes empty JSON to clear the storage.
     */
    public static clearStorage(): void {
        LocalStorageUtils.setStorage(new LocalStorage());
    }

}

export class LocalStorage {
    at: string;
    rt: string;
    ty: string;
    et: string;
    userId: string;
    username: string;
    userFullName: string;
    userType: string;
}
