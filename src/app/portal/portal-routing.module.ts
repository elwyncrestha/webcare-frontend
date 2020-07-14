import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientAppointmentComponent } from './components/patient-appointment/patient-appointment.component';
import { PortalBaseComponent } from './components/portal-base/portal-base.component';
import { UserQueryComponent } from './components/user-query/user-query.component';


const routes: Routes = [
  {
    path: '',
    component: PortalBaseComponent,
    children: [
      { path: 'patient-appointment', component: PatientAppointmentComponent },
      { path: 'user-query', component: UserQueryComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
