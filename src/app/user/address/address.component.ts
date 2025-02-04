import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordsMatchValidator } from '../custom-validators';
import { AuthService } from 'src/app/shared/auth.service';
import { EMPTY, Observable, Subject, catchError, finalize, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toast.service';
import { SpinnerService } from 'src/app/spinner.service';

@Component({
  selector: 'app-profile',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressComponent implements OnInit {
  profileForm!: FormGroup;
  // currentUser: any;
  // singleAddress$!: Observable<any>;
  address$!: Observable<any>;
  deleteAddress$!: Observable<any>;
  addresses: any[] =[];


  // get currentUser() {
  //   return this.auth.currentUser;
  // }

  // passwordFieldType!: string = 'password';

  currentPasswordVisible: boolean = false;
  newPasswordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  editMode: boolean =false;

  
  errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  errorMessage: string = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private cdr: ChangeDetectorRef, private toastService: ToastService,  private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.show();

    this.profileForm = this.fb.group({
      firstName: ['', [ Validators.required, Validators.minLength(3) ]],
      lastName: ['', [ Validators.required, Validators.maxLength(20) ]],
      email: ['', [ Validators.required, Validators.email ]],
      currentPassword: ['', [ Validators.required, Validators.minLength(8) ]],
      newPassword: ['', [ Validators.required, Validators.minLength(8) ]],
      confirmPassword: ['', [ Validators.required ]],

    }, { validators: passwordsMatchValidator('newPassword', 'confirmPassword') } );

    console.log(this.profileForm.controls['newPassword']);


    this.address$ = this.auth.getUser().pipe(
      map(user => user),
      // tap(addresses => {
      //    console.log('Address user', JSON.stringify(addresses));

      //    if (addresses.length === 0) this.showToast('No address found')

      //   }),
      tap(response => {
        this.addresses = response.addresses;

        // if (this.addresses.length === 0) this.showToast('No address found');
        // this.cdr.markForCheck();
      }),
      catchError(err => {
        this.errorMessage = err.message || 'An unknown error occurred';
        this.errorMessageSubject.next(this.errorMessage);
        // this.showToast('No address found' + this.errorMessage);
        this.showToastError(this.errorMessage)

        console.error('Address error:', this.errorMessage);   
        this.spinnerService.hide();     
        return EMPTY;
      }),
      finalize(() => {
        // Hide spinner after data fetch completes
        this.spinnerService.hide();
      }),
    );

  }

  editAddress() {
    this.editMode = true;
    this.router.navigate(['/address/create'])
  }
  
  deleteAddress(id: any) {
    this.spinnerService.show();

    this.auth.deleteAddress(id).pipe(
      tap(res => {
        this.spinnerService.show();

        console.log('Address deleted', JSON.stringify(res));

        this.addresses = this.addresses.filter(address => address._id !== id);
        this.cdr.markForCheck();

        this.spinnerService.hide();

        if(this.addresses.length !== 0) {
          this.showToastWarning('One address deleted!');
          // this.cdr.markForCheck();
        } else {
          this.showToastError('No address found');
        }

      }),
      catchError(err => {
        console.error('Related Product error:', err.message);
        this.errorMessage = err.message || 'An unknown error occurred';
        this.errorMessageSubject.next(this.errorMessage);
        this.showToastError(this.errorMessage)
        return EMPTY;
      }),
      finalize(() => {
        // Hide spinner after data fetch completes
        this.spinnerService.hide();
      })
      // tap(() => {
      //   if (address) this.showToast('One address deleted successfully'),
      //   // (address === 0 ? 'No address found' : 'One address deleted')

      //   window.location.reload();
      //   // this.showToast('One address deleted')
        

      // })
    ).subscribe();    
    // window.location.reload();
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

  // showToast(message: string) {
  //   // this.spinnerService.show();

  //   console.log('showToast in LoginComponent called with message:', message); // Debugging log
  //   this.toastService.show(message);
  // }
 
  showToastSuccess() {
    console.log('showToast in addressComponent called with message'); // Debugging log
    // this.toastService.show(product);
    this.toastService.show('One address deleted successfully!', 'success');

  }

  showToastInfo(message: string) {
    console.log('showToast in AddressComponent called with message:', message); // Debugging log
    // this.toastService.show(product);
    this.toastService.show(message, 'info');

  }

  showToastWarning(message: string) {
    console.log('showToast in AddressComponent called with message:', message); // Debugging log
    // this.toastService.show(product);
    this.toastService.show(message, 'warning');

  }

  showToastError(message: string) {
    console.log('showToastEror in addressComponent called with message:', message); // Debugging log
    // this.toastService.show(product);
    this.toastService.show(message, 'error');

  }
}
