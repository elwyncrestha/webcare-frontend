import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppointmentService } from 'src/app/@core/services/appointment/appointment.service';
import { ToastService } from 'src/app/@theme/services/toast.service';
import { NbDialogService } from '@nebular/theme';
import { Alert, AlertType } from 'src/app/@theme/models/alert';
import { Appointment, Pageable } from 'src/app/@core/models';
import { PaginationUtils, ObjectUtils } from 'src/app/@core/utils';
import { DialogResponseType, DialogResponse } from 'src/app/@theme/models/dialog-response';
import { AppConstant } from 'src/app/@core/constants';
import { TwoButtonConfirmComponent } from 'src/app/@theme/components';


@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {

  public isFilterCollapsed = true;
  public isAddCollapsed = true;
  public filterForm: FormGroup;
  public appointmentList: Appointment[];
  public pageable: Pageable = new Pageable();
  public page = 1;
  public spinner = false;
  private search = {
    name: undefined
  };

  constructor(
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
    private toastService: ToastService,
    private dialogService: NbDialogService
  ) { }  
  private static loadData(component: AppointmentListComponent) {
    component.spinner = true;
    component.appointmentService.getPaginationWithSearchObject(component.search, component.page)
    .subscribe((response: any) => {
      component.appointmentList = response.detail.content;
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
    AppointmentListComponent.loadData(this);
  }

  public addClear(): void {
    this.buildForm();
    this.onSearch();
    this.isAddCollapsed = true;
  }

  private buildForm(): void {
    this.filterForm = this.formBuilder.group({
      name: [undefined]
    });
  }

  public delete(appointment: Appointment): void {
    const dialogRef = this.dialogService.open(TwoButtonConfirmComponent, {
      context: {
        headerText: AppConstant.DEPARTMENT_DELETE_CONFIRMATION,
        btnOneText: AppConstant.YES,
        btnTwoText: AppConstant.NO,
      }
    });
    dialogRef.onClose.subscribe((response: DialogResponse) => {
      if (response) {
        if (response.type === DialogResponseType.SUCCESS) {
          this.appointmentService.delete(appointment?.id).subscribe(() => {
            this.toastService.show(new Alert(AlertType.SUCCESS, 'Appointment deleted successfully'));
            AppointmentListComponent.loadData(this);
          }, error => {
            console.error(error);
            this.toastService.show(new Alert(AlertType.ERROR, 'Failed to delete appointment'));
          });
        } else if (response.type === DialogResponseType.DISMISS) {
          console.log(`Modal closed with message: ${response.message}`);
        }
      }
    });
  }

  public onSearch(): void {
    this.search.name = ObjectUtils.setUndefinedIfNull(this.filterForm.get('name').value);
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

}
