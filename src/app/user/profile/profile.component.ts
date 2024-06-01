import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { Iuser } from '../user.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  currentUser: any;

  get user() {
    return this.auth.currentUser;
  }

  // passwordFieldType!: string = 'password';

  currentPasswordVisible: boolean = false;
  newPasswordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;


  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      firstName: ['', [ Validators.required, Validators.minLength(3) ]],
      lastName: ['', [ Validators.required, Validators.maxLength(20) ]],
      email: ['', [ Validators.required, Validators.email ]],
      phone: ['', [ Validators.required ]]

  });


    this.profileForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      phone: this.user.phone
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
      
      this.auth.updateUser(this.profileForm.value).subscribe(res => {
        console.log('UpdateOneUser:', JSON.stringify(res));
      })
      this.router.navigate(['/products'])
      console.log('Update successful');
    }
    
  }
}
