import { Component, OnInit, ViewChild } from '@angular/core';
import { Template } from './../../../models/template';
import { Step } from 'src/app/models/step';
import { TemplateService } from 'src/app/services/template.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-template-create',
  templateUrl: './template-create.component.html',
  styleUrls: ['./template-create.component.css']
})
export class TemplateCreateComponent implements OnInit {

  showError = false;
  template: Template;
  isEdit = false;
  users: User[];
  templateForm: FormGroup;
  @ViewChild('templateFormRef') templateFormRef;

  constructor(public templateService: TemplateService, private toastrService: ToastrService, private router: Router, private userService: UserService) {


  }

  ngOnInit() {
    if (!this.isEdit) {
      this.templateService.currentTemplate.template = new Template();
      let emptyStep = new Step();
      emptyStep.order = 1;
      this.templateService.currentTemplate.template.steps = [emptyStep];
    }

    this.template = this.templateService.currentTemplate.template;

    this.userService.getAll().subscribe(data => this.users = data);




    // let TheForm = new FormGroup({
    //   title: new FormControl (null),
    //   description: new FormControl(null),
    //   steps: new FormArray([
    //     new FormGroup({
    //       'title': new FormControl(null),
    //       'type': new FormControl(null),
    //       'description': new FormControl(null),
    //       'user': new FormControl(null)
    //     })
    //   ]),
    //   dataForm: new FormGroup()


    // });


  }




  addTemplate(f) {


    console.log(this.templateFormRef.templateForm.invalid);
    // this.showError = true;

    // if (f.invalid) return;

    //validate form
    //validate steps count
    //validate steps details
    //validate steps fields

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
