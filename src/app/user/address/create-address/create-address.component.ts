import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, Observable, Subject, catchError, map, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { ProductService } from 'src/app/product/product.service';
import { Iuser, address } from '../../user.component';
import { ToastService } from 'src/app/shared/toast.service';
import { SpinnerService } from 'src/app/spinner.service';

@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.css']
})
export class CreateAddressComponent implements OnInit {

  // countries$: Observable<any> | undefined;
  countries!: any[];
  selectedCountry: any | undefined;

  errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  errorMessage: string = '';

  get user() {
    return this.auth.getUser().pipe(
      map(user => user.addresses),
      tap(addresses => console.log('addressessssss: ', JSON.stringify(addresses)))
    )
  }

  addressForm!: FormGroup;
  
  constructor(private productService: ProductService, private fb: FormBuilder, private auth: AuthService, private router: Router, private toastService: ToastService, private spinnerService: SpinnerService) { }

  ngOnInit(): void {

    this.productService.countryList.pipe(
      tap(countries => {
        this.countries = countries;
      }),
      // tap(countries => console.log('countries: ', JSON.stringify(countries))),
      catchError(err => {
        this.errorMessageSubject.next(err)
        return EMPTY
      })
    ).subscribe()

    console.log('selected: ', this.selectedCountry);

    this.addressForm = this.fb.group({
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      firstName: '',
      lastName: ''
    })

    this.auth.getUser().pipe(
      map(user => user?.addresses),
      tap(addresses => console.log('addressessssss: ', JSON.stringify(addresses))),
      tap(address => {
        if (address.length > 0) {
          this.addressForm.patchValue({ 
            street: address[0].street,
            city: address[0].city,
            // state: address[0].state,
            // country: address[0].country,
            firstName: address[0].firstName,
            lastName: address[0].lastName,


            
          });
        } else {
          console.warn('No addresses found');
        }
      })
    ).subscribe(
    //response => {
    //   this.addressForm.patchValue({ 
        
    //     street: response[0]?.street,
    //     city: response[0]?.city,
    //   })
    // }
    )


    // this.user.subscribe((user) => {
    //   this.addressForm.patchValue({
    //     street: user[0].street,
    //     city: user[0].city,
    //   })
    // })

  }


  onStateChange(state: any): void {
    // Implement this method if needed
  }


  
  onCountryChange(event: Event): void {
    const selectCountry = (event.target as HTMLSelectElement).value;

    if (selectCountry) {
      this.selectedCountry = this.countries.find((country: any) => country.name === selectCountry);
    }

    console.log('selectedCountry: ', JSON.stringify(this.selectedCountry));

  }

  onSubmit() {
    if (this.addressForm.valid) {
      console.log('Form submitted: ', JSON.stringify(this.addressForm.value));
      const address = this.addressForm.value;
      this.spinnerService.show();
      this.auth.createAddress(address).pipe(
        tap(response => {
          console.log('Address added successfully:', response);
          this.addressForm.reset();
          this.router.navigate(['/user/address']);
          this.showToastSuccess()
        }),
        catchError(err => {
          this.errorMessage = err.message || 'An unknown error occurred';
          this.errorMessageSubject.next(this.errorMessage);

          console.error('Create address error:', this.errorMessage);
          this.showToastError(this.errorMessage);
          this.spinnerService.hide();

          return EMPTY;
        })
      ).subscribe(
      //   response => {
      //     console.log('Address created successfully:', response);
      //     this.addressForm.reset();
      //     this.router.navigate(['/user/address'])
      //   },
      //   error => {
      //     console.error('Error creating address:', error);
      //   }
      );
    } else {
      console.log('Form is invalid');
    }
    
  }
  
  
  showToast(message: string) {
    console.log('showToast in createAddressComponent called with message:', message); // Debugging log
    this.toastService.show(message);
  }

  showToastSuccess() {
    console.log('showToast in createAddressComponent called with message'); // Debugging log
    // this.toastService.show(product);
    this.toastService.show('New address added successfully!', 'success');

  }

  showToastError(message: string) {
    console.log('showToastEror in addressComponent called with message:', message); // Debugging log
    // this.toastService.show(product);
    this.toastService.show(message, 'error');

  }
}

