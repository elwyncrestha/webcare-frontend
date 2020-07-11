import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AppontmentRoutingModule } from './appontment-routing.module';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';

@NgModule({
  declarations: [AppointmentComponent, AppointmentListComponent],
  imports: [CommonModule, AppontmentRoutingModule, ThemeModule],
  exports: [AppointmentComponent],
  entryComponents: [AppointmentComponent],
})
export class AppointmentModule {}
