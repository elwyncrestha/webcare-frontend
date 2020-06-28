import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './components/user/user.component';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { UserFormComponent } from './components/user-form/user-form.component';
import { NbDialogModule } from '@nebular/theme';


@NgModule({
  declarations: [UserComponent, UserFormComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ThemeModule,
    NbDialogModule.forChild({
      closeOnEsc: true,
      hasScroll: true,
      closeOnBackdropClick: false,
    }),
  ],
  entryComponents: [UserFormComponent]
})
export class UserModule { }
