import { Component, OnInit, ViewChild } from '@angular/core';
import { Template } from './../../../models/template';
import { Step } from 'src/app/models/step';
import { TouchSequence } from 'selenium-webdriver';
import { TemplateService } from 'src/app/services/template.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { TemplateFormComponent } from '../template-form/template-form.component';

@Component({
  selector: 'app-template-create',
  templateUrl: './template-create.component.html',
  styleUrls: ['./template-create.component.css']
})
export class TemplateCreateComponent implements OnInit {

  showError = false;
  template: Template;
  selectedStep: Step;
  isEdit = false;
  users: User[];
  constructor(public templateService: TemplateService, private toastrService: ToastrService, private router: Router, private userService: UserService) {


  }

  mytemp;
  ngOnInit() {
    if (!this.isEdit) {
      this.templateService.currentTemplate.template = new Template();
    }
    this.template = this.templateService.currentTemplate.template;
    this.userService.getAll().subscribe(data => this.users = data);
  }




  addTemplate(f) {
    console.log("service", this.template);
    console.log("local", this.template);

    if (f.invalid) return;

    if (this.template.steps.length == 0) {
      this.toastrService.error('Template must have at least one step');
      return;
    }

    for (let i = 0; i < this.template.steps.length; i++) {
      const step = this.template.steps[i];
      if (!step || !step.title || !step.user_id || !step.type) {
        this.toastrService.error('Please fill all requied data');
        return;
      }
    }

    for (let i = 0; i < this.template.steps.length; i++) {
      this.template.steps[i].user = undefined;
    }

    this.templateService.add(this.template).subscribe(
      data => {
        this.toastrService.success('Data saved successfully');
        this.router.navigate(['/templates']);
      },
      error => {
        this.toastrService.error('Error wile saving');
        console.error(error);
      }
    );

  }

}
