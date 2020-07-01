import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Pageable } from 'src/app/@core/models';
import { Inventory } from 'src/app/@core/models/inventory/inventory.model';
import { InventoryService } from 'src/app/@core/services/inventory/inventory.service';
import { ToastService } from 'src/app/@theme/services/toast.service';
import { NbDialogService } from '@nebular/theme';
import { PaginationUtils } from 'src/app/@core/utils';
import { Alert, AlertType } from 'src/app/@theme/models/alert';
import { Action } from 'src/app/@theme/models/action.enum';
import { DialogUtils } from 'src/app/@core/utils/dialog/dialog.utils';
import { InventoryFormComponent } from '../inventory-form/inventory-form.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  public isFilterCollapsed = true;
  public isAddCollapsed = true;
  public filterForm: FormGroup;
  public inventoryList: Inventory[];
  public pageable: Pageable = new Pageable();
  public page = 1;
  public spinner = false;
  private search = {
    name: undefined
  };

  constructor(
    private formBuilder: FormBuilder,
    private inventoryService: InventoryService,
    private toastService: ToastService,
    private dialogService: NbDialogService
  ) { }

  private static loadData(component: InventoryComponent) {
    component.spinner = true;
    component.inventoryService.getPaginationWithSearchObject(component.search, component.page)
    .subscribe((response: any) => {
      component.inventoryList = response.detail.content;
      component.pageable = PaginationUtils.getPageable(response.detail);
      component.spinner = false;
    }, error => {
      console.error(error);
      component.toastService.show(new Alert(AlertType.ERROR, 'Unable to load data!'));
      component.spinner = false;
    });
  }

  ngOnInit(): void {
    InventoryComponent.loadData(this);
  }

  public add(): void {
    const dialogRef = this.dialogService.open(InventoryFormComponent, {
      context: {
        model: new Inventory(),
        action: Action.ADD
      }
    });
    DialogUtils.resolve(dialogRef, InventoryComponent.loadData, this);
  }

  public changePage(page: number) {
    this.page = page;
    InventoryComponent.loadData(this);
  }

}
