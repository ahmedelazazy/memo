import { Component, OnInit } from '@angular/core';
import { MemoService } from 'src/app/services/memo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, map } from 'rxjs/operators';
import { ActionStatus, TaskType } from 'src/app/models/enums';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormHelper } from '../../template/form-helper';
import { SortablejsOptions } from 'angular-sortablejs';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-memo-details',
  templateUrl: './memo-details.component.html',
  styleUrls: ['./memo-details.component.css']
})
export class MemoDetailsComponent implements OnInit {
  task;
  actionStatusEnum = ActionStatus;
  taskTypeEnum = TaskType;
  editMode = false;
  memoForm;
  users;
  submitted = false;

  sortableOptions: SortablejsOptions = {
    handle: '.move',
    onUpdate: event => {
      new FormHelper().updateValueAndValidity(this.memoForm);
    }
  };
  constructor(
    private memoService: MemoService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.getAll().subscribe(users => (this.users = users));

    this.route.params.subscribe(params =>
      this.memoService.getById(params['id']).subscribe(
        task => {
          this.task = this.prepareObject(task);
          this.editMode = task.status == ActionStatus.assigned && task.userId == this.authService.user.id;
          this.prepareForm();
        },
        error => {
          console.error(error);
          this.toastrService.error('Error while opening memo');
          this.router.navigate(['/memo']);
        }
      )
    );
  }

  prepareForm() {
    this.memoForm = new FormGroup({
      comment: new FormControl(null),
      tasks: new FormArray([])
    });
  }

  prepareObject(task) {
    if (!task || !task.memo || !task.memo.tasks) {
      return task;
    }

    for (let i = 0; i < task.memo.tasks.length; i++) {
      const nestedTask = task.memo.tasks[i];
      nestedTask.addedTasks = [];
      if (nestedTask.additionalInfo) {
        nestedTask.additionalInfoArr = JSON.parse(nestedTask.additionalInfo);
        for (let j = 0; j < nestedTask.additionalInfoArr.length; j++) {
          const addedTask = nestedTask.additionalInfoArr[j];
          nestedTask.addedTasks.push(`Added ${addedTask.type} by ${this.getUserName(addedTask.userId)}`);
        }
      }
    }
    return task;
  }

  getUserName(userId) {
    let user = this.users.find(u => u.id == userId);
    if (user) {
      return user.name;
    }
    return 'User not found';
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

  getStepStatus(taskId) {
    return this.task.memo.tasks.find(a => a.taskId == taskId).status;
  }

  onSave(status) {
    this.submitted = true;

    if (this.memoForm.invalid) {
      this.toastrService.error('Some fields have invalid values');
      return;
    }

    this.memoForm.value.status = status;

    if (status == ActionStatus.rejected && this.memoForm.value.tasks.length > 0) {
      this.toastrService.error('Inviting participants to a rejected memo is not allowed');
      return;
    }

    this.memoService.update(this.task.id, this.memoForm.value).subscribe(
      data => {
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
