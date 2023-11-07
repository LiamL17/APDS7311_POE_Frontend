import { Component } from '@angular/core';
import { AuthServiceService } from '../auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private authService: AuthServiceService, private router: Router) {}

  // Handles the clearing of the authToken on logout and redirects user to login page
  logout() {
    this.authService.clearToken();

    this.router.navigate(['/login']);
  }
}
