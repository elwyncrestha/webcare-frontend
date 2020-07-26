import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpDeskComponent } from './components/help-desk/help-desk.component';
import { HelpDeskRoutingModule } from './help-desk-routing.module';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { QueryListComponent } from './components/query-list/query-list.component';
import { ReplyFormComponent } from './components/reply-form/reply-form.component';

@NgModule({
  declarations: [HelpDeskComponent, QueryListComponent, ReplyFormComponent],
  imports: [CommonModule, HelpDeskRoutingModule, ThemeModule],
  exports: [HelpDeskComponent],
})
export class HelpDeskModule {}
