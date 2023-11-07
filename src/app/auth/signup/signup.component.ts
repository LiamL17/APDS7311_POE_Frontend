import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  public errorMessage!:string
  public successMessage!:string
  public removeCancelButton:boolean = true
  public dialogTitle: string = "Sign Up Successful"

  constructor(public authservice: AuthServiceService, private router: Router, private dialog: MatDialog){}

  option: string = this.router.url

  ngOnInit(): void {
      
  }

  //Handle the click of the sign up button
  onSignup(signupform: NgForm){
    if(signupform.invalid){
      this.errorMessage = 'Invalid values, please enter valid values and try again.'
      return
    }

    if(this.option == '/signup'){
      this.authservice.signup(signupform.value.enteredfirstname, signupform.value.enteredlastname, signupform.value.enteredusername,signupform.value.enteredpassword)
      
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          message: 'You have successfully signed up! You will now be redirected to the login page.',
          removeCancelButton: this.removeCancelButton,
          title: this.dialogTitle
        }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.removeCancelButton = false
          this.router.navigate(['/login'])
        }
      });
    }else{
      return
    }
  }
}
