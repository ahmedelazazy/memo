import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Template } from './../../../models/template';
import { Step } from 'src/app/models/step';
import { TemplateService } from 'src/app/services/template.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { FormHelper } from '../form-helper';

@Component({
  selector: 'app-template-create',
  templateUrl: './template-create.component.html',
  styleUrls: ['./template-create.component.css']
})
export class TemplateCreateComponent implements OnInit {
  containerForm: FormGroup;
  showError = false;
  template: Template;
  isEdit = false;
  users: User[];
  templateForm: FormGroup;
  @ViewChild('templateFormRef') templateFormRef;

  constructor(private cdRef: ChangeDetectorRef, public templateService: TemplateService, private toastrService: ToastrService, private router: Router, private userService: UserService) {


  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
    // setTimeout(() => {
    //   this.dateNow = new Date();
    // });
  }

  ngOnInit() {
    this.userService.getAll().subscribe(data => this.users = data);
    this.containerForm = this.templateService.containerForm;
  }




  addTemplate() {
    if (this.containerForm.invalid) {
      this.toastrService.error('invalid form');
      return;
    }

    if (this.containerForm.value.steps.length == 0) {
      this.toastrService.error('Template must have at least one step');
      return;
    }

    for (let i = 0; i < this.containerForm.value.steps.length; i++) {
      const step = this.containerForm.value.steps[i];
      if (!step || !step.title || !step.user_id || !step.type) {
        this.toastrService.error('Please fill all requied data');
        return;
      }
    }

    for (let i = 0; i < this.containerForm.value.steps.length; i++) {
      this.containerForm.value.steps[i].user = undefined;
    }

    this.templateService.add(this.containerForm.value).subscribe(
      data => {
        this.toastrService.success('Data saved successfully');
        // this.router.navigate(['/templates']);
      },
      error => {
        this.toastrService.error('Error wile saving');
        console.error(error);
      }
    );

  }

}
