import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  // passwordFieldType: string = 'password';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {

  this.signUpForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    phone: ['', [Validators.required]]
  })
  }

  // togglePasswordVisibility(): void {
  //   this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  // }

  save() {
    const fullNameControl = this.signUpForm.controls['email'].value;
    const emailControl = this.signUpForm.controls['email'].value;
    const passwordControl = this.signUpForm.controls['password'].value;
    const confirmPasswordControl = this.signUpForm.controls['confirmPassword'].value;
    const phoneControl = this.signUpForm.controls['phone'].value;

    console.log(this.signUpForm.value);
  
    this.auth.signUp(fullNameControl, emailControl, passwordControl, confirmPasswordControl, phoneControl).subscribe(response => {
      if (response) {
        this.signUpForm.reset();
        this.router.navigate(['/products']);
        console.log('Sign up success');
      } else {
        console.error('sign up failed');
      }
    },
    error => {
      // Handle error response from the login API
      console.error('An error occurred during login:', error);
    }
    )
// res => console.log('signup: ', JSON.stringify(res))
  }

}


