import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentComponent } from './components';
import {DepatmentRoutingModules} from './department-routing.module';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { DepartmentFormComponent } from './components/department-form/department-form.component';



@NgModule({
    declarations: [DepartmentComponent, DepartmentFormComponent],
    imports: [
      CommonModule,
      DepatmentRoutingModules,
      ThemeModule
    ]
  })
  export class DepartmentModule { }
