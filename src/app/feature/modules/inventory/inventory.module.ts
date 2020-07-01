import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './components/inventory/inventory.component';
import { InventoryFormComponent } from './components/inventory-form/inventory-form.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { ThemeModule } from 'src/app/@theme/theme.module';



@NgModule({
    declarations: [InventoryComponent, InventoryFormComponent],
    imports: [
      CommonModule,
      InventoryRoutingModule,
      ThemeModule
    ]
  })
export class InventoryModule { }
