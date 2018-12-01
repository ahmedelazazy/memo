import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { TaskType } from 'src/app/models/enums';
import { UserService } from 'src/app/services/user.service';
import { MemoService } from 'src/app/services/memo.service';
import { SortablejsOptions } from 'angular-sortablejs';
import { FormHelper } from '../../template/form-helper';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-memo-create',
  templateUrl: './memo-create.component.html',
  styleUrls: ['./memo-create.component.css']
})
export class MemoCreateComponent implements OnInit {
  taskTypeEnum = TaskType;
  memoForm: FormGroup;
  users;
  submitted = false;

  sortableOptions: SortablejsOptions = {
    handle: '.move',
    onUpdate: event => {
      new FormHelper().updateValueAndValidity(this.memoForm);
    }
  };

  constructor(
    private userService: UserService,
    private memoService: MemoService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.getAll().subscribe(users => (this.users = users));

    this.memoForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null),
      tasks: new FormArray([this.getEmptyUser(this.taskTypeEnum.Task)])
    });
  }

  getEmptyUser(type?, userId?, order?) {
    return new FormGroup({
      type: new FormControl(type || null),
      userId: new FormControl(userId || null, Validators.required),
      order: new FormControl(order || null)
    });
  }

  addTask(taskType) {
    let tasks = this.memoForm.get('tasks') as FormArray;
    tasks.push(this.getEmptyUser(taskType));
  }

  remove(index) {
    (this.memoForm.get('tasks') as FormArray).removeAt(index);
  }

  save() {
    this.submitted = true;

    if (this.memoForm.invalid) {
      this.toastrService.error('Some fields have invalid values');
      return;
    }

    this.memoService.add(this.memoForm.value).subscribe(
      () => {
        this.toastrService.success('Data saved successfully');
        this.router.navigate(['/memo']);
      },
      error => {
        this.toastrService.error('Error wile saving');
        console.error(error);
      }
    );
  }
}
