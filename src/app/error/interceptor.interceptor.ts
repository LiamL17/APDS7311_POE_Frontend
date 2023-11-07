import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs'
import { ErrorComponent } from './error/error.component';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse)=>{
        let errorMessage = "An Unknown Error Has Occured"
        if (error.error.message){
          errorMessage = error.error.message
        }
        this.dialog.open(ErrorComponent,{data:{message:errorMessage}})
        return throwError(error)
      })
    )
  }
}
