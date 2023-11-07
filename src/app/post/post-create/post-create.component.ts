import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostServiceService } from '../post-service.service'
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit{

  public errorMessage!:string
  public dialogTitle: string = "Post Created Successfully!"
  public removeCancelButton:boolean = true

  constructor(public postservice: PostServiceService, private dialog: MatDialog, private router: Router, private authservice: AuthServiceService) {}

    ngOnInit(): void {

    }

  // Handle the form submission when adding a new post
  onaddpost(addpostForm: NgForm) {

    // Check if the form is invalid
    if (addpostForm.invalid) {
      this.errorMessage = 'Invalid values, please enter valid values and try again.';
      return;
    }

    // Check if the user is not authenticated
    if (!this.authservice.isAuthenticated()) {
      this.errorMessage = 'You must be logged in and authorized to add a post.';
      return;
    }

    // Add the post using the PostServiceService
    this.postservice.addpost_service(addpostForm.value.enteredtitle, addpostForm.value.entereddescription, addpostForm.value.entereddepartmentcode);

    // Open a confirmation dialog
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Post has been successfully created! You will now be redirected to the posts list page.',
        removeCancelButton: this.removeCancelButton,
        title: this.dialogTitle
      }
    });

    // Handle the result of the confirmation dialog
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.removeCancelButton = false;
        this.router.navigate(['/list']);
      }
    });

    // Reset the form after adding the post
    addpostForm.resetForm();
  }
}
