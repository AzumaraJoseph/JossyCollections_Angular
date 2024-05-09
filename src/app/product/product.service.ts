import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, combineLatest, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'http://127.0.0.1:5000/api/v1/products';

  constructor(private http: HttpClient) { }

  selectedProductSubject = new BehaviorSubject<string>('0');
  selectedProductAction = this.selectedProductSubject.asObservable();

  products$ = this.http.get<any>(this.productsUrl).pipe(
    map(result => result.data.data),
    // tap( result=> console.log('Products', JSON.stringify(result))),
    shareReplay(1),
    catchError(this.handleError)
  );

  product$ = combineLatest([
    this.products$,
    this.selectedProductAction
  ]).pipe(
    map(([products, selectedProductId]) => {
      return products.find((product: {id: string}) => product.id === selectedProductId)
    }),
    shareReplay(1),
      // tap( result=> console.log('Product', JSON.stringify(result))),
    // tap(product => {
    //   return product.color
    // }),
    // tap( result=> console.log('Color', JSON.stringify(result))),
    catchError(err => this.handleError(err))
  )

  selectedProductChanged(id: string) {
    this.selectedProductSubject.next(id);
  }

  // selectedProduct$ = (id: number) => this.http.get<any>(`${this.productsUrl}/${id}`).pipe(
  //   map(result => result.data.data.id),
  //   tap(data => console.log('Single Product: ', data)),
  //   catchError(this.handleError)
  // )


  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }
}


