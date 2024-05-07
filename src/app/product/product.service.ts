import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'http://127.0.0.1:5000/api/v1/products';

  constructor(private http: HttpClient) { }

  products$ = this.http.get<any>(this.productsUrl).pipe(
    map(result => result.data.data),
    tap( result=> console.log('Products', JSON.stringify(result))),
    catchError(this.handleError)
  );

  product$ = (id: number) => this.http.get<any>(`${this.productsUrl}/${id}`).pipe(
    map(result => result.data.data.id),
    tap(data => console.log('Single Product: ', data)),
    catchError(this.handleError)
  )



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


