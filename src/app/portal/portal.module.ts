import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalRoutingModule } from './portal-routing.module';
import { PatientAppointmentComponent } from './components/patient-appointment/patient-appointment.component';
import { ThemeModule } from '../@theme/theme.module';
import { PortalBaseComponent } from './components/portal-base/portal-base.component';
import { AppointmentModule } from '../feature/modules/appointment/appointment.module';
import { HelpDeskModule } from '../feature/modules/helpdesk/help-desk.module';
import { UserQueryComponent } from './components/user-query/user-query.component';
import { FeedbackFormComponent } from '../feature/modules/feedback/components/feedback-form/feedback-form.component';
import { FeedbackModule } from '../feature/modules/feedback/feedback.module';
import { FeedbackComponent } from './feedback/feedback.component';

@NgModule({
  declarations: [
    PatientAppointmentComponent,
    PortalBaseComponent,
    UserQueryComponent,
    FeedbackComponent,
  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
    ThemeModule,
    AppointmentModule,
    HelpDeskModule,
    FeedbackModule,
  ],
})
export class PortalModule {}
