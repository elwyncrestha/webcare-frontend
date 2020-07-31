import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { FeedbackListComponent } from './components/feedback-list/feedback-list.component';
import { FeedbackRoutingModule } from './feedback-routing.module';
import { ThemeModule } from 'src/app/@theme/theme.module';

@NgModule({
  declarations: [FeedbackFormComponent, FeedbackListComponent],
  imports: [CommonModule, FeedbackRoutingModule, ThemeModule],
  exports: [FeedbackFormComponent],
})
export class FeedbackModule {}
