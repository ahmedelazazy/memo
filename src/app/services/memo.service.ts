import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable( {
  providedIn: 'root'
} )
export class MemoService {

  apiUrl = environment['url'] + 'memo/';

  constructor( private http: HttpClient, private authService: AuthService ) { }

  add( obj ) {
    let url = this.apiUrl + 'add';

    obj.user_id = this.authService.user.id;

    return this.http.post( url, obj );
  }

  get() {
    let url = this.apiUrl + 'index';
    let data = { 'user_id': this.authService.user.id };

    return this.http.post( url, data );
  }

  getById( id ) {
    console.log( "getting the memo by this id", id );
    let url = this.apiUrl + 'getById';
    let data = { 'user_id': this.authService.user.id, 'id': id };

    return this.http.post( url, data );
  }
}
