import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { Iuser } from './user/user.component';
import { Observable, map, tap } from 'rxjs';
import { CartService } from './shared/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'Jossy-Third-Project';
  isClicked: boolean = false;
  currentUser: any;
  cart$!: Observable<any>;
  cartCount: any

  get isLoggedIn() {
    return this.auth.isLoggedIn;
  }

  get user() {
    return this.auth.currentUser;
  }
  

  isScrolledDown: boolean = false;
  lastScrollTop: number = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop

    if (currentScroll > this.lastScrollTop) {
      // Scroll down
      this.isScrolledDown = true;
    } else {
      // Scroll up
      this.isScrolledDown = false;
    }
    
    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }

  constructor(private router: Router, private elementRef: ElementRef, private auth: AuthService, private cdr: ChangeDetectorRef, private cartService: CartService ) { }
  
  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); // Scroll to top on navigation
      }  
    }); 

    // this.currentUser = this.currentUser ? this.user.firstName

    this.cartCounts()

  // this.cart$ = this.cartService.getCart()

    // this.updateCartIcon()
  
  }

  cartCounts() {
    this.auth.getCart(null).subscribe(cart => {
      this.cartCount = cart
      this.cdr.markForCheck(); // instead of refreshing the page to see changes, call this method and also make sure changedetection set to onPush is on

      console.log('cartBag', JSON.stringify(cart))

    }
      
    )
  }
  // updateCartIcon() {
  //   return this.auth.getCart(null).subscribe(data =>{
  //     this.cartCount = data.items.length
  //     this.cdr.markForCheck(); // Manually trigger change detection
  //     this.cdr.detectChanges()

  //   })
  // }


  toggleArrow(): void {
    this.isClicked = !this.isClicked;
  }
  
  logOut(): void {
    this.auth.logOut().subscribe(
      () => {
        this.router.navigate(['/login']);
        console.log('Log out success');
      }
    ); 
  }
} 
 
