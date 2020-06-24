import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthBaseComponent, LoginComponent, ForgotPasswordComponent } from './components';
import { LoginGuard, AuthGuard } from './@core/guards';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '', component: AuthBaseComponent, children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'forgotPassword',
        component: ForgotPasswordComponent,
        canActivate: [LoginGuard]
      }
    ]
  },
  {
    path: 'feature',
    loadChildren: () => import('./feature/feature.module')
      .then(m => m.FeatureModule),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
