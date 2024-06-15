import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { CartService } from 'src/app/shared/cart.service';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-cart-total',
  templateUrl: './cart-total.component.html',
  styleUrls: ['./cart-total.component.css']
})
export class CartTotalComponent implements OnInit {
  totalPrice$!: Observable<any>;
  totalQuantity!: number;


  constructor(private auth: AuthService, private cartService: CartService, private router: Router, private toastService: ToastService) { }

  ngOnInit(): void {
    this.totalPrice$ = this.cartService.getTotalPrice().pipe(
      tap(data => console.log('Total: ', JSON.stringify(data)))
    ); // Subscribe to total price observable

    this.cartService.getTotalQuantity().subscribe(data => this.totalQuantity = data); // Subscribepipe to total price observable
 
  } 

  routeToOrder() {
    setTimeout(() => {
      this.router.navigate(['/order']);
      this.showToast('Order created successfully')
    }, 1000); // Adjust the timeout as needed
  }

  showToast(message: string) {
    console.log('showToast in LoginComponent called with message:', message); // Debugging log
    this.toastService.show(message);
  }

}
