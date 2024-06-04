import { Component, OnInit } from '@angular/core';
import { Observable, map, observable, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { CartService } from 'src/app/shared/cart.service';

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
  shippingFee: number = 5.99
  loadOrderTotal$!: Observable<any>

  
  get currentUser() {
    return this.auth.currentUser
  }

  constructor(private cartService: CartService, private auth: AuthService) { }


  ngOnInit(): void {
    this.auth.getUser().subscribe(data => {
      this.user = data
    })

    this.loadCart();

    // this.totalShippingFee = this.cartService.getTotalShippingFee();
    // console.log('hurrayyyy', this.totalShippingFee);
    


    // this.loadOrderTotal$ = this.auth.getCart(100).pipe(
    //   map(data => data ),
    //   tap(data => console.log('Order Total: ', JSON.stringify(data)))

    // )
      
    
  }

  loadCart() {
    this.auth.getCart(14).subscribe(data => {
      this.orderTotal = data;
      this.calculateTotalShippingFee()
      console.log('Order total: ', JSON.stringify(this.orderTotal));

      this.totalShippingFee = this.cartService.getTotalShippingFee();
      console.log('shipping total: ', this.totalShippingFee);

      
      data.deliveryFee = this.totalShippingFee;
      console.log('delivery ', JSON.stringify(data.deliveryFee));
      
    });
  }

  calculateTotalShippingFee(): number | null {

    if (this.orderTotal && this.orderTotal.items) {
      // Calculate the total shipping fee from the array items
      const totalFromItems = this.orderTotal.items.reduce((total: number, item: any) => {
          const fee = item.shippingFee || 0; // Ensure fee is a number, defaulting to 0 if not present
          return total + (typeof fee === 'number' ? fee : 0);
      }, 0);

      // Add the hardcoded shipping fee to the total
      return totalFromItems + this.shippingFee;
  }
    return null
  
  }


  placeOrder() {
    this.auth.placeOrder().subscribe(
      tap(response => {
          console.log('Order placed successfully:', response);
      })
      
  );  }

}
