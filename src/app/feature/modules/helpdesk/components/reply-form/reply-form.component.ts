import { Component, OnInit, Input, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EnumUtils, ObjectUtils } from 'src/app/@core/utils';
import { ToastService } from 'src/app/@theme/services/toast.service';
import { HelpDesk } from 'src/app/@core/models';
import { Action } from 'src/app/@theme/models/action.enum';
import { query } from '@angular/animations';
import { NbDialogRef } from '@nebular/theme';
import { HelpDeskService } from 'src/app/@core/services/help-desk/help-desk.service';
import { Router } from '@angular/router';

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
    private router: Router,
    @Optional() public nbDialogRef: NbDialogRef<ReplyFormComponent>
  ) {}

  get id() {
    return this.form.get('id');
  }

  get email() {
    return this.form.get('email');
  }

  get reply() {
    return this.form.get('reply');
  }

  ngOnInit(): void {
    this.buildForm();
  }

  public replyQuery() {}

  private buildForm(): void {
    this.form = this.formBuilder.group({
      id: [ObjectUtils.setUndefinedIfNull(this.model?.id)],
      version: [ObjectUtils.setUndefinedIfNull(this.model?.version)],
      email: [
        ObjectUtils.setUndefinedIfNull(this.model?.email),
        [Validators.required, Validators.email],
      ],
      reply: [
        ObjectUtils.setUndefinedIfNull(this.model?.reply),
        [Validators.required],
      ],
    });
  }
}
