import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private authservice: AuthServiceService) {}

  // An intercept to add the Authorization header with the authToken
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.authservice.getToken()
    const authRequest = request.clone({headers:request.headers.set("Authorization", "" + authToken)})
    return next.handle(authRequest);
  }
}
