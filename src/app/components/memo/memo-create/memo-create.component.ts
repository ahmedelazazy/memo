import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { TaskType } from 'src/app/models/enums';
import { UserService } from 'src/app/services/user.service';
import { MemoService } from 'src/app/services/memo.service';

@Component( {
  selector: 'app-memo-create',
  templateUrl: './memo-create.component.html',
  styleUrls: ['./memo-create.component.css']
} )
export class MemoCreateComponent implements OnInit {
  taskTypeEnum = TaskType;
  memoForm: FormGroup;
  users;

  constructor( private userService: UserService, private memoService: MemoService ) { }

  ngOnInit() {
    this.userService.getAll().subscribe( users => this.users = users );


    this.memoForm = new FormGroup( {
      title: new FormControl( null ),
      description: new FormControl( null ),
      steps: new FormArray( [this.getEmptyUser( this.taskTypeEnum.Task )] )
    } );
  }

  getEmptyUser( type?, user_id?, order?) {
    return new FormGroup( {
      type: new FormControl( type || null ),
      user_id: new FormControl( user_id || null ),
      order: new FormControl( order || null )
    } );
  }

  addStep( stepType ) {
    let steps = this.memoForm.get( 'steps' ) as FormArray;
    steps.push( this.getEmptyUser( stepType, null, null ) );
  }

  remove( index ) {
    ( this.memoForm.get( 'steps' ) as FormArray ).removeAt( index );
  }

  save() {
    this.memoService.add( this.memoForm.value ).subscribe(
      data => console.log( data )
    );
  }
}
