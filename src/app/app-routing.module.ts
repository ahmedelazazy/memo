import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { TemplateListComponent } from './components/template/templates-list/template-list.component';
import { TemplateCreateComponent } from './components/template/template-create/template-create.component';
import { ProcessListComponent } from './components/process/process-list/process-list.component';
import { ProcessProgressListComponent } from './components/process/process-progress-list/process-progress-list.component';
import { ProcessCreateComponent } from './components/process/process-create/process-create.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/shared/home/home.component';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/shared/welcome/welcome.component';
import { ActionListComponent } from './components/action/action-list/action-list.component';
import { ActionManageComponent } from './components/action/action-manage/action-manage.component';
import { NotificationListComponent } from './components/notification/notification-list/notification-list.component';
import { TemplateFormComponent } from './components/template/template-form/template-form.component';
import { MemoCreateComponent } from './components/memo/memo-create/memo-create.component';
import { MemosListComponent } from './components/memo/memos-list/memos-list.component';
import { MemoDetailsComponent } from './components/memo/memo-details/memo-details.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  {
    path: '', component: HomeComponent, children: [
      { path: '', component: WelcomeComponent },
      { path: 'users', component: UserComponent },
      { path: 'templates', component: TemplateListComponent },
      { path: 'templates/create', component: TemplateCreateComponent },
      { path: 'formdata', component: TemplateFormComponent },
      { path: 'process', component: ProcessProgressListComponent },
      { path: 'process/new', component: ProcessListComponent },
      { path: 'process/new/:id', component: ProcessCreateComponent },
      { path: 'action', component: ActionListComponent },
      { path: 'action/:id', component: ActionManageComponent },
      { path: 'notifications', component: NotificationListComponent },
      { path: 'memo/new', component: MemoCreateComponent },
      { path: 'memo', component: MemosListComponent },
      { path: 'memo/:id', component: MemoDetailsComponent },
    ]
  },

];

@NgModule( {
  imports: [RouterModule.forRoot( routes )],
  exports: [RouterModule]
} )
export class AppRoutingModule { }
