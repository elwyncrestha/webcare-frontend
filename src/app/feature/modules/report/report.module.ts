import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { AppointmentReportComponent } from './components/appointment-report/appointment-report.component';
import { ThemeModule } from 'src/app/@theme/theme.module';

@NgModule({
  declarations: [AppointmentReportComponent],
  imports: [CommonModule, ReportRoutingModule, ThemeModule],
})
export class ReportModule {}
