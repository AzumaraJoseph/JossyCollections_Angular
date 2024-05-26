import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { Iuser } from '../user.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  // passwordFieldType: string = 'password';
  currentUser: Iuser | null = null;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {

  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  })

 

  }

  save() {
    if(this.loginForm.valid) {
      
      const emailControl = this.loginForm.controls['email'].value;
      const passwordControl = this.loginForm.controls['password'].value;
  
      console.log(this.loginForm.value);
  
      this.auth.login(emailControl, passwordControl).subscribe((user: Iuser) => {
        console.log('Login pass:', user);
        this.currentUser = user;
        
          if (user && this.currentUser) {
            this.loginForm.reset();
            this.router.navigate(['/products']);
            console.log('Login success');
            console.log('Login:', this.currentUser);

          } else {
            console.error('Login failed');
          }
        })
        
    }    
  }

}
