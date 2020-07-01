import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { NbDialogModule } from '@nebular/theme';
import { UserComponent, UserFormComponent, DoctorComponent, PatientComponent } from './components';
import { DoctorFormComponent } from './components/doctor-form/doctor-form.component';



@NgModule({
  declarations: [UserComponent, UserFormComponent, DoctorComponent, PatientComponent, DoctorFormComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ThemeModule,
    NbDialogModule.forChild({
      closeOnEsc: true,
      hasScroll: true,
      closeOnBackdropClick: false,
    }),
  ],
  entryComponents: [UserFormComponent]
})
export class UserModule { }
