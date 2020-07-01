import { Component, OnInit, Input } from '@angular/core';
import { Doctor } from 'src/app/@core/models';
import { Action } from 'src/app/@theme/models/action.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { DoctorService, UserService } from 'src/app/@core/services';
import { ToastService } from 'src/app/@theme/services/toast.service';
import { Department } from 'src/app/@core/models/department/department.model';
import { ObjectUtils, EnumUtils } from 'src/app/@core/utils';
import { Alert, AlertType } from 'src/app/@theme/models/alert';
import { Gender } from 'src/app/@core/enums';
import { DialogResponse, DialogResponseType } from 'src/app/@theme/models/dialog-response';
import { DepartmentService } from 'src/app/@core/services/department/department.service';

@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.scss']
})
export class DoctorFormComponent implements OnInit {
  @Input() public model: Doctor;
  @Input() public action: Action;
  public spinner = false;
  public form: FormGroup;
  public EnumUtils = EnumUtils;
  public Action = Action;
  public genderPairs = EnumUtils.pairs(Gender);
  public departmentList: Department[] = [];

  constructor(
    public nbDialogRef: NbDialogRef<DoctorFormComponent>,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private doctorService: DoctorService,
    private departmentService: DepartmentService,
  ) { }

  get specializationField() {
    return this.form.get('specializationField');
  }

  get department() {
    return this.form.get('department');
  }

  ngOnInit(): void {
    this.buildForm();
    this.departmentService.getAll().subscribe((response) => {
      this.departmentList = response.detail;
    }, error => {
      console.error(error);
      this.toastService.show(new Alert(AlertType.ERROR, 'Failed to load departments'));
    });
  }

  public submit(): void {
    this.spinner = true;
    this.model = this.form.value as Doctor;
    this.model.department = { id: this.department.value };
    this.doctorService.save(this.model).subscribe((response: any) => {
      this.toastService.show(new Alert(AlertType.SUCCESS, `Doctor ${this.action.toLowerCase()} successful`));
      this.spinner = false;
      this.nbDialogRef.close(new DialogResponse(DialogResponseType.SUCCESS, response));
    }, error => {
      console.error(error);
      this.toastService.show(new Alert(AlertType.ERROR, `Failed to ${this.action.toLowerCase()} doctor`));
      this.spinner = false;
      this.nbDialogRef.close(new DialogResponse(DialogResponseType.ERROR, error));
    });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      id: [ObjectUtils.setUndefinedIfNull(this.model.id)],
      version: [ObjectUtils.setUndefinedIfNull(this.model.version)],
      department: [
        ObjectUtils.setUndefinedIfNull(this.model?.department?.id),
        [Validators.required]
      ],
      specializationField: [
        ObjectUtils.setUndefinedIfNull(this.model.specializationField),
        [Validators.required]
      ],
      user: [
        ObjectUtils.setUndefinedIfNull(this.model.user),
        [Validators.required]
      ],
    });
  }

}
