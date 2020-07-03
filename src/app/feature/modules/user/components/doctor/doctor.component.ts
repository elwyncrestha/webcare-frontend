import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Doctor } from 'src/app/@core/models/doctor/doctor.model';
import { Pageable } from 'src/app/@core/models';
import { UserType, Status } from 'src/app/@core/enums';
import { EnumUtils, PaginationUtils, ObjectUtils } from 'src/app/@core/utils';
import { UserService, DoctorService } from 'src/app/@core/services';
import { ToastService } from 'src/app/@theme/services/toast.service';
import { NbDialogService, NbToggleComponent } from '@nebular/theme';
import { Alert, AlertType } from 'src/app/@theme/models/alert';
import { DoctorFormComponent } from '../doctor-form/doctor-form.component';
import { Action } from 'src/app/@theme/models/action.enum';
import { DialogUtils } from 'src/app/@core/utils/dialog/dialog.utils';
import { DepartmentService } from 'src/app/@core/services/department/department.service';
import { Department } from 'src/app/@core/models/department/department.model';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
  public isFilterCollapsed = true;
  public filterForm: FormGroup;
  public doctorList: Doctor[];
  public pageable: Pageable = new Pageable();
  public page = 1;
  public spinner = false;
  public UserType = UserType;
  public Status = Status;
  public departmentList: Department[] = [];
  private search = {
    'user.name': undefined,
    'department.id': undefined,
  };

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastService: ToastService,
    private dialogService: NbDialogService,
    private doctorService: DoctorService,
    private departmentService: DepartmentService,
  ) { }

  private static loadData(component: DoctorComponent) {
    component.spinner = true;
    component.doctorService.getPaginationWithSearchObject(component.search, component.page).subscribe((response: any) => {
      component.doctorList = response.detail.content;
      component.pageable = PaginationUtils.getPageable(response.detail);
      component.spinner = false;
    }, error => {
      console.error(error);
      component.toastService.show(new Alert(AlertType.ERROR, 'Unable to load data!'));
      component.spinner = false;
    });
  }

  ngOnInit(): void {
    this.buildForm();
    DoctorComponent.loadData(this);
    this.departmentService.getAll().subscribe((response: any) => {
      this.departmentList = response.detail;
    }, error => {
      console.error(error);
      this.toastService.show(new Alert(AlertType.ERROR, 'Unable to departments!'));
    });
  }

  private buildForm(): void {
    this.filterForm = this.formBuilder.group({
      name: [undefined],
      userType: [EnumUtils.getEnum(UserType, UserType.DOCTOR)],
      department: [undefined],
    });
  }

  public edit(doctor: Doctor): void {
    const dialogRef = this.dialogService.open(DoctorFormComponent, {
      context: {
        model: doctor,
        action: Action.UPDATE
      }
    });
    DialogUtils.resolve(dialogRef, DoctorComponent.loadData, this);
  }

  public onSearch(): void {
    this.search['user.name'] = ObjectUtils.setUndefinedIfNull(this.filterForm.get('name').value);
    this.search['department.id'] = ObjectUtils.setUndefinedIfNull(String(this.filterForm.get('department').value));
    DoctorComponent.loadData(this);
  }

  public clearSearch(): void {
    this.buildForm();
    this.onSearch();
    this.isFilterCollapsed = true;
  }

  public changePage(page: number) {
    this.page = page;
    DoctorComponent.loadData(this);
  }

  public statusChange(doctor: Doctor, value: NbToggleComponent): void {
    doctor.user.status = EnumUtils.getEnum(Status, value.checked ? Status.ACTIVE : Status.INACTIVE);
    this.userService.changeStatus(doctor.user.id, doctor.user.status).subscribe(() => {
      this.toastService.show(new Alert(AlertType.SUCCESS, 'Successfully updated status!!!'));
    }, error => {
      console.error(error);
      this.toastService.show(new Alert(AlertType.ERROR, 'Could not update status!!!'));
    });
  }

}
