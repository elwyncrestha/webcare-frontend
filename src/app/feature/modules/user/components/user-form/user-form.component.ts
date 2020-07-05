import { Component, OnInit, Input } from '@angular/core';
import { User, Pageable } from 'src/app/@core/models';
import { Action } from 'src/app/@theme/models/action.enum';
import { NbDialogRef } from '@nebular/theme';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ObjectUtils, EnumUtils } from 'src/app/@core/utils';
import { UserType, Gender } from 'src/app/@core/enums';
import { UserService } from 'src/app/@core/services';
import { Alert, AlertType } from 'src/app/@theme/models/alert';
import { ToastService } from 'src/app/@theme/services/toast.service';
import { DialogResponse, DialogResponseType } from 'src/app/@theme/models/dialog-response';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() public model: User;
  @Input() public action: Action;
  public spinner = false;
  public form: FormGroup;
  public UserType = UserType;
  public EnumUtils = EnumUtils;
  public Action = Action;
  public genderPairs = EnumUtils.pairs(Gender);
  pattern = '^((\\+91-?)|0)?[0-9]{10}$';

  constructor(
    public nbDialogRef: NbDialogRef<UserFormComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastService: ToastService,
  ) { }

  get name() {
    return this.form.get('name');
  }

  get username() {
    return this.form.get('username');
  }

  get email() {
    return this.form.get('email');
  }

  get userType() {
    return this.form.get('userType');
  }

  get address() {
    return this.form.get('address');
  }

  get contactNumber() {
    return this.form.get('contactNumber');
  }

  get gender() {
    return this.form.get('gender');
  }

  ngOnInit(): void {
    this.buildForm();
  }

  public submit(): void {
    this.spinner = true;
    this.model = this.form.value as User;
    this.userService.save(this.model).subscribe((response: any) => {
      this.toastService.show(new Alert(AlertType.SUCCESS, `User ${this.action.toLowerCase()} successful`));
      this.spinner = false;
      this.nbDialogRef.close(new DialogResponse(DialogResponseType.SUCCESS, response));
    }, error => {
      console.error(error);
      this.toastService.show(new Alert(AlertType.ERROR, `Failed to ${this.action.toLowerCase()} user`));
      this.spinner = false;
      this.nbDialogRef.close(new DialogResponse(DialogResponseType.ERROR, error));
    });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      id: [ObjectUtils.setUndefinedIfNull(this.model.id)],
      version: [ObjectUtils.setUndefinedIfNull(this.model.version)],
      name: [
        ObjectUtils.setUndefinedIfNull(this.model.name),
        [Validators.required]
      ],
      email: [
        ObjectUtils.setUndefinedIfNull(this.model.email),
        [Validators.required, Validators.email]
      ],
      status: [
        ObjectUtils.setUndefinedIfNull(this.model.status),
        (this.action === Action.UPDATE) ? [Validators.required] : []
      ],
      userType: [
        ObjectUtils.setUndefinedIfNull(this.model.userType),
        [Validators.required]
      ],
      username: [
        ObjectUtils.setUndefinedIfNull(this.model.username),
        [Validators.required]
      ],
      address: [
        ObjectUtils.setUndefinedIfNull(this.model.address),
        [Validators.required]
      ],
      contactNumber: [
        ObjectUtils.setUndefinedIfNull(this.model.contactNumber),
        [Validators.required, Validators.pattern(this.pattern)]
      ],
      gender: [
        ObjectUtils.setUndefinedIfNull(this.model.gender),
        [Validators.required]
      ],
    });
  }

}
