import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  
  showNavbar: boolean = true;

  //Constructor with logic to handle displaying on navbar
  //Navbar is not displayed on login and signup pages
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login' || event.url === '/signup') {
          this.showNavbar = false;
        } else {
          this.showNavbar = true;
        }
      }
    });
  }
}
