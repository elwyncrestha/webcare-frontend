import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HelpDesk, Pageable } from 'src/app/@core/models';
import { EnumUtils, PaginationUtils, ObjectUtils } from 'src/app/@core/utils';
import { HelpDeskService } from 'src/app/@core/services/help-desk/help-desk.service';
import { ToastService } from 'src/app/@theme/services/toast.service';
import { NbDialogService } from '@nebular/theme';
import { Alert, AlertType } from 'src/app/@theme/models/alert';
import { ReplyFormComponent } from '../reply-form/reply-form.component';
import { DialogUtils } from 'src/app/@core/utils/dialog/dialog.utils';
import { Action } from 'src/app/@theme/models/action.enum';

@Component({
  selector: 'app-query-list',
  templateUrl: './query-list.component.html',
  styleUrls: ['./query-list.component.scss'],
})
export class QueryListComponent implements OnInit {
  public isFilterCollapsed = true;
  public filterForm: FormGroup;
  public helpDeskList: HelpDesk[];
  public pageable: Pageable = new Pageable();
  public page = 1;
  public spinner = false;
  public EnumUtils = EnumUtils;
  private search = {
    name: undefined,
  };

  constructor(
    private formBuilder: FormBuilder,
    private helpDeskService: HelpDeskService,
    private toastService: ToastService,
    private dialogService: NbDialogService
  ) {}

  private static loadData(component: QueryListComponent) {
    component.spinner = true;
    component.helpDeskService
      .getPaginationWithSearchObject(component.search, component.page)
      .subscribe(
        (response: any) => {
          component.helpDeskList = response.detail.content;
          component.pageable = PaginationUtils.getPageable(response.detail);
          component.spinner = false;
        },
        (error) => {
          console.log(error);
          component.toastService.show(
            new Alert(AlertType.ERROR, 'Unable to load date!')
          );
          component.spinner = false;
        }
      );
  }

  ngOnInit(): void {
    this.buildForm();
    QueryListComponent.loadData(this);
  }

  public onSearch(): void {
    this.search.name = ObjectUtils.setUndefinedIfNull(
      this.filterForm.get('name').value
    );
    QueryListComponent.loadData(this);
  }

  public clearSearch(): void {
    this.buildForm();
    this.onSearch();
    this.isFilterCollapsed = true;
  }

  public changePage(page: number) {
    this.page = page;
    QueryListComponent.loadData(this);
  }

  private buildForm(): void {
    this.filterForm = this.formBuilder.group({
      name: [undefined],
    });
  }

  public reply(helpDesk: HelpDesk): void {
    const dialogRef = this.dialogService.open(ReplyFormComponent, {
      context: {
        model: helpDesk,
        action: Action.REPLY,
      },
    });
    DialogUtils.resolve(dialogRef, QueryListComponent.loadData, this);
  }
}
