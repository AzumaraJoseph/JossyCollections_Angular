import { Component, OnInit } from '@angular/core';
import { Observable, map, observable, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { CartService } from 'src/app/shared/cart.service';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-create-order-total',
  templateUrl: './create-order-total.component.html',
  styleUrls: ['./create-order-total.component.css']
})
export class CreateOrderTotalComponent implements OnInit {

  user: any
  orderTotal: any;
  totals!: number;
  totalShippingFee!: number;
  // shippingFee: number = 5.99
  loadOrderTotal$!: Observable<any>
  stripePromise: Promise<Stripe | null>;

  

  
  get currentUser() {
    return this.auth.currentUser
  }

  constructor(private cartService: CartService, private auth: AuthService) {
    this.stripePromise = loadStripe(
      'pk_test_51OusquKAHvC2BbJggPo38R5ZkMpSs3mYled2GhhJEPZPSGmSEb32FXm6dw8F20bBLIra31Ju4H7SVCFLMG9yyP5J00b1G6HlKw'
    );
   }


  ngOnInit(): void {
    this.auth.getUser().subscribe(data => {
      this.user = data
    })

    this.loadCart();

    // this.totalShippingFee = this.cartService.getTotalShippingFee();
    // this.totals = this.cartService.getTotal();

    // this.totalShippingFee = this.cartService.getTotalShippingFee();
    // console.log('hurrayyyy', this.totalShippingFee);
    


    // this.loadOrderTotal$ = this.auth.getCart(100).pipe(
    //   map(data => data ),
    //   tap(data => console.log('Order Total: ', JSON.stringify(data)))

    // )

    this.totalShippingFee = this.cartService.getTotalShippingFee();

      
    
  }

  loadCart() {
    this.auth.getCart(23).subscribe(data => {
      this.orderTotal = data;
      // this.calculateTotalShippingFee()
      console.log('Order total: ', JSON.stringify(this.orderTotal));

      console.log('shipping total: ', this.totalShippingFee);

      
      data.deliveryFee = this.totalShippingFee;
      console.log('delivery ', JSON.stringify(data.deliveryFee));
      
    });
  }

  // calculateTotalShippingFee(): number | null {

  //   if (this.orderTotal && this.orderTotal.items) {
  //     // Calculate the total shipping fee from the array items
  //     const totalFromItems = this.orderTotal.items.reduce((total: number, item: any) => {
  //         const fee = item.shippingFee || 0; // Ensure fee is a number, defaulting to 0 if not present
  //         return total + (typeof fee === 'number' ? fee : 0);
  //     }, 0);

  //     // Add the hardcoded shipping fee to the total
  //     return totalFromItems + this.shippingFee;
  // }
  //   return null
  
  // }


  // placeOrder() {
  //   this.auth.placeOrder().subscribe(
  //     tap(response => {
  //         console.log('Order placed successfully:', response);
  //     })
      
  // );  }

  placeOrders() {
    this.auth.placeOrder().pipe(
      tap((response) => {
        console.log('Order placed successfully:', response);
      })
    ).subscribe(
      () => {},
      (error) => {
        console.error('Order placement failed:', error);
      }
    );
  }


  placeOrder() {
    if (!this.auth.isLoggedIn) {
      console.log('please log in'); // Redirect to login if not authenticated
      // You might want to add actual redirection to a login page here
      // this.router.navigate(['/login']); // Uncomment if using Angular Router
    } else {
      this.auth.placeOrder().subscribe(async (response) => {
        const stripe = await this.stripePromise;
        console.log(response)
        if (stripe) {
          const sessionId = response.session;
          const { error } = await stripe.redirectToCheckout({ sessionId });
          if (error) {
            console.error('Error redirecting to checkout:', error);
          }
        } else {
          console.error('Stripe could not be loaded.');
        }
      });
    }
  }

}
