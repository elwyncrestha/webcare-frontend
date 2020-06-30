import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EnumUtils, PaginationUtils, ObjectUtils } from 'src/app/@core/utils';
import { UserType, Status } from 'src/app/@core/enums';
import { User, Pageable } from 'src/app/@core/models';
import { UserService } from 'src/app/@core/services';
import { ToastService } from 'src/app/@theme/services/toast.service';
import { Alert, AlertType } from 'src/app/@theme/models/alert';
import { NbToggleComponent, NbDialogService } from '@nebular/theme';
import { UserFormComponent } from '../user-form/user-form.component';
import { Action } from 'src/app/@theme/models/action.enum';
import { DialogUtils } from 'src/app/@core/utils/dialog/dialog.utils';
import { TwoButtonConfirmComponent } from 'src/app/@theme/components';
import { AppConstant } from 'src/app/@core/constants';
import { DialogResponse, DialogResponseType } from 'src/app/@theme/models/dialog-response';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public isFilterCollapsed = true;
  public filterForm: FormGroup;
  public userTypePairs = EnumUtils.pairs(UserType);
  public userList: User[];
  public pageable: Pageable = new Pageable();
  public page = 1;
  public spinner = false;
  public UserType = UserType;
  public Status = Status;
  private search = {
    name: undefined,
    userType: undefined,
  };

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastService: ToastService,
    private dialogService: NbDialogService,
  ) { }

  private static loadData(component: UserComponent) {
    component.spinner = true;
    component.userService.getPaginationWithSearchObject(component.search, component.page).subscribe((response: any) => {
      component.userList = response.detail.content;
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
    UserComponent.loadData(this);
  }

  private buildForm(): void {
    this.filterForm = this.formBuilder.group({
      name: [undefined],
      userType: [undefined],
    });
  }

  public add(): void {
    const dialogRef = this.dialogService.open(UserFormComponent, {
      context: {
        model: new User(),
        action: Action.ADD
      }
    });
    DialogUtils.resolve(dialogRef, UserComponent.loadData, this);
  }

  public edit(user: User): void {
    const dialogRef = this.dialogService.open(UserFormComponent, {
      context: {
        model: user,
        action: Action.UPDATE
      }
    });
    DialogUtils.resolve(dialogRef, UserComponent.loadData, this);
  }

  public delete(user: User): void {
    const dialogRef = this.dialogService.open(TwoButtonConfirmComponent, {
      context: {
        headerText: AppConstant.USER_DELETE_CONFIRMATION,
        btnOneText: AppConstant.YES,
        btnTwoText: AppConstant.NO,
      }
    });
    dialogRef.onClose.subscribe((response: DialogResponse) => {
      if (response) {
        if (response.type === DialogResponseType.SUCCESS) {
          this.userService.delete(user?.id).subscribe(() => {
            this.toastService.show(new Alert(AlertType.SUCCESS, 'Successfully deleted the user'));
            UserComponent.loadData(this);
          }, error => {
            console.error(error);
            this.toastService.show(new Alert(AlertType.ERROR, 'Failed to delete the user'));
          });
        } else if (response.type === DialogResponseType.DISMISS) {
          console.log(`Modal closed with message: ${response.message}`);
        }
      }
    });
  }

  public onSearch(): void {
    this.search.name = ObjectUtils.setUndefinedIfNull(this.filterForm.get('name').value);
    this.search.userType = ObjectUtils.setUndefinedIfNull(this.filterForm.get('userType').value);
    UserComponent.loadData(this);
  }

  public clearSearch(): void {
    this.buildForm();
    this.onSearch();
    this.isFilterCollapsed = true;
  }

  public changePage(page: number) {
    this.page = page;
    UserComponent.loadData(this);
  }

  public statusChange(user: User, value: NbToggleComponent): void {
    user.status = EnumUtils.getEnum(Status, value.checked ? Status.ACTIVE : Status.INACTIVE);
    this.userService.changeStatus(user.id, user.status).subscribe(() => {
      this.toastService.show(new Alert(AlertType.SUCCESS, 'Successfully updated status!!!'));
    }, error => {
      console.error(error);
      this.toastService.show(new Alert(AlertType.ERROR, 'Could not update status!!!'));
    });
  }

}
