import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordsMatchValidator } from '../custom-validators';
import { AuthService } from 'src/app/auth.service';
import { Observable, map, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  profileForm!: FormGroup;
  // currentUser: any;
  // singleAddress$!: Observable<any>;
  address$!: Observable<any>;
  deleteAddress$!: Observable<any>;

  // get currentUser() {
  //   return this.auth.currentUser;
  // }

  // passwordFieldType!: string = 'password';

  currentPasswordVisible: boolean = false;
  newPasswordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  editMode: boolean =false;


  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {

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
    // map(user => user.addresses),
    // tap(res => console.log('Address user', JSON.stringify(res)))
  );


  // TO RELOAD THE COMPONENT ALONE AND NOT THE ENTIRE APP
  // this.loadProduct();



  // this.auth.getCurrentUser().pipe(
  //   map(user => user.addresses),
  //   tap(user => 
  //     {
  //       if(user) return this.currentUser = user;

  //     }),
  //   tap(res => console.log('Address user', JSON.stringify(res))
  //   )
  // ).subscribe()

  }



  
  // loadProduct(): void {
  //   // Replace this with your actual data fetching logic
  //   this.addressService.getProduct().subscribe({
  //     next: (data) => {
  //       this.product = data;
  //     },
  //     error: (err) => {
  //       console.error('Failed to load product', err);
  //     }
  //   });
  // }

  // reloadPage(): void {
  //   this.loadProduct();  // Call loadProduct to refresh the data
  // }





  editAddress() {
    this.editMode = true;
    this.router.navigate(['/address/create'])
  }
  
  deleteAddress(id: any) {
    this.auth.deleteAddress(id).subscribe();
    // window.refresh
    // this.router.navigate(['/user/address'])
    window.location.reload();
  }

  // togglePasswordVisibility(): void {
  //   this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  //  }

  
  toggleCurrentPasswordVisibilty(): void {
    this.currentPasswordVisible = !this.currentPasswordVisible;
  }
  
  toggleNewPasswordVisibilty(): void {
    this.newPasswordVisible = !this.newPasswordVisible;
  }

  toggleConfirmPasswordVisibilty(): void {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }
}
