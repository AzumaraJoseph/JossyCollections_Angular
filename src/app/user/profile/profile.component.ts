import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { Iuser } from '../user.component';
import { EMPTY, Subject, catchError, tap } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  // user: any;

  // get user() {
  //   return this.auth.currentUser;
  // }

  // passwordFieldType!: string = 'password';

  currentPasswordVisible: boolean = false;
  newPasswordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();



  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {

    

    this.profileForm = this.fb.group({
      firstName: ['', [ Validators.required, Validators.minLength(3) ]],
      lastName: ['', [ Validators.required, Validators.maxLength(20) ]],
      email: [{value: '', disabled: true}, [ Validators.required, Validators.email ]],
      phone: [{value: '', disabled: true}, [ Validators.required ]]

  });


  this.auth.getUser().subscribe(response => {
    const user = response
    // console.log('tired', JSON.stringify(user));

    this.profileForm.patchValue({
      firstName: user.firstName ,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone

    })
    
  })
    

  // this.auth.updateUser().subscribe()

  }

  
  toggleCurrentPasswordVisibilty(): void {
    this.currentPasswordVisible = !this.currentPasswordVisible;
  }
  
  toggleNewPasswordVisibilty(): void {
    this.newPasswordVisible = !this.newPasswordVisible;
  }

  toggleConfirmPasswordVisibilty(): void {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

  update() {
    if(this.profileForm.valid) {
      console.log('Form submitted:', this.profileForm.value);
      
      this.auth.updateUser(this.profileForm.value).pipe(
        tap(response => console.log('UpdateOneUser:', JSON.stringify(response))),
       catchError(err => {
        console.error('Profile error:', err.message);
          const errorMessage = err.message || 'An unknown error occurred';
          this.errorMessageSubject.next(errorMessage);
        return EMPTY;
      })
      ).subscribe()
      this.router.navigate(['/products'])
      console.log('Update successful');
    }
    
  }
}
