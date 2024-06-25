import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EMPTY, Observable, Subject, catchError, finalize, map, observable, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { CartService } from 'src/app/shared/cart.service';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toast.service';
import { SpinnerService } from 'src/app/spinner.service';

@Component({
  selector: 'app-create-order-total',
  templateUrl: './create-order-total.component.html',
  styleUrls: ['./create-order-total.component.css']
})
export class CreateOrderTotalComponent implements OnInit {

  user: any;
  orderTotal: any;
  totals!: number;
  totalShippingFee!: number;
  loadOrderTotal$!: Observable<any>;
  stripePromise: Promise<Stripe | null>;

  errorMessageSubject = new Subject<string>();
  errorMessage$: Observable<string> = this.errorMessageSubject.asObservable();

  errorMessage: string = '';

  address$!: Observable<any>;
  addresses: any[] =[];

  
  // get currentUser() {
  //   return this.auth.currentUser
  // }

  constructor(private cartService: CartService, private auth: AuthService, private route: ActivatedRoute, private cdr: ChangeDetectorRef, private toastService: ToastService, private spinnerService: SpinnerService, private router: Router) {
    this.stripePromise = loadStripe(
      'pk_test_51OusquKAHvC2BbJggPo38R5ZkMpSs3mYled2GhhJEPZPSGmSEb32FXm6dw8F20bBLIra31Ju4H7SVCFLMG9yyP5J00b1G6HlKw'
    );
    
   }

  ngOnInit(): void {

    this.totalShippingFee = this.cartService.getTotalShippingFee();
    console.log('total', this.totalShippingFee);
    
    this.loadCart();

  //  this.loadOrderTotal$ =     this.auth.getCart(this.totalShippingFee).pipe(
  //   tap(data => console.log('Order total: ', JSON.stringify(data)))
  //  )

    this.auth.getUser().pipe(
      tap(response => {
        this.addresses = response.addresses;
      })
    ).subscribe()

  }

  loadCart() {
    this.auth.getCart(this.totalShippingFee).subscribe(data => {
      finalize(() => {
        // Hide spinner after data fetch completes
        this.spinnerService.hide();
      }),
      this.orderTotal = data;
      console.log('Order total: ', JSON.stringify(this.orderTotal));

      // console.log('shipping total: ', this.totalShippingFee);

      
      this.totalShippingFee
      // console.log('delivery ', JSON.stringify(this.totalShippingFee));

      this.cdr.detectChanges()
      
    });
  }

  // placeOrder() {
  //   if (!this.auth.isLoggedIn) {
  //     console.log('please log in'); // Redirect to login if not authenticated
  //     // You might want to add actual redirection to a login page here
  //     // this.router.navigate(['/login']); // Uncomment if using Angular Router
  //   } else {
  //     this.auth.placeOrder().subscribe(async (response) => {
  //       const stripe = await this.stripePromise;
  //       console.log(response)
  //       if (stripe) {
  //         const sessionId = response.session;
  //         const { error } = await stripe.redirectToCheckout({ sessionId });
  //         if (error) {
  //           console.error('Error redirecting to checkout:', error);
  //         }
  //       } else {
  //         console.error('Stripe could not be loaded.');
  //       }
  //     });
  //   }
  // }

  placeOrder() {
    this.spinnerService.show();

    if (this.addresses.length) {
      setTimeout(() => {
        this.auth.placeOrder().pipe(
          tap(async (response) => {
  
            
            const stripe = await this.stripePromise;
            console.log(response)
            if (stripe) {
              this.showToastSuccess()
              const sessionId = response.session;
              this.spinnerService.hide()
              const { error } = await stripe.redirectToCheckout({ sessionId });
              if (error) {
                console.error('Error redirecting to checkout:', error);
              }
            } else {
              console.error('Stripe could not be loaded.');
            }
          }),
          catchError(err => {
            this.errorMessage = err.message || 'An unknown error occurred';
            this.errorMessageSubject.next(this.errorMessage);
  
            console.error('Create Order Total error:', this.errorMessage);
            this.spinnerService.hide()

            this.showToastError(this.errorMessage);

            return EMPTY;
          }),
          finalize(() => {
            // Hide spinner after data fetch completes
            this.spinnerService.hide();
          }),
        ).subscribe();
        
      }, 250);
    } else {
      // this.spinnerService.show()
      this.auth.setRedirectUrl('/order');
      setTimeout(() => {
        this.spinnerService.hide()
        this.toastService.show('No shipping address yet', 'warning')
        this.router.navigate(['/user/addressLink']);
        
      }, 1500);
    }
  }

  // showToast(message: string) {
  //   console.log('showToast in OrderTotalComponent called with message:', message); // Debugging log
  //   this.toastService.show(message);
  // }

  showToastSuccess() {
    console.log('showToast in OrderListComponent called with message'); // Debugging log
    // this.toastService.show(product);
    this.toastService.show('Proceed to make payment', 'success');

  }

  showToastError(message: string) {
    console.log('showToastEror in ProductDetailComponent called with message:', message); // Debugging log
    // this.toastService.show(product);
    this.toastService.show(message, 'error');

  }

}
