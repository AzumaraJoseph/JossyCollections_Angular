import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, combineLatest, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // private review = 'http://127.0.0.1:5000/api/v1/reviews';
  private productsUrl = 'https://anneth.anneth.online/api/v1/products';
  private review = 'https://anneth.anneth.online/api/v1/reviews';
  // private countries = 'https://countriesnow.space/api/v0.1/countries/population/cities';
  private countries = 'https://countriesnow.space/api/v0.1/countries/states';


  constructor(private http: HttpClient) { }

  selectedProductSubject = new BehaviorSubject<string>('0');
  selectedProductAction$ = this.selectedProductSubject.asObservable();

  products$ = this.http.get<any>(this.productsUrl).pipe(
    map(result => result.data.data),
    shareReplay(1),
    // tap( result=> console.log('Products', JSON.stringify(result))),
    catchError(this.handleError)
  );

  countryList = this.http.get<any>(this.countries).pipe(
    map(res => res.data),
    // tap(data => console.log('coutries:', JSON.stringify(data))
    // ),
    catchError(err => this.handleError(err))
  );

  // There are some info in each product thats not included in the list of products
  product$ = combineLatest([
    this.products$,
    this.selectedProductAction$
  ]).pipe(
    map(([products, selectedProductId]) => {
      return products.find((product: {id: string}) => product.id === selectedProductId)
    }),
    shareReplay(1),
    catchError(err => this.handleError(err))
  )

  selectedProductChanged(id: string) {
    this.selectedProductSubject.next(id);
  }

  selectedProduct$ = (id: string) => this.http.get<any>(`${this.productsUrl}/${id}`).pipe(
    map(result => result.data.data),
    // tap(res => console.log('Single product: ', JSON.stringify(res))),
    catchError(this.handleError)
  )

  // ralatedProductSubject = new BehaviorSubject<string>('0');
  // relatedProductId$ = this.ralatedProductSubject.asObservable();

  // relatedProduct$ = combineLatest([
  //   this.product$,
  //   this.selectedProductAction$
  // ]).pipe(
  //   switchMap(([product, selectedProductId]) => {

  //     if(product.id) {
  //       return this.http.get<any>(`${this.productsUrl}/${selectedProductId}/relatedProducts`).pipe(
  //         map(data => data.data.products),
  //         // tap(related => console.log('relate: ' + JSON.stringify(related))),
  //       )
        
  //     } else {
  //       return of(null)
  //     }
      
  //   }));

    relatedProduct$ = (id: string) => this.http.get<any>(`${this.productsUrl}/${id}/relatedProducts`).pipe(
        map(data => data.data.products),
        // tap(related => console.log('relate: ' + JSON.stringify(related))),
    );

  userReviews$ = this.http.get<any>(this.review).pipe(
    tap(data => console.log('user review: ', data)),

)

  // private handleError(err: HttpErrorResponse): Observable<never> {
  //   // in a real world app, we may send the server to some remote logging infrastructure
  //   // instead of just logging it to the console
  //   let errorMessage: string;
  //   if (err.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     errorMessage = `An error occurred: ${err.error.message}`;
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     // errorMessage = `Backend returned code ${err.status}: ${err.message}`;
  //     errorMessage = err.error?.message || err.message;

  //   }
  //   console.error(err);
  //   return throwError(() => errorMessage);
  // }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;

    } else {
      // errorMessage =  `Backend returned code ${err.status}: ${err.error?.message || err.message}`;
      errorMessage = err.error?.message || err.message;
    }
    console.error(err);
    // return throwError(() => errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}


