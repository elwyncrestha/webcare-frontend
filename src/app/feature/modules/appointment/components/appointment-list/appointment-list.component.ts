import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppointmentService } from 'src/app/@core/services/appointment/appointment.service';
import { ToastService } from 'src/app/@theme/services/toast.service';
import { NbDialogService } from '@nebular/theme';
import { Alert, AlertType } from 'src/app/@theme/models/alert';
import { Appointment, Pageable } from 'src/app/@core/models';
import { PaginationUtils, ObjectUtils, EnumUtils } from 'src/app/@core/utils';
import { AppConstant } from 'src/app/@core/constants';
import { TwoButtonConfirmComponent } from 'src/app/@theme/components';
import { Gender, AppointmentStatus } from 'src/app/@core/enums';
import { AppointmentComponent } from '../appointment/appointment.component';
import { DialogUtils } from 'src/app/@core/utils/dialog/dialog.utils';
import { Action } from 'src/app/@theme/models/action.enum';
import {
  DialogResponse,
  DialogResponseType,
} from 'src/app/@theme/models/dialog-response';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss'],
})
export class AppointmentListComponent implements OnInit {
  public isFilterCollapsed = true;
  public filterForm: FormGroup;
  public appointmentList: Appointment[];
  public pageable: Pageable = new Pageable();
  public page = 1;
  public spinner = false;
  public Gender = Gender;
  public AppointmentStatus = AppointmentStatus;
  public EnumUtils = EnumUtils;
  private search = {
    name: undefined,
  };

  constructor(
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
    private toastService: ToastService,
    private dialogService: NbDialogService
  ) {}

  private static loadData(component: AppointmentListComponent) {
    component.spinner = true;
    component.appointmentService
      .getPaginationWithSearchObject(component.search, component.page)
      .subscribe(
        (response: any) => {
          component.appointmentList = response.detail.content;
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
    AppointmentListComponent.loadData(this);
  }

  public edit(appointment: Appointment): void {
    const dialogRef = this.dialogService.open(AppointmentComponent, {
      context: {
        model: appointment,
        verified: true,
        action: Action.UPDATE,
      },
    });
    DialogUtils.resolve(dialogRef, AppointmentListComponent.loadData, this);
  }

  public onSearch(): void {
    this.search.name = ObjectUtils.setUndefinedIfNull(
      this.filterForm.get('name').value
    );
    AppointmentListComponent.loadData(this);
  }

  public clearSearch(): void {
    this.buildForm();
    this.onSearch();
    this.isFilterCollapsed = true;
  }

  public changePage(page: number) {
    this.page = page;
    AppointmentListComponent.loadData(this);
  }

  public confirmAppointment(id: number, status: AppointmentStatus) {
    const headerText =
      status === AppointmentStatus.APPROVED
        ? AppConstant.APPOINTMENT_APPROVE_CONFIRMATION
        : AppConstant.APPOINTMENT_REJECT_CONFIRMATION;
    const dialogRef = this.dialogService.open(TwoButtonConfirmComponent, {
      context: {
        headerText,
        btnOneText: AppConstant.YES,
        btnTwoText: AppConstant.NO,
      },
    });
    dialogRef.onClose.subscribe((response: DialogResponse) => {
      if (response) {
        if (response.type === DialogResponseType.SUCCESS) {
          this.appointmentService
            .confirmAppointment(
              id,
              EnumUtils.getEnum(AppointmentStatus, status)
            )
            .subscribe(
              () => {
                this.toastService.show(
                  new Alert(
                    AlertType.SUCCESS,
                    `Successfully ${status.toLowerCase()} the appointment`
                  )
                );
                AppointmentListComponent.loadData(this);
              },
              (error) => {
                console.error(error);
                this.toastService.show(
                  new Alert(
                    AlertType.ERROR,
                    `Failed to ${status
                      .toLowerCase()
                      .substring(0, status.length - 1)} the appointment`
                  )
                );
              }
            );
        } else if (response.type === DialogResponseType.DISMISS) {
          console.log(`Modal closed with message: ${response.message}`);
        }
      }
    });
  }

  private buildForm(): void {
    this.filterForm = this.formBuilder.group({
      name: [undefined],
    });
  }
}
