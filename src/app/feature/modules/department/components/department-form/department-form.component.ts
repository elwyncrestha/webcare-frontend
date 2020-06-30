import { Component, OnInit, Input } from '@angular/core';
import { Department } from 'src/app/@core/models/department/department.model';
import { Action } from 'src/app/@theme/models/action.enum';
import { EnumUtils, ObjectUtils } from 'src/app/@core/utils';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { DepartmentService } from 'src/app/@core/services/department/department.service';
import { ToastService } from 'src/app/@theme/services/toast.service';
import { Alert, AlertType } from 'src/app/@theme/models/alert';
import { DialogResponse, DialogResponseType } from 'src/app/@theme/models/dialog-response';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent implements OnInit {
  @Input() public model: Department;
  @Input() public action: Action;
  public spinner = false;
  public form: FormGroup;
  public EnumUtils = EnumUtils;
  public Action = Action;
  constructor(
    public nbDialogRef: NbDialogRef<DepartmentFormComponent>,
    private formBuilder: FormBuilder,
    private userService: DepartmentService,
    private toastService: ToastService,
  ) { }

  get name() {
    return this.form.get('name');
  }

  ngOnInit(): void {
    this.buildForm();
  }

  public submit(): void {
    this.spinner = true;
    this.model = this.form.value as Department;
    this.userService.save(this.model).subscribe((response: any) => {
      this.toastService.show(new Alert(AlertType.SUCCESS, `Department ${this.action.toLowerCase()} successful`));
      this.spinner = false;
      this.nbDialogRef.close(new DialogResponse(DialogResponseType.SUCCESS, response));
    }, error => {
      console.error(error);
      this.toastService.show(new Alert(AlertType.ERROR, `Failed to ${this.action.toLowerCase()} department`));
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
      ]
    });
  }

}
