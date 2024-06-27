import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent, SpinnerService } from '../shared/core/common/spinner';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { ExceptionService } from './core/common/exceptionService';
import { NotifyService } from './core/common/toast/toast.service';
import { ToastComponent } from './core/common/toast';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { DragDropDirective } from './directives/drag-drop.directive';
import { TopBarComponent } from '../layout/topbar.component'
import { DashboardService } from '../dashboard/dashboard.service';
import { HttpInterceptorModule } from './http-interceptor.module';
import { ProfileService } from '../patients/profile/profile.service';
import { ShareDataService } from './core/common/sharedDataService';
import { PhoneMaskDirective } from './directives/phone.directive';
import { NotificationComponent, NotificationService } from './core/common/notification';
import { PhoneFormatPipe } from './pipe/phoneNoPipe';
import { SafePipe } from './pipe/safeHtmlPipe';
import { HomeTopBarComponent } from '../layout/home-topbar.component';
import { ReferalPopupComponent } from '../layout/referal-popup/referal-popup.component';
import { ValidateDateDirective } from './directives/validateDate.directive';
import { ValidateDateInputDirective } from './directives/validateDateInput.directive';
import { NumberDirective } from './directives/numbers-only.directive';
import { CommonService } from './core/common/commonService';
import { ProviderService } from '../providers/provider.service';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalenderDirective } from './directives/calender.directive';
import { MsalModule } from '@azure/msal-angular';
import {EditorModule} from 'primeng/editor';
import { FooterComponent } from '../layout/footer/footer.component';
import { NoSanitizePipe } from './pipe/sanitizeHtml';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AccordionModule } from 'primeng/accordion';
import { PreviewFileComponent } from '../manage-site/email-manager/preview-file/preview-file.component';
import { SpinnerManualComponent } from './core/common/spinner/spinner-manual.component';
import { SpinnerManualModule } from './core/common/spinner/spinner-manual.module';
import {  ReadMoreDirective } from './directives/readMore.directive';
import { ReadMoreComponent } from './read-more/read-more.component';
import { ValidationErrorsComponent } from './core/common/validation-errors/validation-errors.component';
import { ReferalService } from '../layout/referal-popup/referal-popup.service';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    TabViewModule,
    TooltipModule,
    RippleModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpInterceptorModule,
    ChartModule,
    TreeModule,
    TreeTableModule,
    ConfirmDialogModule,
    EditorModule,
    CheckboxModule,
    SelectButtonModule,
    AccordionModule,
    SpinnerManualModule
  ],

  declarations: [
    SpinnerComponent,
    ToastComponent,
    TopBarComponent,
    HomeTopBarComponent,
    ReferalPopupComponent,
    DragDropDirective,
    NumberDirective,
    PhoneMaskDirective,
    ValidateDateDirective,
    ValidateDateInputDirective,
    NotificationComponent,
    PhoneFormatPipe,
    SafePipe,
    CalenderDirective,
    FooterComponent,
    NoSanitizePipe,
    PreviewFileComponent,
    ReadMoreDirective,
    ReadMoreComponent,
    ValidationErrorsComponent


  ],

  exports: [
    SpinnerComponent,
    TreeModule,
    TopBarComponent,
    HomeTopBarComponent,
    ReferalPopupComponent,
    ToastComponent,
    CommonModule,
    TabViewModule,
    FormsModule,
    TableModule,
    ChartModule,
    CheckboxModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    DragDropDirective,
    HttpInterceptorModule,
    PhoneMaskDirective,
    NotificationComponent,
    PhoneFormatPipe,
    SafePipe,
    DatePipe,
    TreeTableModule,
    ConfirmDialogModule,
    CalenderDirective,
    AccordionModule,
    MsalModule,
    EditorModule,
    CheckboxModule,
    FooterComponent,
    NoSanitizePipe,
    SelectButtonModule,
    PreviewFileComponent,
    ReadMoreComponent,
    ValidationErrorsComponent

  ],

})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [SpinnerService, ExceptionService, NotifyService, DashboardService, ProfileService, DatePipe, NotificationService, PhoneFormatPipe, CommonService, CommonService,
        ProviderService, ConfirmationService, SafePipe,NoSanitizePipe,ReferalService

      ]
    };
  }
}
