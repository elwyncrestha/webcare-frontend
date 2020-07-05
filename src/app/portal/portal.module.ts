import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalRoutingModule } from './portal-routing.module';
import { PatientAppointmentComponent } from './components/patient-appointment/patient-appointment.component';
import { ThemeModule } from '../@theme/theme.module';
import { PortalBaseComponent } from './components/portal-base/portal-base.component';
import { AppointmentModule } from '../feature/modules/appointment/appointment.module';


@NgModule({
  declarations: [PatientAppointmentComponent, PortalBaseComponent],
  imports: [
    CommonModule,
    PortalRoutingModule,
    ThemeModule,
    AppointmentModule
  ]
})
export class PortalModule { }
