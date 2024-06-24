import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { Iuser } from '../user.component';
import { EMPTY, Subject, catchError, finalize, tap } from 'rxjs';
import { SpinnerService } from 'src/app/spinner.service';
import { ToastService } from 'src/app/shared/toast.service';

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

  errorMessage: string = '';



  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private toastService: ToastService, private spinnerService: SpinnerService) { }

  ngOnInit(): void {

    
    this.spinnerService.show();


    this.profileForm = this.fb.group({
      firstName: ['', [ Validators.required, Validators.minLength(3) ]],
      lastName: ['', [ Validators.required, Validators.maxLength(20) ]],
      email: [{value: '', disabled: true}, [ Validators.required, Validators.email ]],
      phone: [{value: '', disabled: true}, [ Validators.required ]]

    });


    this.auth.getUser().pipe(
      tap(response => {
        this.profileForm.patchValue({
          firstName: response.firstName ,
          lastName: response.lastName,
          email: response.email,
          phone: response.phone
    
        })
      }),
      catchError(err => {
        this.errorMessage = err.message || 'An unknown error occurred';
        this.errorMessageSubject.next(this.errorMessage);

        console.error('User profile error:', this.errorMessage);
        this.showToastError(this.errorMessage);
        this.spinnerService.hide();
        return EMPTY;
      }),
      finalize(() => {
        // Hide spinner after data fetch completes
        this.spinnerService.hide();
      })
    ).subscribe();

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
      this.spinnerService.show();
      console.log('Form submitted:', this.profileForm.value);
      
      this.auth.updateUser(this.profileForm.value).pipe(
        tap(response => {
          console.log('UpdateOneUser:', JSON.stringify(response))
          this.showToastSuccess();
      }),
       catchError(err => {
        console.error('Profile error:', err.message);
          const errorMessage = err.message || 'An unknown error occurred';
          this.errorMessageSubject.next(errorMessage);
          this.showToastError(errorMessage);
        return EMPTY;
      }), finalize(() => {
        // Hide spinner after data fetch completes
        this.spinnerService.hide();
      }),
      ).subscribe()
      this.router.navigate(['/profile'])
      console.log('Update successful');
    }
    
  }

  // showToast(message: string) {
  //   console.log('showToast in OrderHistoryComponent called with message:', message); // Debugging log
  //   this.toastService.show(message);
  // }

  showToastSuccess() {
    console.log('showToast in ProfileComponent called with message'); // Debugging log
    // this.toastService.show(product);
    this.toastService.show('User profile updated successfully!', 'success');

  }

  showToastError(message: string) {
    console.log('showToastEror in ProfileComponent called with message:', message); // Debugging log
    // this.toastService.show(product);
    this.toastService.show(message, 'error');

  }

}
