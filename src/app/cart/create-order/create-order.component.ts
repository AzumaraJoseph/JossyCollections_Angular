import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { CartService } from 'src/app/shared/cart.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  user: any
  cartItems$!: Observable<any>;
  total!: number;
  allCart: any;
  shippingFee: number = 5.99;

  
  get currentUser() {
    return this.auth.currentUser
  }

  constructor( private cartService: CartService, private auth: AuthService) { }


  ngOnInit(): void {
    // this.auth.getUser().subscribe(data => {
    //   this.user = data
    // })

    this.cartItems$ = this.auth.getUser();

    console.log(this.currentUser);

    this.loadCart()
    
  }

  loadCart() {
    this.auth.getCart(null).subscribe(data => {
      this.allCart = data;
      this.cartService.updateCart(this.allCart.items)

      console.log('Cart list: ', JSON.stringify(this.allCart));
      
    });
  }


}
