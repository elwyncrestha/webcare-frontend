import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/@core/models/feedback/feedback.model';
import { Pageable } from 'src/app/@core/models';
import { EnumUtils, PaginationUtils } from 'src/app/@core/utils';
import { FeedbackService } from 'src/app/@core/services/feedback/feedback.service';
import { ToastService } from 'src/app/@theme/services/toast.service';
import { NbDialogService } from '@nebular/theme';
import { Alert, AlertType } from 'src/app/@theme/models/alert';
import { TwoButtonConfirmComponent } from 'src/app/@theme/components';
import { AppConstant } from 'src/app/@core/constants';
import {
  DialogResponse,
  DialogResponseType,
} from 'src/app/@theme/models/dialog-response';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss'],
})
export class FeedbackListComponent implements OnInit {
  public isFilterCollapsed = true;
  public feedbackList: Feedback[];
  public pageable: Pageable = new Pageable();
  public page = 1;
  public spinner = false;
  public EnumUtils = EnumUtils;
  private search = {
    name: undefined,
  };

  constructor(
    private feedbackService: FeedbackService,
    private toastService: ToastService,
    private dialogService: NbDialogService
  ) {}

  private static loadData(component: FeedbackListComponent) {
    component.spinner = true;
    component.feedbackService
      .getPaginationWithSearchObject(component.search, component.page)
      .subscribe(
        (response: any) => {
          component.feedbackList = response.detail.content;
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
    FeedbackListComponent.loadData(this);
  }

  public delete(feedback: Feedback): void {
    const dialogRef = this.dialogService.open(TwoButtonConfirmComponent, {
      context: {
        headerText: AppConstant.FEEDBACK_DELETE_CONFIRMATION,
        btnOneText: AppConstant.YES,
        btnTwoText: AppConstant.NO,
      },
    });
    dialogRef.onClose.subscribe((response: DialogResponse) => {
      if (response) {
        if (response.type === DialogResponseType.SUCCESS) {
          this.feedbackService.delete(feedback?.id).subscribe(
            () => {
              this.toastService.show(
                new Alert(AlertType.SUCCESS, 'Feedback deleted successfully')
              );
              FeedbackListComponent.loadData(this);
            },
            (error) => {
              console.error(error);
              this.toastService.show(
                new Alert(AlertType.ERROR, 'Failed to delete feedback')
              );
            }
          );
        } else if (response.type === DialogResponseType.DISMISS) {
          console.log(`Modal closed with message: ${response.message}`);
        }
      }
    });
  }

  public changePage(page: number) {
    this.page = page;
    FeedbackListComponent.loadData(this);
  }
}
