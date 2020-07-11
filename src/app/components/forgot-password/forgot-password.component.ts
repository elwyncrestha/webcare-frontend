import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ObjectUtils } from 'src/app/@core/utils';
import { UserService } from 'src/app/@core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public form: FormGroup;
  public message: {
    content: string;
    type: 'danger' | 'info';
  };
  public spinner = false;
  public ObjectUtils = ObjectUtils;
  public matchToken: number;

  get userId() {
    return this.form.get('userId');
  }

  get email() {
    return this.form.get('email');
  }

  get newPassword() {
    return this.form.get('newPassword');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  get token() {
    return this.form.get('token');
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  public verify() {
    this.spinner = true;
    this.userService.verifyResetPassword(this.form.value).subscribe(
      (response: any) => {
        this.form.patchValue(response.detail);
        // remove token from the form
        this.matchToken = this.token.value;
        this.token.setValue(undefined);
        // update validators
        this.token.setValidators([Validators.required]);
        this.newPassword.setValidators([Validators.required]);
        this.confirmPassword.setValidators([Validators.required]);
        this.message = {
          type: 'info',
          content: 'Check email for the token',
        };
        this.spinner = false;
      },
      (error) => {
        console.error(error);
        this.message = {
          type: 'danger',
          content: 'User not found',
        };
        this.spinner = false;
      }
    );
  }

  public submit() {
    if (this.matchToken !== this.token.value) {
      this.message = {
        type: 'danger',
        content: 'Token did not match',
      };
      return;
    }
    this.spinner = true;
    this.userService.resetPassword(this.form.value).subscribe(
      () => {
        this.spinner = false;
        this.form.reset();
        this.message = {
          type: 'info',
          content: 'Password reset successful',
        };
        setTimeout(() => this.router.navigate(['/login']), 1000);
      },
      (error) => {
        console.error(error);
        this.message = {
          type: 'danger',
          content: 'Failed to reset password',
        };
        this.spinner = false;
      }
    );
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      userId: [undefined],
      email: [undefined, [Validators.required, Validators.email]],
      newPassword: [undefined],
      confirmPassword: [undefined],
      token: [undefined],
    });
  }
}
