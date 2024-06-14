import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, map, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Iuser } from '../user/user.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://127.0.0.1:5000/api/v1/user/login';
  private signupUrl = 'http://127.0.0.1:5000/api/v1/user/signup';
  private logOutUrl = 'http://127.0.0.1:5000/api/v1/user/logout';
  private currentUserUrl = 'http://127.0.0.1:5000/api/v1/user/getMe';
  private updateUserUrl = 'http://127.0.0.1:5000/api/v1/user/updateMe';
  private createAddressUrl = 'http://127.0.0.1:5000/api/v1/user/address';
  private deleteAddressUrl = 'http://127.0.0.1:5000/api/v1/user/address';
  private createCartUrl = 'http://127.0.0.1:5000/api/v1/user/create-cart';
  private getCartUrl = 'http://127.0.0.1:5000/api/v1/user/get-cart';
  private updateCartUrl = 'http://127.0.0.1:5000/api/v1/user/update-cart';
  private placeOrderUrl = 'http://127.0.0.1:5000/api/v1/order/checkout-session';
  private orderHistoryrUrl = 'http://127.0.0.1:5000/api/v1/order';
  private reviewUrl = 'http://127.0.0.1:5000/api/v1/products';


  private currentUserSubject: BehaviorSubject<Iuser| null>;
  currentUser$: Observable<Iuser | null>;

  redirectUrl?: string;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<Iuser | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser$ = this.currentUserSubject.asObservable();
   }


  login(email: string, password: string): Observable<Iuser> {
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers, withCredentials: true};
    const loginInfo = { email, password };

    return this.http.post<any>(this.loginUrl, loginInfo, options).pipe(
      // map(data=> data.data),
      // map(data => this.currentUser = data),
      tap(response => {
        const user = response.data;
        this.currentUserSubject.next(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
      }),
      tap(data => {
        console.log('Login successful:', JSON.stringify(data));
      }),
      catchError(err => this.handleError(err))
    );
  }
  
  signUp(firstName: string, lastName: string, email: string, password: string, confirmPassword: string, phone: number): Observable<any> {
    // const options = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers, withCredentials: true};
    const signupInfo = { firstName, lastName, email, password, confirmPassword, phone };

    return this.http.post<any>(this.signupUrl, signupInfo, options).pipe(
      // map(data => data.data),
      // tap(data => this.currentUser = data),
      tap(response => {
        const user = response.data;
        this.currentUserSubject.next(user);
        localStorage.setItem('currentUser', JSON.stringify(user));

        return user;
      }),
      tap(data => console.log('signup successful: ', JSON.stringify(data))
      ),
      catchError(this.handleError)
    );
  }

  logOut(): Observable<any> {
    // const options = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers, withCredentials: true};

    return this.http.post<any>(this.logOutUrl, {}, options).pipe(
      // tap(() => this.currentUser = null ),
      tap(() => {
        this.currentUserSubject.next(null),
        localStorage.removeItem('currentUser');
    }),
      catchError(this.handleError)
    );
  }

  get isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }


  getUser(): Observable<any> {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { withCredentials: true};
  
    return this.http.get<any>(this.currentUserUrl, options).pipe(
      map(user => user.data.data),
      // tap(cur => this.currentUser = cur),

      tap(response => {
        const user = response;
        this.currentUserSubject.next(user);
        // localStorage.setItem('currentUser', JSON.stringify(user));
        // console.log('Current user: ', JSON.stringify(user))
        return user;
      }),

      tap(cur =>   console.log('Current user: ', JSON.stringify(cur))),
      catchError(this.handleError)
    );
  }

  updateUser(user: Iuser): Observable<any> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers, withCredentials: true };
    const updateInfo = { ...this.currentUserSubject.value, ...user };

    return this.http.patch<any>(this.updateUserUrl, updateInfo, options).pipe(
      map(update => update.data.user),
      // tap(data => console.log('updateUser: ', JSON.stringify(data))),
      tap(updatedUser => {
        this.currentUserSubject.next(updatedUser);
        // localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      }),
    catchError(err => this.handleError(err)))
  }

  createAddress(address: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers, withCredentials: true};

    return this.http.post<any>(this.createAddressUrl, address, options).pipe(
      // map(response => response.data.data),
      // tap(data => this.currentUser = data),

      tap(response => {
        const user = response.data.data;
        this.currentUserSubject.next(user);
        return user;
      }),
      tap(data => console.log('new address', JSON.stringify(data))),
      catchError(err => this.handleError(err)))
  }

  deleteAddress(id: any): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers, withCredentials: true};

    return this.http.delete<any>(`${this.deleteAddressUrl}/${id}`, options).pipe(
      // tap(() => this.currentUser = null ),
      tap(data => console.log('address deleted: ', JSON.stringify(data))),
      catchError(err => this.handleError(err))
    )
  }

  createCart(id: string, quantity: number, color?: string): Observable<any> {
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
  getCart(totalAmt: number | null): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers, withCredentials: true };

    // const item = totalAmount !== null ? {totalAmount: JSON.stringify(totalAmount)} : '';

    const item = { totalAmt };

    console.log('item: ', JSON.stringify(item))

     return this.http.put<any>(this.getCartUrl, item, options).pipe(
      map(response => response.data),
      // tap(data => console.log('cartssssss: ', JSON.stringify(data))),
      catchError(this.handleError)
     )
  }

  updateCart(itemId: string, newQuantity: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers, withCredentials: true };
    
    const body = { itemId, newQuantity }
    console.log(body);

    return this.http.put<any>(this.updateCartUrl, body, options).pipe(
      map(response => response.data),
      tap(data => console.log('cart updated: ', JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  // placeOrder(): Observable<any> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   const options = { headers, withCredentials: true };

  //   return this.http.post<any>(this.placeOrderUrl, {}, options).pipe(
  //     map(data => data.res.url),
  //     catchError(this.handleError)
  //   )
  // }

  placeOrder(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers, withCredentials: true };

    return this.http.post<any>(this.placeOrderUrl, {}, options).pipe(
      map((data) => {
        if (data && data.res) {
          return data;
        } else {
          throw new Error('Invalid response format');
        }
      }),
      catchError(this.handleError)
    );
  }

  orderHistory(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers, withCredentials: true };

    return this.http.get<any>(this.orderHistoryrUrl,options).pipe(
      map(response => response.data.data),
      // tap(data => console.log('order history: ', JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  reviewProduct(comment: string, rating: number, id: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers, withCredentials: true };
    const body = { comment, rating }

    return this.http.post<any>(`${this.reviewUrl}/${id}/review `, body, options).pipe(
      map(response => response.data.data),
      catchError(this.handleError)
    )
  }

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
