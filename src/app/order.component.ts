import { Component, OnInit } from '@angular/core';
import { ProductService } from './product/product.service';
import { Product } from './product/product';
import { EMPTY, Observable, Subject, catchError, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {

  product$: Observable<Product> | undefined;
  index: number = 0;
  quantity: number = 1;
  countries$: Observable<any> | undefined;
  countries!: any[];
  selectedCountry: any | undefined;

  receiverForm!: FormGroup; 


  errorMessageSuject = new Subject<string>();
  errorMessage$ = this.errorMessageSuject.asObservable();

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id']
      this.product$ = this.productService.selectedProduct$(id);

    });


    this.productService.countryList.pipe(
      tap(countries => {
        this.countries = countries; // Assign the response to countries
      }),
      // tap(countries => console.log('countries: ', JSON.stringify(countries))),
      catchError(err => {
        this.errorMessageSuject.next(err)
        return EMPTY
      })
    ).subscribe()

    console.log('selectedCountry: ', this.selectedCountry);



  this.receiverForm = new FormGroup({
    name: new FormControl()
});

  }

  getCity(): any[] {
    // const country = this.countries.map(country => country.states.name)
    // return country
    if (this.selectedCountry) {
      // Assuming selectedCountry is an object with a 'states' property
      return this.selectedCountry.states;
    } else {
      return []; // Return an empty array if no country is selected
    }
    
  }

  
  increment(add: number): void {
    if (this.quantity < add) this.quantity += 1;
  }

  decrement(): void {
    if(this.quantity > 1) this.quantity--;
      
  }


  onStateChange(state: any): void {
    // Implement this method if needed
  }


  
  onCountryChange(event: Event): void {
    const selectedState = (event.target as HTMLSelectElement).value;

    if (selectedState) {
      this.selectedCountry = this.countries.find((state: any) => state.name === selectedState);
    }

    console.log('selectedCountry: ', JSON.stringify(this.selectedCountry));

  }
}
