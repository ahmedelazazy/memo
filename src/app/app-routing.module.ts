import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { StudentComponent } from './components/student/student.component';
import { TemplateListComponent } from './components/template/template-list/template-list.component';
import { TemplateCreateComponent } from './components/template/template-create/template-create.component';
import { ProcessListComponent } from './components/process/process-list/process-list.component';

const routes: Routes = [
  { path: 'users', component: UserComponent },
  { path: 'students', component: StudentComponent },
  { path: 'templates', component: TemplateListComponent },
  { path: 'templates/create', component: TemplateCreateComponent },
  { path: 'process', component: ProcessListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
