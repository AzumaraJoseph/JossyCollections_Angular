import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Iuser } from '../user/user.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://127.0.0.1:5000/api/v1/user/login';
  private signupUrl = 'http://127.0.0.1:5000/api/v1/user/signup';
  private logOutUrl = 'http://127.0.0.1:5000/api/v1/user/logout';

  constructor(private http: HttpClient) { }

  currentUser!: Iuser | null;

  login(email: string, password: string): Observable<Iuser> {
    const options = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };
    const loginInfo = { email, password };

    return this.http.post<Iuser>(this.loginUrl, loginInfo, options).pipe(
      tap(data => {
        this.currentUser = data; // Assuming the backend returns user data on successful login
        console.log('Login successful:', JSON.stringify(data));
      }),
      catchError(this.handleError)
    );
  }

  // login(email: string, password: string) {

  //   const options = { headers: new HttpHeaders({'Content-Type': 'application/json'}) }
  //   const loginInfo = { email, password }

  //   return this.http.post(this.loginUrl, loginInfo, options).pipe(
  //     tap(result => console.log('login: ', JSON.stringify(result))
  //     ),
  //     // tap(data => {
  //     //   if(data instanceof Object) {
  //     //     this.currentUser = <Iuser>data;
  //     //   }
  //     // }),
  //     // tap(result => console.log('login: ', JSON.stringify(result))
  //     // ),
  //     // catchError(err => this.handleError(err))
  //   );
  // }

  signUp(name: string, email: string, password: string, confirmPassword: string, phone: number) {
    const options = { headers: new HttpHeaders({'Content-Type': 'application/json'}) }
    const signupInfo = { name, email, password, confirmPassword, phone };

    return this.http.post(this.signupUrl, signupInfo, options).pipe(
      // tap(create => console.log('create: ' + JSON.stringify(create))),
      catchError(this.handleError)
    )
  }

  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  logOut() {
    // update the ui of the logout
    this.currentUser = null;

        // update the server of the logout
    const options = { headers: new HttpHeaders({'Content-Type': 'application/json'}) }
    return this.http.post<Iuser>(this.logOutUrl, options);

    // const logoutInfo = { email: this.currentUser.email, password: this.currentUser.password };
  }

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
