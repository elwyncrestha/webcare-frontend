import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/@core/models/department/department.model';
import { Pageable } from 'src/app/@core/models';
import { ToastService } from 'src/app/@theme/services/toast.service';
import { Alert, AlertType } from 'src/app/@theme/models/alert';
import { FormGroup, FormBuilder} from '@angular/forms';
import { DepartmentService } from 'src/app/@core/services/department/department.service';
import { PaginationUtils, ObjectUtils } from 'src/app/@core/utils';
import { NbDialogService } from '@nebular/theme';
import { Action } from 'src/app/@theme/models/action.enum';
import { DialogUtils } from 'src/app/@core/utils/dialog/dialog.utils';
import { DepartmentFormComponent } from '../department-form/department-form.component';
import { AppConstant } from 'src/app/@core/constants';
import { TwoButtonConfirmComponent } from 'src/app/@theme/components';
import { DialogResponse, DialogResponseType } from 'src/app/@theme/models/dialog-response';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  public isFilterCollapsed = true;
  public isAddCollapsed = true;
  public filterForm: FormGroup;
  public departmentList: Department[];
  public pageable: Pageable = new Pageable();
  public page = 1;
  public spinner = false;
  private search = {
    name: undefined
  };

  constructor(
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService,
    private toastService: ToastService,
    private dialogService: NbDialogService) {
     }

  private static loadData(component: DepartmentComponent) {
    component.spinner = true;
    component.departmentService.getPaginationWithSearchObject(component.search, component.page)
    .subscribe((response: any) => {
      component.departmentList = response.detail.content;
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
    DepartmentComponent.loadData(this);
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

  public add(): void {
    const dialogRef = this.dialogService.open(DepartmentFormComponent, {
      context: {
        model: new Department(),
        action: Action.ADD
      }
    });
    DialogUtils.resolve(dialogRef, DepartmentComponent.loadData, this);
  }

  public edit(department: Department): void {
    const dialogRef = this.dialogService.open(DepartmentFormComponent, {
      context: {
        model: department,
        action: Action.UPDATE
      }
    });
    DialogUtils.resolve(dialogRef, DepartmentComponent.loadData, this);
  }

  public delete(department: Department): void {
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
          this.departmentService.delete(department?.id).subscribe(() => {
            this.toastService.show(new Alert(AlertType.SUCCESS, 'Successfully deleted the department'));
            DepartmentComponent.loadData(this);
          }, error => {
            console.error(error);
            this.toastService.show(new Alert(AlertType.ERROR, 'Failed to delete the department'));
          });
        } else if (response.type === DialogResponseType.DISMISS) {
          console.log(`Modal closed with message: ${response.message}`);
        }
      }
    });
  }

  public onSearch(): void {
    this.search.name = ObjectUtils.setUndefinedIfNull(this.filterForm.get('name').value);
    DepartmentComponent.loadData(this);
  }

  public clearSearch(): void {
    this.buildForm();
    this.onSearch();
    this.isFilterCollapsed = true;
  }

  public changePage(page: number) {
    this.page = page;
    DepartmentComponent.loadData(this);
  }
}
