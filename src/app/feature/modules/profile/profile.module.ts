import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';



@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ThemeModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
