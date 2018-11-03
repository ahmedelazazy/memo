import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { StepCreateComponent } from './components/template/step-create/step-create.component';
import { TemplateCreateComponent } from './components/template/template-create/template-create.component';
import { TemplateListComponent } from './components/template/template-list/template-list.component';
import { ProcessListComponent } from './components/process/process-list/process-list.component';
import { ProcessCreateComponent } from './components/process/process-create/process-create.component';
import { ProcessProgressListComponent } from './components/process/process-progress-list/process-progress-list.component';
import { FormatInterceptor } from './services/fomat-interceptor';
import { LoginComponent } from './components/auth/login/login.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { HomeComponent } from './components/shared/home/home.component';
import { WelcomeComponent } from './components/shared/welcome/welcome.component';
import { ActionListComponent } from './components/action/action-list/action-list.component';
import { ActionManageComponent } from './components/action/action-manage/action-manage.component';
import "angular2-navigate-with-data";
import { NotificationListComponent } from './components/notification/notification-list/notification-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { TemplateFormComponent } from './components/template/template-form/template-form.component';
import { SortablejsModule } from 'angular-sortablejs';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    StepCreateComponent,
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

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: FormatInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }


