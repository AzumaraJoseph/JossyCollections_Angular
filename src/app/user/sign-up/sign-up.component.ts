import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { passwordsMatchValidator } from '../custom-validators';
import { tap, catchError, EMPTY, Observable, Subject } from 'rxjs';
import { Iuser } from '../user.component';
// import { confirmPasswordValidator } from '../custom-validators';









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

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  // ngOnInit(): void {

  // this.signUpForm = this.fb.group({
  //   fullName: ['', [Validators.required, Validators.minLength(3)]],
  //   email: ['', [Validators.required, Validators.email]],
  //   passwordGroup: this.fb.group({
  //     password: ['', [Validators.required, Validators.minLength(8)]],
  //     confirmPassword: ['', Validators.required]
  //   }),
  //   phone: ['', [Validators.required]]
  // });

  // }


  // ngOnInit(): void {

  //   this.signUpForm = this.fb.group({
  //     fullName: ['', [Validators.required, Validators.minLength(3)]],
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', [Validators.required, Validators.minLength(8)]],
  //     confirmPassword: ['', Validators.required],
  //     phone: ['', [Validators.required]]
  //   }, { validators: this.passwordsMatchValidator } );
  
  //   }
  
  passwordForm!: FormGroup;

  userForm!: FormGroup;

  ngOnInit(): void {

    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    }, { validators: passwordsMatchValidator('password', 'confirmPassword') });
  }




  // passwordsMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  //   const password = control.get('password');
  //   const confirmPassword = control.get('confirmPassword');
  //   if (password && confirmPassword && password.value !== confirmPassword.value) {
  //     return { passwordsMismatch: true };
  //   }
  //   return null;
  // }


  // togglePasswordVisibility(): void {
  //   this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  // }

  save() {
    if(this.signUpForm.valid) {

      const firstNameControl = this.signUpForm.controls['firstName'].value;
      const lastNameControl = this.signUpForm.controls['lastName'].value;
      const emailControl = this.signUpForm.controls['email'].value;
      const passwordControl = this.signUpForm.controls['password'].value;
      const confirmPasswordControl = this.signUpForm.controls['confirmPassword'].value;
      const phoneControl = this.signUpForm.controls['phone'].value;
  
      console.log(this.signUpForm.value);
    
      this.auth.signUp(firstNameControl, lastNameControl, emailControl, passwordControl, confirmPasswordControl, phoneControl).pipe(
        tap((user: Iuser) => {
          if (user) {
            this.signUpForm.reset();
            this.router.navigate(['/products']);
            console.log('Sign up success');
            this.errorMessageSubject.next(''); // Clear error message on successful login
          } else {
            console.error('sign up failed');
          }
        }),
        catchError(error => {
          console.error('Sign up error:', error.message);
          const errorMessage = error.message || 'An unknown error occurred';
          this.errorMessageSubject.next(errorMessage);
          return EMPTY;
        })
      ).subscribe();
    }
  }

}

// subscribe(response => {
//   if (response) {
//     this.signUpForm.reset();
//     this.router.navigate(['/products']);
//     console.log('Sign up success');
//   } else {
//     console.error('sign up failed');
//   }
// },
// error => {
//   // Handle error response from the login API
//   console.error('An error occurred during login:', error);
// })

