import { NgModule } from '@angular/core';
import { DepartmentComponent } from './components';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
      path: '',
      component: DepartmentComponent
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepatmentRoutingModules { }
