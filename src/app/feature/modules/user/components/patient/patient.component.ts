import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Patient, Pageable } from 'src/app/@core/models';
import { UserType, Status } from 'src/app/@core/enums';
import { UserService, PatientService } from 'src/app/@core/services';
import { ToastService } from 'src/app/@theme/services/toast.service';
import { NbDialogService, NbToggleComponent } from '@nebular/theme';
import { PaginationUtils, EnumUtils, ObjectUtils } from 'src/app/@core/utils';
import { Alert, AlertType } from 'src/app/@theme/models/alert';
import { Action } from 'src/app/@theme/models/action.enum';
import { DialogUtils } from 'src/app/@core/utils/dialog/dialog.utils';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
})
export class PatientComponent implements OnInit {
  public isFilterCollapsed = true;
  public filterForm: FormGroup;
  public patientList: Patient[];
  public pageable: Pageable = new Pageable();
  public page = 1;
  public spinner = false;
  public UserType = UserType;
  public Status = Status;
  private search = {
    'user.name': undefined,
  };

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastService: ToastService,
    private dialogService: NbDialogService,
    private patientService: PatientService
  ) {}

  private static loadData(component: PatientComponent) {
    component.spinner = true;
    component.patientService
      .getPaginationWithSearchObject(component.search, component.page)
      .subscribe(
        (response: any) => {
          component.patientList = response.detail.content;
          component.pageable = PaginationUtils.getPageable(response.detail);
          component.spinner = false;
        },
        (error) => {
          console.error(error);
          component.toastService.show(
            new Alert(AlertType.ERROR, 'Unable to load data!')
          );
          component.spinner = false;
        }
      );
  }

  ngOnInit(): void {
    this.buildForm();
    PatientComponent.loadData(this);
  }

  private buildForm(): void {
    this.filterForm = this.formBuilder.group({
      name: [undefined],
    });
  }

  public edit(patient: Patient): void {
    // TODO Integrate PatientFormComponent
    /* const dialogRef = this.dialogService.open(PatientFormComponent, {
      context: {
        model: patient,
        action: Action.UPDATE
      }
    });
    DialogUtils.resolve(dialogRef, PatientComponent.loadData, this); */
  }

  public onSearch(): void {
    this.search['user.name'] = ObjectUtils.setUndefinedIfNull(
      this.filterForm.get('name').value
    );
    PatientComponent.loadData(this);
  }

  public clearSearch(): void {
    this.buildForm();
    this.onSearch();
    this.isFilterCollapsed = true;
  }

  public changePage(page: number) {
    this.page = page;
    PatientComponent.loadData(this);
  }

  public statusChange(patient: Patient, value: NbToggleComponent): void {
    patient.user.status = EnumUtils.getEnum(
      Status,
      value.checked ? Status.ACTIVE : Status.INACTIVE
    );
    this.userService
      .changeStatus(patient.user.id, patient.user.status)
      .subscribe(
        () => {
          this.toastService.show(
            new Alert(AlertType.SUCCESS, 'Successfully updated status!!!')
          );
        },
        (error) => {
          console.error(error);
          this.toastService.show(
            new Alert(AlertType.ERROR, 'Could not update status!!!')
          );
        }
      );
  }
}
