import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Post } from '../post';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  // Array to store the list of posts
  private postsdisplay: Post[] = [];
  // Subject to notify subscribers about updates in the list of posts
  private updatedpostsdisplay = new Subject<Post[]>();

  constructor(private http: HttpClient, private _snackbar: MatSnackBar) { }

  // Add a new post
  addpost_service(ptitle: string, pdescription: string, pdepartmentcode: string) {
    this.http.post<{ message: string, post: any }>('https://localhost:3000/api/posts', { title: ptitle, description: pdescription, departmentCode: pdepartmentcode })
      .subscribe((thepost) => {
        this.postsdisplay.push(thepost.post);
        this.updatedpostsdisplay.next([...this.postsdisplay]);
      }, (error) => {
        if (error.status === 401) {
          // Show a notification for unauthorized access
          this.showNotification('You must be logged in and authorized to add a post.');
        } else {
          console.error('Error adding post:', error);
        }
      });
  }

  // Get the list of posts
  getpost_service() {
    this.http
      .get<Post[]>('https://localhost:3000/api/posts')
      .subscribe(
        (posts) => {
          this.postsdisplay = posts;
          this.updatedpostsdisplay.next([...this.postsdisplay]);
        },
        (error) => {
          if (error.status === 401) {
            // Show a notification for unauthorized access
            this.showNotification('You must be logged in and authorized to access this page.');
          } else {
            console.error('Error fetching posts:', error);
            this.postsdisplay = [];
            this.updatedpostsdisplay.next([...this.postsdisplay]);
          }
        }
      );
  }

  // Delete a post
  deletepost_service(postid: string) {
    this.http.delete('https://localhost:3000/api/posts/' + postid)
      .subscribe((thepost) => {
        const updatedpostsdeleted = this.postsdisplay.filter(post => post._id !== postid);
        this.postsdisplay = updatedpostsdeleted;
        this.updatedpostsdisplay.next([...this.postsdisplay]);
      });
  }

  // Get an observable to listen for updates in the list of posts
  getUpdateListener() {
    return this.updatedpostsdisplay.asObservable();
  }

  // Show a notification using MatSnackBar
  showNotification(message: string) {
    this._snackbar.open(message, 'Close', {
      duration: 5000,
      verticalPosition: 'top'
    });
  }
}
