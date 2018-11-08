import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Step } from 'src/app/models/step';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { TemplateService } from 'src/app/services/template.service';

@Component({
  selector: 'app-step-create',
  templateUrl: './template-step-create.component.html',
  styleUrls: ['./template-step-create.component.css']
})
export class TemplateStepCreateComponent implements OnInit {

  @Input('step') stepForm: FormGroup;
  @Output('stepUpdated') stepUpdated = new EventEmitter<Step>();

  users;
  showError = false;
  isEdit = false;


  constructor(private userService: UserService, private templateService: TemplateService) { }

  ngOnInit() {
    this.userService.getAll().subscribe(users => this.users = users);
  }
}
