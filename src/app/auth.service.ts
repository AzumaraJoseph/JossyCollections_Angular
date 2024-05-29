import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, map } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Iuser } from './user/user.component';

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

  currentUser!:any | null;


  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<Iuser> {
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers, withCredentials: true};
    const loginInfo = { email, password };

    return this.http.post<any>(this.loginUrl, loginInfo, options).pipe(
      // map(data=> data),
      tap(data => this.currentUser = data),
      tap(data => {
        console.log('Login successful:', JSON.stringify(data));
      }),
      catchError(this.handleError)
    );
  }

  getCurrentUser(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers, withCredentials: true};
  
    return this.http.get<any>(this.currentUserUrl, options).pipe(
      map(user => user.data.data),
      tap(cur => this.currentUser = cur),
      // tap(cur =>   console.log('Current user: ', JSON.stringify(cur))),
      catchError(this.handleError)
    );
  }
  
  signUp(name: string, email: string, password: string, confirmPassword: string, phone: number): Observable<any> {
    // const options = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers, withCredentials: true};
    const signupInfo = { name, email, password, confirmPassword, phone };

    return this.http.post<any>(this.signupUrl, signupInfo, options).pipe(
      tap(data => console.log('signup: ', JSON.stringify(data))
      ),
      catchError(this.handleError)
    );
  }


  logOut(): Observable<any> {
    // const options = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers, withCredentials: true};

    return this.http.post<any>(this.logOutUrl, {}, options).pipe(
      tap(() => this.currentUser = null ),
      catchError(this.handleError)
    );
  }

  get isLoggedIn() {
    return !!this.currentUser;
  }

  updateUser(user: Iuser): Observable<any> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers, withCredentials: true};
    const updateInfo = { ...this.currentUser, ...user };

    return this.http.patch<any>(this.updateUserUrl, updateInfo, options).pipe(
      map(update => update.data.user),
      // tap(data => console.log('updateUser: ', JSON.stringify(data))),
    catchError(err => this.handleError(err)))
  }

  createAddress(address: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers, withCredentials: true};
    return this.http.post<any>(this.createAddressUrl, address, options).pipe(catchError(err => this.handleError(err)))
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
