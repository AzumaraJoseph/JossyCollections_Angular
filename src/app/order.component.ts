import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProductService } from './product/product.service';
import { Product } from './product/product';
import { EMPTY, Observable, Subject, catchError, map, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent implements OnInit {

  product$: Observable<Product> | undefined;
  index: number = 0;
  quantity: number = 1;
  countries$: Observable<any> | undefined;
  countries: any[] = [];

  errorMessageSuject = new Subject<string>();
  errorMessage$ = this.errorMessageSuject.asObservable();

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id']
      this.product$ = this.productService.selectedProduct$(id);

    });

    // countries!: any[] | undefined;

    this.productService.countryList.pipe(
      map(res => res ),
      tap(countries => {
        this.countries = countries; // Assign the response to countries
      }),
      tap(countries => console.log('countries: ', JSON.stringify(countries))),
      catchError(err => {
        this.errorMessageSuject.next(err)
        return EMPTY
      })
    ).subscribe()

  }

  getCity() {
    const country = this.countries.map(country => country.states.name)
    return country
  }

  // this.countries$ = this.productService.countryList.pipe(
  //   map(res => res.map((each: { states: any; }) => each.states) ),
  //   tap(countries => console.log('countries: ', JSON.stringify(countries))),
  //   catchError(err => {
  //     this.errorMessageSuject.next(err)
  //     return EMPTY
  //   })
  // )

  
increment(add: number): void {
  if (this.quantity < add) this.quantity += 1;
}

decrement(): void {
  if(this.quantity > 1) this.quantity--;
    
 }

 selectedCountry: any;
 onCountryChange(country: any): void {
  this.selectedCountry = country;
}

onStateChange(state: any): void {
  // Implement this method if needed
}

}
