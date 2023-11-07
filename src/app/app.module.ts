import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PostCreateComponent } from './post/post-create/post-create.component';
import { PostDisplayComponent } from './post/post-display/post-display.component';
import { LoginComponent } from './auth/login/login.component';
import { InterceptorInterceptor} from './auth/interceptor.interceptor'
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './error/error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { SignupComponent } from './auth/signup/signup.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    PostDisplayComponent,
    LoginComponent,
    ErrorComponent,
    SignupComponent,
    ConfirmDialogComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
