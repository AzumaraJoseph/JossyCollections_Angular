import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { Iuser } from './user/user.component';
import { EMPTY, Observable, Subject, catchError, map, tap } from 'rxjs';
import { CartService } from './shared/cart.service';
import { AuthGuard } from './auth.guard';
import { ToastService } from './shared/toast.service';
import { SpinnerService } from './spinner.service';
import { slideInAnimation } from './app.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'Jossy-Third-Project';
  isClicked: boolean = false;
  currentUser: any;
  cart$!: Observable<any>;
  cartCount!: number;
  user: any;
  // isLoggedIn = false;

  loading: boolean = true;

  errorMessageSubject = new Subject<string>();
  errorMessage$: Observable<string> = this.errorMessageSubject.asObservable();

  errorMessage: string = '';

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn;
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

  constructor(private router: Router, private elementRef: ElementRef, private auth: AuthService, private cdr: ChangeDetectorRef, private cartService: CartService, private toastService: ToastService, private spinnerService: SpinnerService ) {
    
    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });

   }

  ngOnInit(): void {

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); // Scroll to top on navigation
      }  
      
    }); 


     //Subscribe to currentUser$ to always have the latest user data
    this.auth.currentUser$.subscribe(user => {
      this.user = user;
      // this.isLoggedIn;
      // console.log('User data:', JSON.stringify(this.user));
    });


    if (this.isLoggedIn) {
      this.auth.getUser().subscribe(response => {
        this.user = response
        // console.log('hahahahahaa', JSON.stringify(this.user));
      })
    }

    // this.currentUser = this.currentUser ? this.user.firstName

    this.cartCounts()

  this.cartService.getTotalQuantity().subscribe(data => {
    this.cartCount = data
    // console.log('cartBag', JSON.stringify(data));

  })

    // this.updateCartIcon()
  
  }

  cartCounts() {
    this.auth.getCart(null).pipe(
      tap(cart => {
      this.cartCount = cart.totalQuantityOrdered;
      this.cdr.markForCheck(); // instead of refreshing the page to see changes, call this method and also make sure changedetection set to onPush is on

      // console.log('cartBag', JSON.stringify(cart))

    }),
    catchError(err => {
      this.errorMessage = err.message || 'An unknown error occurred';
      this.errorMessageSubject.next(this.errorMessage);
      this.showToastError(this.errorMessage);

      console.error('Cart count error:', this.errorMessage);
      // this.showToast(this.errorMessage)
      return EMPTY;
    })
    ).subscribe();
  }


  toggleArrow(): void {
    this.isClicked = !this.isClicked;
  }

  switch() {
    if (this.isLoggedIn) {
      this.router.navigate(['/cart']);
    } else {
      this.router.navigate(['/user/login']);
    }
  }
  
  logOut(): void {
    this.auth.logOut().subscribe(
      () => {
        this.router.navigate(['/login']);
        console.log('Log out success');
      }
    ); 
  }

  // showToast(message: string) {
  //   console.log('showToast in CartIconComponent called with message:', message); // Debugging log
  //   if (this.cartCount > 0) {
  //     this.toastService.show(message);
  //   }
  // }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    } 
    if ( routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

  // routeToCart() {
  //   if (this.isLoggedIn) {
  //     this.router.navigate(['/cart']);
  //     this.showToastSuccess('Item(s) found in cart')
  //   }
  // }

  // showToastSuccess(message: string) {
  //   console.log('showToast in ProductDetailComponent called with message:', message); // Debugging log
  //   // this.toastService.show(message);
  //   this.toastService.show(message, 'success');

  // }

  showToastError(message: string) {
    console.log('showToastEror in appComponent called with message:', message); // Debugging log
    // this.toastService.show(product);
    this.toastService.show(message, 'error');

  }
  
} 
 
