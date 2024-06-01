import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { CartService } from 'src/app/shared/cart.service';

@Component({
  selector: 'app-cart-total',
  templateUrl: './cart-total.component.html',
  styleUrls: ['./cart-total.component.css']
})
export class CartTotalComponent implements OnInit {
  totalPrice$!: Observable<any>;

  constructor(private auth: AuthService, private cartService: CartService) { }

  ngOnInit(): void {
    this.totalPrice$ = this.cartService.getTotalPrice(); // Subscribe to total price observable
    console.log('whilst: ', JSON.stringify(this.totalPrice$));
    
  } 

}
