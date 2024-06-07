import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  // shippingFee: number = 5.99;

  // totalShippingFee: number = 0;
  shippingFeePerItem: number = 5.99;

  
  get currentUser() {
    return this.auth.currentUser
  }

  constructor( private cartService: CartService, private auth: AuthService, private router: Router) { }


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
      // this.shippingFee
      this.calculateTotalShippingFee()
      
      // console.log('Cart list: ', JSON.stringify(this.allCart));
      
    });
  }

  calculateTotalShippingFee() {
      const totalShippingFee = this.allCart.items.reduce((sum: number, item: { discountPrice: number; quantity: number}) => {
        return sum + (item.discountPrice * item.quantity <= 55 ? this.shippingFeePerItem : 0);
      }, 0);
      console.log('shipping order: ', JSON.stringify(totalShippingFee));
      
  
      return this.cartService.setTotalShippingFee(totalShippingFee);
    }

  todaysDateRange(): string[] {
    const date = new Date();
    
    // Today's date
    const day = date.getDate();
    const month = date.getMonth(); // January is 0!
    const todayWithSuffix = `${this.getDaySuffix(day)} ${this.getMonthName(month)}`;
    
    // Date three days after today
    const futureDate = new Date(date);
    futureDate.setDate(date.getDate() + 3);
    const futureDay = futureDate.getDate();
    const futureMonth = futureDate.getMonth();
    const futureWithSuffix = `${this.getDaySuffix(futureDay)} ${this.getMonthName(futureMonth)}`;
    
    return [`${todayWithSuffix} and ${futureWithSuffix}.`];
  }
  
  getDaySuffix(day: number): string {
    if (day > 10 && day < 20) return `${day}th`; // 11-19 are always "th"
    switch (day % 10) {
      case 1: return `${day}st`;
      case 2: return `${day}nd`;
      case 3: return `${day}rd`;
      default: return `${day}th`;
    }
  }
  
  getMonthName(month: number): string {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[month];
  }
  
}
