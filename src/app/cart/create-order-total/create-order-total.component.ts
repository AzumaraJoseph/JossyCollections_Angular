import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  totalShippingFee: number = 0;
  shippingFee: number = 5.99
  
  get currentUser() {
    return this.auth.currentUser
  }

  constructor(private cartService: CartService, private auth: AuthService) { }


  ngOnInit(): void {
    this.auth.getUser().subscribe(data => {
      this.user = data
    })

    this.loadCart();
    
  }

  loadCart() {
    this.auth.getCart(null).subscribe(data => {
      this.orderTotal = data;
      this.calculateTotalShippingFee()
      // this.cartService.updateCart(this.orderTotal.items)
      console.log('Order summary: ', JSON.stringify(this.orderTotal));
      
    });
  }

  calculateTotalShippingFee(): number | null {
    if (this.orderTotal && this.orderTotal.items) {
      return this.orderTotal.items.length * this.shippingFee;
    }
    return 0
    
  }
}
