import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { InventoryService } from 'src/app/@core/services/inventory/inventory.service';
import { ToastService } from 'src/app/@theme/services/toast.service';
import { Inventory } from 'src/app/@core/models/inventory/inventory.model';
import { Action } from 'src/app/@theme/models/action.enum';
import { EnumUtils, ObjectUtils } from 'src/app/@core/utils';
import { Alert, AlertType } from 'src/app/@theme/models/alert';
import { DialogResponseType, DialogResponse } from 'src/app/@theme/models/dialog-response';
import { DateValidator } from 'src/app/@theme/validators/date.validator';


@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss']
})
export class InventoryFormComponent implements OnInit {

  @Input() public model: Inventory;
  @Input() public action: Action;
  public spinner = false;
  public form: FormGroup;
  public EnumUtils = EnumUtils;
  public Action = Action;
  public todayDate = new Date();

  constructor(
    public nbDialogRef: NbDialogRef<InventoryFormComponent>,
    private formBuilder: FormBuilder,
    private inventoryService: InventoryService,
    private toastService: ToastService,
  ) { }

  get name() {
    return this.form.get('name');
  }

  get price() {
    return this.form.get('price');
  }

  get quantity() {
    return this.form.get('quantity');
  }

  get totalPrice() {
    return this.form.get('totalPrice');
  }

  get purchaseDate(){
    return this.form.get('purchaseDate');
  }

  public submit(): void {
    this.spinner = true;
    this.model = this.form.value as Inventory;
    this.inventoryService.save(this.model).subscribe((response: any) => {
      this.toastService.show(new Alert(AlertType.SUCCESS, `Inventory ${this.action.toLowerCase()} successful`));
      this.spinner = false;
      this.nbDialogRef.close(new DialogResponse(DialogResponseType.SUCCESS, response));
    }, error => {
      console.error(error);
      this.toastService.show(new Alert(AlertType.ERROR, `Failed to ${this.action.toLowerCase()} inventory`));
      this.spinner = false;
      this.nbDialogRef.close(new DialogResponse(DialogResponseType.ERROR, error));
    });
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      id: [ObjectUtils.setUndefinedIfNull(this.model.id)],
      version: [ObjectUtils.setUndefinedIfNull(this.model.version)],
      name: [
        ObjectUtils.setUndefinedIfNull(this.model.name),
        [Validators.required]
      ],
      price: [
        ObjectUtils.setUndefinedIfNull(this.model.price),
        [Validators.required]
      ],
      quantity: [
        ObjectUtils.setUndefinedIfNull(this.model.quantity),
        [Validators.required]
      ],
      totalPrice: [
        ObjectUtils.setUndefinedIfNull(this.model.totalPrice)
      ],
      purchaseDate: [
        ObjectUtils.setUndefinedIfNull(this.model.purchaseDate),
        [Validators.required, DateValidator.pastDate]
      ]
    });
    this.form.get('price').valueChanges.subscribe(() => this.calculateTotal());
    this.form.get('quantity').valueChanges.subscribe(() => this.calculateTotal());
  }

  private calculateTotal(): void {
    const price = parseFloat(this.form.get('price').value);
    const quantity = parseFloat(this.form.get('quantity').value);
    this.form.get('totalPrice').setValue( price * quantity );
  }

}
