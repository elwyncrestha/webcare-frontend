import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { UserService } from 'src/app/@core/services';
import { ToastService } from 'src/app/@theme/services/toast.service';
import { Alert, AlertType } from 'src/app/@theme/models/alert';
import { DialogResponse, DialogResponseType } from 'src/app/@theme/models/dialog-response';
import { LocalStorageUtils } from 'src/app/@core/utils';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  spinner = false;
  errorMessage: string;

  constructor(
    public nbDialogRef: NbDialogRef<ChangePasswordComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastService: ToastService,
  ) {
  }

  get oldPassword() {
    return this.form.get('oldPassword');
  }

  get newPassword() {
    return this.form.get('newPassword');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      userId: [LocalStorageUtils.getStorage().userId, Validators.required],
      oldPassword: [undefined, Validators.required],
      newPassword: [undefined, Validators.required],
      confirmPassword: [undefined, Validators.required],
    });
  }

  submit(): void {
    this.spinner = true;
    this.userService.changePassword(this.form.value).subscribe(() => {
      this.toastService.show(new Alert(AlertType.SUCCESS, 'Successfully changed password!!!'));
      this.spinner = false;
      this.nbDialogRef.close(new DialogResponse(DialogResponseType.SUCCESS, 'Successfully changed password!!!'));
    }, error => {
      console.error(error);
      this.errorMessage = error.error.message;
      this.toastService.show(new Alert(AlertType.ERROR, 'Failed to change password!!!'));
      this.spinner = false;
    });
  }

}
