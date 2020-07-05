import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AppontmentRoutingModule } from './appontment-routing.module';
import { ThemeModule } from 'src/app/@theme/theme.module';



@NgModule({
  declarations: [AppointmentComponent],
  imports: [
    CommonModule,
    AppontmentRoutingModule,
    ThemeModule
  ],
  exports: [
    AppointmentComponent
  ]
})
export class AppointmentModule { }
