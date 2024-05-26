// import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
// import { Iuser } from '../user/user.component';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   private loginUrl = 'http://127.0.0.1:5000/api/v1/user/login';
//   private signupUrl = 'http://127.0.0.1:5000/api/v1/user/signup';
//   private logOutUrl = 'http://127.0.0.1:5000/api/v1/user/logout';

//   private currentUserSubject: BehaviorSubject<Iuser | null> = new BehaviorSubject<Iuser | null>(null);
//   currentUser$: Observable<Iuser | null> = this.currentUserSubject.asObservable();


//   constructor(private http: HttpClient) { }

//   currentUser: Iuser | null = null;

//   login(email: string, password: string): Observable<Iuser> {
//     const options = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };
//     const loginInfo = { email, password };

//     return this.http.post<Iuser>(this.loginUrl, loginInfo, options).pipe(
//       tap(data => {
//         this.currentUserSubject.next(data);
//         console.log('Login successful:', JSON.stringify(data));
//       }),
//       catchError(this.handleError)
//     );
//   }

//   // login(email: string, password: string) {

//   //   const options = { headers: new HttpHeaders({'Content-Type': 'application/json'}) }
//   //   const loginInfo = { email, password }

//   //   return this.http.post(this.loginUrl, loginInfo, options).pipe(
//   //     tap(result => console.log('login: ', JSON.stringify(result))
//   //     ),
//   //     // tap(data => {
//   //     //   if(data instanceof Object) {
//   //     //     this.currentUser = <Iuser>data;
//   //     //   }
//   //     // }),
//   //     // tap(result => console.log('login: ', JSON.stringify(result))
//   //     // ),
//   //     // catchError(err => this.handleError(err))
//   //   );
//   // }

//   signUp(name: string, email: string, password: string, confirmPassword: string, phone: number): Observable<Iuser> {
//     const options = { headers: new HttpHeaders({'Content-Type': 'application/json'}) }
//     const signupInfo = { name, email, password, confirmPassword, phone };

//     return this.http.post<Iuser>(this.signupUrl, signupInfo, options).pipe(
//       tap(data => {
//         this.currentUser = data;
//       }),
//       // tap(create => console.log('create: ' + JSON.stringify(create))),
//       catchError(this.handleError)
//     )
//   }

//   // getCurrentUser(): Iuser | null {
//   //   return this.currentUser;
//   // }
  

//   // get isLoggedIn(): boolean {
//   //   return !!this.currentUser;
//   // }


//   getCurrentUser(): Iuser | null {
//     return this.currentUserSubject.value;
//   }

//   get isLoggedIn(): boolean {
//     return !!this.currentUserSubject.value;
//   }


//   logOut() {
//     // update the ui of the logout
//     this.currentUser = null;

//         // update the server of the logout
//     const options = { headers: new HttpHeaders({'Content-Type': 'application/json'}) }
//     return this.http.post<Iuser>(this.logOutUrl, options);

//     // const logoutInfo = { email: this.currentUser.email, password: this.currentUser.password };
//   }

//   private handleError(err: HttpErrorResponse): Observable<never> {
//     // in a real world app, we may send the server to some remote logging infrastructure
//     // instead of just logging it to the console
//     let errorMessage: string;
//     if (err.error instanceof ErrorEvent) {
//       // A client-side or network error occurred. Handle it accordingly.
//       errorMessage = `An error occurred: ${err.error.message}`;
//     } else {
//       // The backend returned an unsuccessful response code.
//       // The response body may contain clues as to what went wrong,
//       errorMessage = `Backend returned code ${err.status}: ${err.message}`;
//     }
//     console.error(err);
//     return throwError(() => errorMessage);
//   }
// }




import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
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

  currentUser: Iuser | null = null;
  private token: string | null = null;  


  private currentUserSubject: BehaviorSubject<Iuser | null> = new BehaviorSubject<Iuser | null>(null);

  currentUsera$: Observable<Iuser | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  options = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };


  // currentUser$ = this.http.get<Iuser>(this.currentUserUrl, this.options).pipe(
  //   tap(user => console.log('current: ', JSON.stringify(user))
  //   ),
  // ).subscribe()


//  current(): Observable<Iuser> {
//   // const options = { headers: new HttpHeaders({'Content-Type': 'application/json'}), withCedentials: true }

//   const options = { 
//     headers: new HttpHeaders({ 'Content-Type': 'application/json' }),  withCredentials: true };

//   return this.http.get<Iuser>(this.currentUserUrl, options).pipe(
//     tap(cur => console.log('cur: ', JSON.stringify(cur))
//     )
//   )
//  }



current(): Observable<Iuser> {
  if (!this.token) {
    return throwError(() => new Error('No authentication token found'));
  }

  const options = { 
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    }),
    withCredentials: true 
  };

  return this.http.get<Iuser>(this.currentUserUrl, options).pipe(
    tap(cur => {
      this.currentUser = cur;
      console.log('Current user: ', JSON.stringify(cur));
    }),
    catchError(this.handleError)
  );
}


  login(email: string, password: string): Observable<Iuser> {
    const options = { headers: new HttpHeaders({'Content-Type': 'application/json'}), withCredentials: true };
    const loginInfo = { email, password };

    return this.http.post<Iuser>(this.loginUrl, loginInfo, options).pipe(
      tap(data => {
        this.currentUserSubject.next(data);
        console.log('Login successful:', JSON.stringify(data));
      }),
      catchError(this.handleError)
    );
  }

  signUp(name: string, email: string, password: string, confirmPassword: string, phone: number): Observable<Iuser> {
    const options = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };
    const signupInfo = { name, email, password, confirmPassword, phone };

    return this.http.post<Iuser>(this.signupUrl, signupInfo, options).pipe(
      tap(data => {
        this.currentUserSubject.next(data);
      }),
      catchError(this.handleError)
    );
  }


  logOut(): Observable<void> {
    const options = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<void>(this.logOutUrl, {}, options).pipe(
      tap(() => {
        this.currentUserSubject.next(null);
      }),
      catchError(this.handleError)
    );
  }


  getCurrentUser(): Iuser | null {
    return this.currentUserSubject.value;
  }

  get isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  // logOut(): void {
  //   this.currentUserSubject.next(null);
  // }

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
