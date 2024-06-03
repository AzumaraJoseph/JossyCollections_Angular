import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$ = this.cartSubject.asObservable();

  private allCartSubject = new BehaviorSubject<any>({});
  allCart$ = this.cartSubject.asObservable();

  updateCart(cart: any[]): void {
    this.cartSubject.next(cart);
  }

  getCart(): Observable<any[]> {
    return this.cart$;
  }

  getTotalPrice(): Observable<number> {
    return this.cart$.pipe(
      map(items => items.reduce((total, item) => total + item.discountPrice * item.quantity, 0))
    );
  }
  
}
