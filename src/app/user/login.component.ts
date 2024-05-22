import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  // passwordFieldType: string = 'password';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {

  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  })

  }

  save() {
    const emailControl = this.loginForm.controls['email'].value;
    const passwordControl = this.loginForm.controls['password'].value;

    console.log(this.loginForm.value);

    this.auth.login(emailControl, passwordControl).subscribe({
      next: response => {
        console.log('Login successful:', response);
        // Handle successful login here
        if (response) {
          this.loginForm.reset();
          this.router.navigate(['/products']);
          console.log('Login success');
        } else {
          console.error('Login failed');
        }
      },
      error: error => {
        console.error('An error occurred during login:', error);
      },
      complete: () => {
        console.log('Login request complete');
      }
    }
    );
  }

}
