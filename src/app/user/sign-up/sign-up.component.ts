import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { passwordsMatchValidator } from '../custom-validators';
import { tap, catchError, EMPTY, Observable, Subject } from 'rxjs';
import { Iuser } from '../user.component';
import { ToastService } from 'src/app/shared/toast.service';
import { SpinnerService } from 'src/app/spinner.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  // passwordFieldType: string = 'password';
  errorMessageSubject = new Subject<string>();
  errorMessage$: Observable<string> = this.errorMessageSubject.asObservable();

  errorMessage: string = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private toastService: ToastService, private spinnerService: SpinnerService) { }
  
  ngOnInit(): void {

    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      phone: ['', Validators.required],
    }, { validators: passwordsMatchValidator('password', 'confirmPassword') });
  }


  // togglePasswordVisibility(): void {
  //   this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  // }

  save() {
    this.spinnerService.show();

    if (this.signUpForm.valid) {
      const { firstName, lastName, email, gender, password, confirmPassword, phone } = this.signUpForm.value;
  
      console.log(this.signUpForm.value);

      // if (password !== confirmPassword) {
      //   this.errorMessage = 'Passwords do not match';
      //   this.errorMessageSubject.next(this.errorMessage);
      //   this.showToastError(this.errorMessage);
      //   return;
      // }
  
      this.auth.signUp(firstName, lastName, email, gender, password, confirmPassword, phone).pipe(
        tap(response => {
          if (response) {
            this.signUpForm.reset();
            this.spinnerService.hide();

            console.log('Sign up success');
            this.router.navigate(['/products']);
            const redirectUrl = this.auth.redirectUrl ? this.auth.redirectUrl : '/';
            this.router.navigateByUrl(redirectUrl);
            this.showToastSuccess();
  
            // Clear the redirect URL
            this.auth.redirectUrl = null;
            this.errorMessageSubject.next(''); // Clear error message on successful sign-up
          } else {
            console.error('Sign up failed');
          }
        }),
        catchError(err => {
          this.errorMessage = err.message || 'An unknown error occurred';
          this.errorMessageSubject.next(this.errorMessage);
          
          console.error('Sign up error:', this.errorMessage);
          this.showToastError(this.errorMessage);
          this.spinnerService.hide();

          return EMPTY;
        })
      ).subscribe();
    } else {
      this.errorMessage = 'Form is not valid';
      this.errorMessageSubject.next(this.errorMessage);
      this.showToastError(this.errorMessage);
      this.spinnerService.hide();

    }
  }

  // passwordsMatch(group: FormGroup): { [key: string]: boolean } | null {
  //   const password = group.get('password')?.value;
  //   const confirmPassword = group.get('confirmPassword')?.value;
  //   return password === confirmPassword ? null : { passwordsMismatch: true };
  // }

  showToastSuccess() {
    console.log('showToast in signUpComponent called with message'); // Debugging log
    // this.toastService.show(product);
    this.toastService.show('SignUp successful', 'success');

  }

  showToastError(message: string) {
    console.log('showToastEror in SignUpComponent called with message:', message); // Debugging log
    // this.toastService.show(product);
    this.toastService.show(message, 'error');

  }

}








