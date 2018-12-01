import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let id = this.authService.user && this.authService.user.id ? this.authService.user.id.toString() : '';
    const authReq = req.clone({
      setHeaders: { 'x-auth': id }
    });
    return next.handle(authReq);
  }
}
