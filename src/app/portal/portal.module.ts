import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalRoutingModule } from './portal-routing.module';
import { PatientAppointmentComponent } from './components/patient-appointment/patient-appointment.component';
import { ThemeModule } from '../@theme/theme.module';
import { PortalBaseComponent } from './components/portal-base/portal-base.component';
import { AppointmentModule } from '../feature/modules/appointment/appointment.module';
import { HelpDeskModule } from '../feature/modules/helpdesk/help-desk.module';
import { UserQueryComponent } from './components/user-query/user-query.component';


@NgModule({
  declarations: [PatientAppointmentComponent, PortalBaseComponent, UserQueryComponent],
  imports: [
    CommonModule,
    PortalRoutingModule,
    ThemeModule,
    AppointmentModule,
    HelpDeskModule
  ]
})
export class PortalModule { }
