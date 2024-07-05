import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, Subject, catchError, finalize, map, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { Product } from 'src/app/product/product';
import { CartService } from 'src/app/shared/cart.service';
import { ToastService } from 'src/app/shared/toast.service';
import { SpinnerService } from 'src/app/spinner.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartListComponent implements OnInit {

  product$: Observable<Product> | undefined;
  quantity: number = 1;
  quantities: { [key: string]: number } = {};
  itemId!: string;
  allCart!: any;
  cartQuantity!: number
  isLoadingQuantity: { [key: string]: boolean} = {};


  cartListForm!: NgForm;

  errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  errorMessage: string = '';


  constructor(private route: ActivatedRoute, private auth: AuthService, private cdr: ChangeDetectorRef, private cartService: CartService, private toastService: ToastService, private spinnerService: SpinnerService) { }

  ngOnInit(): void {

    // this.spinnerService.show();


    this.cartService.getTotalQuantity().pipe(
      finalize(() => {
        // Hide spinner after data fetch completes
        this.spinnerService.hide();
      }),
    ).subscribe(data => {this.cartQuantity = data
     console.log('cart list quantity: ', JSON.stringify(data));
    })

   this.loadCart()

  }

  loadCart(): void {
    this.auth.getCart(null).pipe(
      map(data => data),
      tap(data => {
        this.allCart = data;
        this.cartService.updateCart(this.allCart.items)
        // this.toastService.show('Cart list found succesfully', 'success');


        this.allCart.items.forEach((item: any) => {
          this.quantities[item._id] = item.quantity;

          this.cdr.markForCheck(); // instead of refreshing the page to see changes, call this method and also make sure changedetection set to onPush is on
        });
      }),      
      tap(data => console.log('Cart Object: ', JSON.stringify(data))),
      catchError(err => {
        this.errorMessage = err.message || 'An unknown error occurred';
        this.errorMessageSubject.next(this.errorMessage);

        console.error('Cart List error:', this.errorMessage);
        this.showToastError(this.errorMessage);
        this.spinnerService.hide();

        return EMPTY;
      }),
      finalize(() => {
        // Hide spinner after data fetch completes
        this.spinnerService.hide();
      }),
    ).subscribe();
  }

  // increment(itemId: string, maxQuantity: number): void {
  //   if (this.quantities[itemId] < maxQuantity) {
  //     this.quantities[itemId] += 1;
  //     this.updateCart(itemId, this.quantities[itemId]);
  //   }
  // }

  increment(cartId: string, maxQuantity: number): void {
    if (this.quantities[cartId] < maxQuantity) {
      this.isLoadingQuantity[cartId] = true;
      // this.spinnerService.show();
      setTimeout(() => {
      // this.spinnerService.hide();
      this.isLoadingQuantity[cartId] = false; 
      this.quantities[cartId] += 1;
      this.updateCart(cartId, this.quantities[cartId]);
      // this.showToast('One item(s) quantity added to cart');
      this.toastService.show('One item(s) quantity added to cart', 'info');
      }, 400);
    }
  }

  decrement(cartId: string): void {
    if (this.quantities[cartId] > 0) {
      this.isLoadingQuantity[cartId] = true;
      // this.spinnerService.show();
      setTimeout(() => {
      // this.spinnerService.hide();
      this.isLoadingQuantity[cartId] = false;
      this.quantities[cartId] -= 1;
      this.updateCart(cartId, this.quantities[cartId]);
      // this.showToast('One item(s) quantity removed from cart');
      this.toastService.show('One item(s) quantity removed from cart', 'info');

      }, 400);
    }
  }

  updateCart(itemId: string, newQuantity: number): void {
    this.auth.updateCart(itemId, Number(newQuantity)).pipe(
      tap(() => {
        console.log('Cart updated');

        if (newQuantity <= 0) {
          // Remove item from the allCart.items array
          this.allCart.items = this.allCart.items.filter((item: any) => item._id !== itemId);
          delete this.quantities[itemId];
          this.showToastSuccess();

        } else {
          // Update the quantity in the quantities dictionary
          this.quantities[itemId] = newQuantity;
          // this.showToast('One item(s) added to cart');

        }

      //  OR  const index = this.allCart.items.findIndex((item: any) => item._id === itemId);

      //   // Remove the item using splice if it exists
      //   if (index !== -1) {
      //     this.allCart.items.splice(index, 1);
      //   }
      //   delete this.quantities[itemId];
      // } else {
      //   // Update the quantity in the quantities dictionary
      //   this.quantities[itemId] = newQuantity;
      // }

      this.cartService.updateCart(this.allCart.items); // Update cart in CartService
        
        this.cdr.markForCheck(); // Manually trigger change detection
        this.loadCart();
      }),
      catchError(err => {
        const errorMessage = err.message || 'An unknown error occurred';
        this.errorMessageSubject.next(errorMessage);
        return EMPTY
      }
    ),
    finalize(() => {
      // Hide spinner after data fetch completes
      this.spinnerService.hide();
    })
  ).subscribe();
}

// refreshComponent(): void {
//   const currentUrl = this.router.url;
//   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
//     this.router.navigate([currentUrl]);
//   });
// }

// reload() {
//   this.auth.getCart(null).pipe(
//     map(data => data),
//     tap(data => console.log('onlyArray: ', JSON.stringify(data))),
//     catchError(err => {
//       this.errorMessageSuject.next(err)
//       return EMPTY
//     })
//   ).subscribe()}
   
   getColors(quantity: number): string {
    if(quantity > 110) {
      return 'black';
    } else if(quantity > 70 && quantity <= 110) {
      return 'orange';
    } else if(quantity === 0) {
      return 'grey';
    } else {
      return 'red';
    }
  }


  // save(cartListForm: NgForm) {
  //   console.log(cartListForm.value);
    
  //   if (cartListForm.valid) {
  //     this.addCart(cartListForm.value);
  //   } else {
  //     console.error('Form is invalid');
  //   }
  // }
  
  // addCart(formData?: any) {
  //   this.auth.createCart(formData.id, formData.quantity).subscribe(
  //     response => console.log('Added to cart', JSON.stringify(response)),
  //     error => console.error('Error:', error)
  //   );
  // }

  deleteProduct(itemId: string): void {
    this.auth.updateCart(itemId, 0).pipe(
      tap(() => {
        console.log('Cart updated');

        const index = this.allCart.items.findIndex((item: any) => item._id === itemId);

        if (index !== -1) {
          this.allCart.items.splice(index, 1);
          this.showToastSuccess();
        }

      this.cartService.updateCart(this.allCart.items); // Update cart in CartService
        
        this.cdr.markForCheck(); // Manually trigger change detection
        this.loadCart();
      }),
      catchError(err => {
        console.error('Load Cart error:', err.message);
        const errorMessage = err.message || 'An unknown error occurred';
        this.errorMessageSubject.next(errorMessage);
        this.showToastError(errorMessage);

        return EMPTY
      }),
      finalize(() => {
        // Hide spinner after data fetch completes
        this.spinnerService.hide();
      })).subscribe();
  }

  // showToast(message: string) {
  //   console.log('showToast in CartListComponent called with message:', message); // Debugging log
  //   this.toastService.show(message);
  // }

  showToastSuccess(): void {
    console.log('showToast in cartListComponent called with message'); // Debugging log
    // this.toastService.show(product);
    this.toastService.show('item(s) removed from cart successfully', 'success');

  }

  showToastError(message: string): void {
    console.log('showToastEror in ProductDetailComponent called with message:', message); // Debugging log
    // this.toastService.show(product);
    this.toastService.show(message, 'error');

  }
}
