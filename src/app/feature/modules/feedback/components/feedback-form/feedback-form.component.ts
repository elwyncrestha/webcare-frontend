import { Component, OnInit, Optional } from '@angular/core';
import { Feedback } from 'src/app/@core/models/feedback/feedback.model';
import { Action } from 'src/app/@theme/models/action.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EnumUtils, ObjectUtils } from 'src/app/@core/utils';
import { NbDialogRef } from '@nebular/theme';
import { FeedbackService } from 'src/app/@core/services/feedback/feedback.service';
import { ToastService } from 'src/app/@theme/services/toast.service';
import { Router } from '@angular/router';
import { Alert, AlertType } from 'src/app/@theme/models/alert';
import {
  DialogResponse,
  DialogResponseType,
} from 'src/app/@theme/models/dialog-response';
import { PatternConstant } from 'src/app/@core/constants';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss'],
})
export class FeedbackFormComponent implements OnInit {
  public model: Feedback;
  action: Action = Action.CREATE;
  public spinner = false;
  public form: FormGroup;
  public EnumUtils = EnumUtils;
  public Action = Action;
  @Optional() public nbDialogRef: NbDialogRef<FeedbackFormComponent>;

  constructor(
    private formBuilder: FormBuilder,
    private feedbackService: FeedbackService,
    private toastService: ToastService,
    private router: Router
  ) {}

  get fullName() {
    return this.form.get('fullName');
  }

  get phoneNo() {
    return this.form.get('phoneNo');
  }

  get email() {
    return this.form.get('email');
  }

  get message() {
    return this.form.get('message');
  }

  ngOnInit(): void {
    this.buildForm();
  }

  public submit(): void {
    this.spinner = true;
    this.feedbackService.saveUnauthenticated(this.form.value).subscribe(
      (response: any) => {
        this.toastService.show(
          new Alert(
            AlertType.SUCCESS,
            `Your feedback has been ${this.action.toLowerCase()} successful`
          )
        );
        this.spinner = false;
        if (this.action === Action.CREATE) {
          setTimeout(() => this.router.navigate(['/login']), 500);
        } else {
          this.nbDialogRef.close(
            new DialogResponse(DialogResponseType.SUCCESS, response)
          );
        }
      },
      (error) => {
        console.error(error);
        this.toastService.show(
          new Alert(AlertType.ERROR, `Failed to submit feedback`)
        );
        this.spinner = false;
      }
    );
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      fullName: [
        ObjectUtils.setUndefinedIfNull(this.model?.fullName),
        [Validators.required],
      ],
      phoneNo: [
        ObjectUtils.setUndefinedIfNull(this.model?.phoneNo),
        [Validators.required, Validators.pattern(PatternConstant.NUMBER_ONLY)],
      ],
      email: [
        ObjectUtils.setUndefinedIfNull(this.model?.email),
        [Validators.required, Validators.email],
      ],
      message: [
        ObjectUtils.setUndefinedIfNull(this.model?.message),
        [Validators.required],
      ],
    });
  }
}
