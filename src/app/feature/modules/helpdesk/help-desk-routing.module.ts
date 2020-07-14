import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { QueryListComponent } from './components/query-list/query-list.component';

const routes: Routes = [
  {
    path: '',
    component: QueryListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpDeskRoutingModule {}
