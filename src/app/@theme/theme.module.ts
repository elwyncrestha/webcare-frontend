import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbActionsModule,
  NbButtonModule,
  NbContextMenuModule,
  NbDatepickerModule,
  NbDialogModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSelectModule,
  NbSidebarModule,
  NbThemeModule,
  NbToastrModule,
  NbUserModule,
  NbWindowModule,
  NbCardModule,
  NbTabsetModule,
  NbRouteTabsetModule,
  NbCheckboxModule,
  NbPopoverModule,
  NbProgressBarModule,
  NbCalendarModule,
  NbCalendarRangeModule,
  NbStepperModule,
  NbListModule,
  NbInputModule,
  NbAccordionModule,
  NbAlertModule,
  NbSpinnerModule,
  NbRadioModule,
  NbChatModule,
  NbTooltipModule,
  NbCalendarKitModule,
  NbToggleModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { FooterComponent, HeaderComponent } from './components';
import {
  CapitalizePipe,
  NumberWithCommasPipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  SafePipe,
} from './pipes';
import {
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
} from './layouts';
import { DEFAULT_THEME } from './styles/theme.default';
import { COSMIC_THEME } from './styles/theme.cosmic';
import { CORPORATE_THEME } from './styles/theme.corporate';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CheckEmptyPipe } from './pipes/check-empty.pipe';
import { TwoButtonConfirmComponent } from './components/two-button-confirm/two-button-confirm.component';
import { NotificationComponent } from './components/notification/notification.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NotificationAllComponent } from './components/notification-all/notification-all.component';
import { RouterModule } from '@angular/router';

const NB_MODULES = [
  NbCardModule,
  NbLayoutModule,
  NbTabsetModule,
  NbRouteTabsetModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbCheckboxModule,
  NbPopoverModule,
  NbContextMenuModule,
  NbProgressBarModule,
  NbCalendarModule,
  NbCalendarRangeModule,
  NbStepperModule,
  NbButtonModule,
  NbListModule,
  NbToastrModule,
  NbInputModule,
  NbAccordionModule,
  NbDatepickerModule,
  NbDialogModule,
  NbWindowModule,
  NbAlertModule,
  NbSpinnerModule,
  NbRadioModule,
  NbSelectModule,
  NbChatModule,
  NbTooltipModule,
  NbCalendarKitModule,
  NbIconModule,
  NbToggleModule,
  NbEvaIconsModule,
];

const OTHER_MODULES = [
  FormsModule,
  ReactiveFormsModule,
  NgbModule,
  CKEditorModule,
  RouterModule,
];

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
  SpinnerComponent,
  PaginationComponent,
  TwoButtonConfirmComponent,
  NotificationComponent,
  NotificationAllComponent,
];

const ENTRY_COMPONENTS = [TwoButtonConfirmComponent];

const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
  CheckEmptyPipe,
  SafePipe,
];

const DIRECTIVES = [];

@NgModule({
  imports: [CommonModule, ...NB_MODULES, ...OTHER_MODULES],
  exports: [
    CommonModule,
    ...NB_MODULES,
    ...OTHER_MODULES,
    ...PIPES,
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],
  entryComponents: [...ENTRY_COMPONENTS],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: 'default',
          },
          [DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME]
        ).providers,
      ],
    };
  }
}
