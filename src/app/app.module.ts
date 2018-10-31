import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentComponent } from './components/student/student.component';
import { UserComponent } from './components/user/user.component';
import { StepCreateComponent } from './components/template/step-create/step-create.component';
import { StepListComponent } from './components/template/step-list/step-list.component';
import { TemplateCreateComponent } from './components/template/template-create/template-create.component';
import { TemplateListComponent } from './components/template/template-list/template-list.component';
import { ProcessListComponent } from './components/process/process-list/process-list.component';
import { BaseService } from './services/base.service';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    UserComponent,
    StepCreateComponent,
    StepListComponent,
    TemplateCreateComponent,
    TemplateListComponent,
    ProcessListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
