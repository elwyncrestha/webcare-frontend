import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { DoctorComponent, PatientComponent } from './components';


const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'all'
  },
  {
    path: 'all',
    component: UserComponent
  },
  {
    path: 'doctor',
    component: DoctorComponent
  },
  {
    path: 'patient',
    component: PatientComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
