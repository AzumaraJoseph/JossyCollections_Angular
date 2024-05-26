import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, Subject, catchError, tap } from 'rxjs';
import { ProductService } from 'src/app/product/product.service';

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


  
  constructor(private productService: ProductService) { }

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

    console.log('selectedCountry: ', this.selectedCountry);

    
  }


  onStateChange(state: any): void {
    // Implement this method if needed
  }


  
  onCountryChange(event: Event): void {
    const selectCountry = (event.target as HTMLSelectElement).value;

    if (selectCountry) {
      this.selectedCountry = this.countries.find((state: any) => state.name === selectCountry);
    }

    console.log('selectedCountry: ', JSON.stringify(this.selectedCountry));

  }
}
