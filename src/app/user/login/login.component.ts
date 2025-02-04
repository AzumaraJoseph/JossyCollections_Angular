import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { Iuser } from '../user.component';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { ToastService } from 'src/app/shared/toast.service';
import { SpinnerService } from 'src/app/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  // passwordFieldType: string = 'password';
  currentUser: Iuser | null = null;

  errorMessageSubject = new Subject<string>();
  errorMessage$: Observable<string> = this.errorMessageSubject.asObservable();

  errorMessage: string = '';


  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private toastService: ToastService, private spinnerService: SpinnerService) { }

  ngOnInit(): void {

  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  })
  
  }

  save() {
    this.spinnerService.show();

    if (this.loginForm.valid) {
      const emailControl = this.loginForm.controls['email'].value;
      const passwordControl = this.loginForm.controls['password'].value;
  
      console.log(this.loginForm.value);
  
      this.auth.login(emailControl, passwordControl).pipe(
        tap((user: Iuser) => {
          this.currentUser = user;
          if (user) {
            this.loginForm.reset();
            this.spinnerService.hide();

            this.showToastSuccess();
            
          // Redirect to the stored URL or default to home
          const redirectUrl = this.auth.redirectUrl ? this.auth.redirectUrl : '/';
          this.router.navigateByUrl(redirectUrl);

          // Clear the redirect URL
          this.auth.redirectUrl = null;
          this.errorMessageSubject.next(''); // Clear error message on successful login
        } else {
          console.error('Login failed');
        }
        }),
        catchError(err => {
          this.errorMessage = err.message || 'An unknown error occurred';
          this.errorMessageSubject.next(this.errorMessage);

          console.error('Login error:', this.errorMessage);
          this.showToastError(this.errorMessage)
          this.spinnerService.hide();
          return EMPTY;
        })
      ).subscribe();

    }
  }

  showToast(message: string) {
    console.log('showToast in LoginComponent called with message:', message); // Debugging log
    this.toastService.show(message);
  }
  

  showToastSuccess() {
    console.log('showToast in loginComponent called with message'); // Debugging log
    // this.toastService.show(product);
    this.toastService.show('Login successful', 'success');

  }

  showToastError(message: string) {
    console.log('showToastEror in ProductDetailComponent called with message:', message); // Debugging log
    // this.toastService.show(product);
    this.toastService.show(message, 'error');

  }

}
