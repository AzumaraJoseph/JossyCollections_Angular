import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, Observable, Subject, catchError, map, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { ProductService } from 'src/app/product/product.service';
import { Iuser, address } from '../../user.component';

@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.css']
})
export class CreateAddressComponent implements OnInit {

  // countries$: Observable<any> | undefined;
  countries!: any[];
  selectedCountry: any | undefined;

  errorMessageSuject = new Subject<string>();
  errorMessage$ = this.errorMessageSuject.asObservable();

  get user() {
    return this.auth.getUser().pipe(
      map(user => user.addresses),
      tap(addresses => console.log('addressessssss: ', JSON.stringify(addresses)))
    )
  }

  addressForm!: FormGroup;
  
  constructor(private productService: ProductService, private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.productService.countryList.pipe(
      tap(countries => {
        this.countries = countries;
      }),
      // tap(countries => console.log('countries: ', JSON.stringify(countries))),
      catchError(err => {
        this.errorMessageSuject.next(err)
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


    this.user.subscribe((user) => {
      this.addressForm.patchValue({
        street: user[0].street,
        city: user[0].city,
      })
    })

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
      this.auth.createAddress(address).subscribe(
        response => {
          console.log('Address created successfully:', response);
          this.addressForm.reset();
          this.router.navigate(['/user/address'])
        },
        error => {
          console.error('Error creating address:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
    
  }
  
}
