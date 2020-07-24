import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureComponent } from './feature.component';
import { DashboardComponent } from './components';
import { NotificationAllComponent } from '../@theme/components/notification-all/notification-all.component';

const routes: Routes = [
  {
    path: '',
    component: FeatureComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'notification',
        component: NotificationAllComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./modules/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'departments',
        loadChildren: () =>
          import('./modules/department/department.module').then(
            (m) => m.DepartmentModule
          ),
      },
      {
        path: 'inventory',
        loadChildren: () =>
          import('./modules/inventory/inventory.module').then(
            (m) => m.InventoryModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./modules/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
      {
        path: 'appointment',
        loadChildren: () =>
          import('./modules/appointment/appointment.module').then(
            (m) => m.AppointmentModule
          ),
      },
      {
        path: 'help-desk',
        loadChildren: () =>
          import('./modules/helpdesk/help-desk.module').then(
            (m) => m.HelpDeskModule
          ),
      },
      {
        path: 'report',
        loadChildren: () =>
          import('./modules/report/report.module').then((m) => m.ReportModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureRoutingModule {}
