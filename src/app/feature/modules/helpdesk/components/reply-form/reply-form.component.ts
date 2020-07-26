import { Component, OnInit, Input, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EnumUtils, ObjectUtils } from 'src/app/@core/utils';
import { ToastService } from 'src/app/@theme/services/toast.service';
import { HelpDesk } from 'src/app/@core/models';
import { Action } from 'src/app/@theme/models/action.enum';
import { NbDialogRef } from '@nebular/theme';
import { HelpDeskService } from 'src/app/@core/services/help-desk/help-desk.service';
import { Alert, AlertType } from 'src/app/@theme/models/alert';
import {
  DialogResponse,
  DialogResponseType,
} from 'src/app/@theme/models/dialog-response';

@Component({
  selector: 'app-reply-form',
  templateUrl: './reply-form.component.html',
  styleUrls: ['./reply-form.component.scss'],
})
export class ReplyFormComponent implements OnInit {
  @Input() public model: HelpDesk;
  @Input() public verified = false;
  @Input() action: Action = Action.CREATE;
  public spinner = false;
  public form: FormGroup;
  public EnumUtils = EnumUtils;
  public Action = Action;

  constructor(
    private formBuilder: FormBuilder,
    private helpDeskService: HelpDeskService,
    private toastService: ToastService,
    @Optional() public nbDialogRef: NbDialogRef<ReplyFormComponent>
  ) {}

  get id() {
    return this.form.get('id');
  }
  get name() {
    return this.form.get('name');
  }
  get contactNumber() {
    return this.form.get('contactNumber');
  }
  get email() {
    return this.form.get('email');
  }
  get query() {
    return this.form.get('query');
  }
  get reply() {
    return this.form.get('reply');
  }

  ngOnInit(): void {
    this.buildForm();
  }

  public submit(): void {
    this.spinner = true;
    this.model = this.form.value as HelpDesk;
    this.helpDeskService.replyQuery(this.model).subscribe(
      (response: any) => {
        this.toastService.show(
          new Alert(
            AlertType.SUCCESS,
            `Query ${this.action.toLowerCase()} successful`
          )
        );
        this.spinner = false;
        this.nbDialogRef.close(
          new DialogResponse(DialogResponseType.SUCCESS, response)
        );
      },
      (error) => {
        console.error(error);
        this.toastService.show(
          new Alert(
            AlertType.ERROR,
            `Failed to ${this.action.toLowerCase()} query`
          )
        );
        this.spinner = false;
        this.nbDialogRef.close(
          new DialogResponse(DialogResponseType.ERROR, error)
        );
      }
    );
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      id: [ObjectUtils.setUndefinedIfNull(this.model?.id)],
      version: [ObjectUtils.setUndefinedIfNull(this.model?.version)],
      name: [ObjectUtils.setUndefinedIfNull(this.model?.name)],
      contactNumber: [
        ObjectUtils.setUndefinedIfNull(this.model?.contactNumber),
      ],
      email: [
        ObjectUtils.setUndefinedIfNull(this.model?.email),
        [Validators.required, Validators.email],
      ],
      query: [ObjectUtils.setUndefinedIfNull(this.model?.query)],
      reply: [
        ObjectUtils.setUndefinedIfNull(this.model?.reply),
        [Validators.required],
      ],
    });
  }
}
