import { Component, OnInit, Input, Optional } from '@angular/core';
import { HelpDesk } from 'src/app/@core/models/help-desk/help-desk.model';
import { Action } from 'src/app/@theme/models/action.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EnumUtils, ObjectUtils } from 'src/app/@core/utils';
import { HelpDeskService } from 'src/app/@core/services/help-desk/help-desk.service';
import { ToastService } from 'src/app/@theme/services/toast.service';
import { Router } from '@angular/router';
import { Alert, AlertType } from 'src/app/@theme/models/alert';
import {
  DialogResponse,
  DialogResponseType,
} from 'src/app/@theme/models/dialog-response';
import { NbDialogRef } from '@nebular/theme';
import { PatternConstant } from 'src/app/@core/constants';

@Component({
  selector: 'app-help-desk',
  templateUrl: './help-desk.component.html',
  styleUrls: ['./help-desk.component.scss'],
})
export class HelpDeskComponent implements OnInit {
  public model: HelpDesk;
  action: Action = Action.CREATE;
  public spinner = false;
  public form: FormGroup;
  public EnumUtils = EnumUtils;
  public Action = Action;
  @Optional() public nbDialogRef: NbDialogRef<HelpDeskComponent>;

  constructor(
    private formBuilder: FormBuilder,
    private helpDeskService: HelpDeskService,
    private toastService: ToastService,
    private router: Router
  ) {}

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

  ngOnInit(): void {
    this.buildForm();
  }

  public submit(): void {
    this.spinner = true;
    this.helpDeskService.saveUnauthenticated(this.form.value).subscribe(
      (response: any) => {
        this.toastService.show(
          new Alert(
            AlertType.SUCCESS,
            `Your question has been ${this.action.toLowerCase()} successful`
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
          new Alert(AlertType.ERROR, `Failed to create query`)
        );
        this.spinner = false;
      }
    );
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: [
        ObjectUtils.setUndefinedIfNull(this.model?.name),
        [Validators.required],
      ],
      contactNumber: [
        ObjectUtils.setUndefinedIfNull(this.model?.contactNumber),
        [Validators.required, Validators.pattern(PatternConstant.NUMBER_ONLY)],
      ],
      email: [
        ObjectUtils.setUndefinedIfNull(this.model?.email),
        [Validators.required, Validators.email],
      ],
      query: [
        ObjectUtils.setUndefinedIfNull(this.model?.query),
        [Validators.required],
      ],
    });
  }
}
