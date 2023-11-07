import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostServiceService } from '../post-service.service';
import { Post } from 'src/app/post';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.css']
})
export class PostDisplayComponent implements OnInit {
  public dialogTitle: string = "Confirm Deletion"
  posts:Post[] = []

  constructor(public postservice: PostServiceService, private dialog: MatDialog){}

  private postsubscription!:Subscription

  ngOnInit(): void {
    // Retrieve and display posts when the component is initialized
    this.postservice.getpost_service();
    // Subscribe to updates in the list of posts
    this.postsubscription = this.postservice.getUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the post updates to prevent memory leaks
    this.postsubscription.unsubscribe();
  }

  // Handle the delete action for a post
  ondelete(postid: string) {
    // Open a confirmation dialog to confirm deletion
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this post?',
        title: this.dialogTitle
      }
    });
  
    // Handle the result of the confirmation dialog
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Call the service to delete the selected post
        this.postservice.deletepost_service(postid);
      }
    });
  }
}
