import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  // Variable to store the authentication token
  private token!: string;

  // Error message for authentication failures
  public errorMessage!: string;

  constructor(private http: HttpClient, private router: Router) { }

  // Sign up a new user
  signup(userfirstname: string, userlastname: string, userusername: string, userpassword: string) {
    this.http.post('https://localhost:3000/api/user', { username: userusername, password: userpassword, firstName: userfirstname, lastName: userlastname })
      .subscribe(response => {
        // Handle the response, if needed
      },
      (error) => {
        console.error('Error response:', error);
      });
  }

  // Log in a user and obtain an authentication token
  login(userusername: string, userpassword: string) {
    this.http.post<{token: string}>('https://localhost:3000/api/auth', { username: userusername, password: userpassword })
      .subscribe(response => {
        // Extract the token from the response
        const token = response.token;
        localStorage.setItem('token', token)
        this.token = token;
        // Navigate to the '/list' page
        this.router.navigate(['/list']);
      },
      (error) => {
        // Handle authentication errors
        if (error.status === 401) {
          this.errorMessage = 'Incorrect username or password';
        } else {
          this.errorMessage = 'An error occurred while logging in. Please try again later.';
        }
      });
  }

  // Store the authentication token in local storage
  setAuthToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Get the stored authentication token
  getToken() {
    return this.token;
  }

  // Check if the user is authenticated (has a valid token)
  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  // Clear the authentication token from local storage
  clearToken() {
    localStorage.clear()
    localStorage.removeItem('token');
    this.token = '';
  }
}
