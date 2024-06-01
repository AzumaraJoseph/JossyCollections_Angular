import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private createCartUrl = 'http://127.0.0.1:5000/api/v1/user/create-cart';

  constructor(private http: HttpClient) { }

  createCart(id: string, quantity: number, color: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers, withCredentials: true };
    const body = { cart: [{id, quantity, color}] };
    console.log(body)

    return this.http.post<any>(this.createCartUrl, body, options).pipe(
      map(response => response.data),
      // tap(data => console.log('cart: ', JSON.stringify(data))),
      catchError(this.handleError)
    )
  }


  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }
}
