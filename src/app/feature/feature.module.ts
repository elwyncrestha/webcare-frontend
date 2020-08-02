import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { FeatureComponent } from './feature.component';
import { ThemeModule } from '../@theme/theme.module';
import { DashboardComponent } from './components';

@NgModule({
  declarations: [FeatureComponent, DashboardComponent],
  imports: [CommonModule, FeatureRoutingModule, ThemeModule],
})
export class FeatureModule {}
