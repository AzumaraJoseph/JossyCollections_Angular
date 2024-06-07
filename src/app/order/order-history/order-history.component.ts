import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, map, tap, catchError, EMPTY, Observable } from 'rxjs';
import { ProductService } from 'src/app/product/product.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orderHistoryForm!: FormGroup;

  orderHistory$!: Observable<any>;

  // countries!: any[];
  // selectedCountry: any | undefined;

  errorMessageSuject = new Subject<string>();
  errorMessage$ = this.errorMessageSuject.asObservable();

  // get user() {
  //   return this.auth.getUser().pipe(
  //     map(user => user.addresses),
  //     tap(addresses => console.log('addressessssss: ', JSON.stringify(addresses)))
  //   )
  // }

  addressForm!: FormGroup;
  
  constructor(private productService: ProductService, private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {

    // this.productService.countryList.pipe(
    //   tap(countries => {
    //     this.countries = countries;
    //   }),
    //   // tap(countries => console.log('countries: ', JSON.stringify(countries))),
    //   catchError(err => {
    //     this.errorMessageSuject.next(err)
    //     return EMPTY
    //   })
    // ).subscribe()

    // console.log('selected: ', this.selectedCountry);

    this.orderHistory$ = this.auth.orderHistory().pipe(
      tap(orders => console.log('All orders: ', JSON.stringify(orders))),
    )

    this.addressForm = this.fb.group({
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      firstName: '',
      lastName: ''
    })


    // this.user.subscribe((user) => {
    //   this.addressForm.patchValue({
    //     street: user[0].street,
    //     city: user[0].city,
    //   })
    // })

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
