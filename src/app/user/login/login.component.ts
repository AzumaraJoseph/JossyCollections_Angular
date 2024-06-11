import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { Iuser } from '../user.component';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable, Subject, catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  // passwordFieldType: string = 'password';
  currentUser: Iuser | null = null;
  errorMessage: string | null = null; // Property to store error messages

  errorMessageSubject = new Subject<string>();
  errorMessage$: Observable<string> = this.errorMessageSubject.asObservable();

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {

  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  })
  
  }

  // save() {
  //   if(this.loginForm.valid) {
      
  //     const emailControl = this.loginForm.controls['email'].value;
  //     const passwordControl = this.loginForm.controls['password'].value;
  
  //     console.log(this.loginForm.value);
  
  //     this.auth.login(emailControl, passwordControl).subscribe({
  //       next: (user: Iuser) => {
  //       this.currentUser = user;
        
  //         if (user && this.currentUser) {
  //           this.loginForm.reset();
  //           this.router.navigate(['/products']);
  //           // console.log('Login success');
  //           console.log('Login res:', this.currentUser);

  //         } else {
  //           console.error('Login failed');
  //           // console.error('error message', this);
  //         }
  //       },
  //       error: (error) => {
  //         console.log('error: ', error);
  //         this.errorMessage = error || 'An unexpected error occurred'; // Store the error message
  //       }
  //     })
        
  //   }    
  // }

  save() {
    if (this.loginForm.valid) {
      const emailControl = this.loginForm.controls['email'].value;
      const passwordControl = this.loginForm.controls['password'].value;
  
      console.log(this.loginForm.value);
  
      this.auth.login(emailControl, passwordControl).pipe(
        tap((user: Iuser) => {
          this.currentUser = user;
          if (user) {
            this.loginForm.reset();
            this.router.navigate(['/products']);
            console.log('Login res:', this.currentUser);
            this.errorMessageSubject.next(''); // Clear error message on successful login
          } else {
            console.error('Login failed');
          }
        }),
        catchError(error => {
          console.error('Login Caught error:', error.message);
          const errorMessage = error.message || 'An unknown error occurred';
          this.errorMessageSubject.next(errorMessage);
          return EMPTY;
        })
      ).subscribe();
    }
  }
  

}
