import { AbstractControl } from '@angular/forms';

export class DateValidator {
    /**
     * Validate if the date is past date or not.
     * @param control An AbstractControl or other specialized controls.
     */
    static pastDate(control: AbstractControl): { [key: string]: boolean } | null {
        const value = control.value;
        const date = new Date(value);
        if (date > new Date()) {
            return { pastDate: value };
        }
        return null;
    }

    /**
     * Validate if the date if future date or not.
     * @param control An AbstractControl or other specialized controls.
     */
    static futureDate(control: AbstractControl): { [key: string]: boolean } | null {
        const value = control.value;
        const date = new Date(value);
        if (date < new Date()) {
            return { futureDate: value };
        }
        return null;
    }
}

