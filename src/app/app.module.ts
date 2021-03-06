import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateStepCreateComponent } from './components/template/template-step-create/template-step-create.component';
import { TemplateCreateComponent } from './components/template/template-create/template-create.component';
import { TemplateListComponent } from './components/template/templates-list/template-list.component';
import { ProcessListComponent } from './components/process/process-list/process-list.component';
import { ProcessCreateComponent } from './components/process/process-create/process-create.component';
import { ProcessProgressListComponent } from './components/process/process-progress-list/process-progress-list.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { HomeComponent } from './components/shared/home/home.component';
import { WelcomeComponent } from './components/shared/welcome/welcome.component';
import { ActionListComponent } from './components/action/action-list/action-list.component';
import { ActionManageComponent } from './components/action/action-manage/action-manage.component';
import 'angular2-navigate-with-data';
import { NotificationListComponent } from './components/notification/notification-list/notification-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { TemplateFormComponent } from './components/template/template-form/template-form.component';
import { SortablejsModule } from 'angular-sortablejs';
import { TabsModule } from 'ngx-bootstrap';
import { TemplateStepsComponent } from './components/template/template-steps/template-steps.component';
import { TemplateStepFieldsComponent } from './components/template/template-step-fields/template-step-fields.component';
import { TemplateStepProcessComponent } from './components/template/template-step-process/template-step-process.component';
import { ActionManageInfoComponent } from './components/action/action-manage-info/action-manage-info.component';
import { ActionManageHistoryComponent } from './components/action/action-manage-history/action-manage-history.component';
import { ActionManageActiveComponent } from './components/action/action-manage-active/action-manage-active.component';
import { MemoCreateComponent } from './components/memo/memo-create/memo-create.component';
import { MemosListComponent } from './components/memo/memos-list/memos-list.component';
import { MemoDetailsComponent } from './components/memo/memo-details/memo-details.component';
import { AuthInterceptor } from './services/auth-interceptor';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MomentModule } from 'ngx-moment';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserListComponent } from './components/user/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TemplateStepCreateComponent,
    TemplateCreateComponent,
    TemplateListComponent,
    ProcessListComponent,
    ProcessCreateComponent,
    ProcessProgressListComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    WelcomeComponent,
    ActionListComponent,
    ActionManageComponent,
    NotificationListComponent,
    TemplateFormComponent,
    TemplateStepsComponent,
    TemplateStepFieldsComponent,
    TemplateStepProcessComponent,
    ActionManageInfoComponent,
    ActionManageHistoryComponent,
    ActionManageActiveComponent,
    MemoCreateComponent,
    MemosListComponent,
    MemoDetailsComponent,
    UserCreateComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    ReactiveFormsModule,
    SortablejsModule.forRoot({ animation: 150 }),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    MomentModule,
    NgxPaginationModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
