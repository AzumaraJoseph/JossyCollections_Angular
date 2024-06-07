import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, Subject, catchError, map, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { Product } from 'src/app/product/product';
import { ProductService } from 'src/app/product/product.service';
import { CartService } from 'src/app/shared/cart.service';

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

  cartListForm!: NgForm;

  errorMessageSuject = new Subject<string>();
  errorMessage$ = this.errorMessageSuject.asObservable();


  constructor(private route: ActivatedRoute, private auth: AuthService, private cdr: ChangeDetectorRef, private cartService: CartService) { }

  ngOnInit(): void {

    // this.route.params.subscribe(params => {
    //   const id = params['id']
    //   this.product$ = this.productService.selectedProduct$(id).pipe(
    //     catchError(err => {
    //       this.errorMessageSuject.next(err)
    //       return EMPTY
    //     })
    //   )
    // });


    // this.allCart$ = this.auth.getCart(null).pipe(
    //   map(data => data),
    //   tap(data => console.log('Cart Object: ', JSON.stringify(data))),
    //   catchError(err => {
    //     this.errorMessageSuject.next(err)
    //     return EMPTY
    //   })
    // )
    // 66599d85e1963ec543de2669

    this.cartService.getTotalQuantity().subscribe(data => {this.cartQuantity = data
     console.log('cart list quantity: ', JSON.stringify(data));
    })

   this.loadCart()


  }

  loadCart() {
    this.auth.getCart(null).subscribe(data => {
      this.allCart = data;
      this.cartService.updateCart(this.allCart.items)

      this.allCart.items.forEach((item: any) => {
        this.quantities[item._id] = item.quantity;

        this.cdr.markForCheck(); // instead of refreshing the page to see changes, call this method and also make sure changedetection set to onPush is on
      });

      console.log('Cart list: ', JSON.stringify(this.allCart));
      
    });
  }

  increment(itemId: string, maxQuantity: number): void {
    if (this.quantities[itemId] < maxQuantity) {
      this.quantities[itemId] += 1;
      this.updateCart(itemId, this.quantities[itemId]);
    }
  }

  decrement(itemId: string): void {
    if (this.quantities[itemId] > 0) {
      this.quantities[itemId] -= 1;
      this.updateCart(itemId, this.quantities[itemId]);
    }
  }

  updateCart(itemId: string, newQuantity: number) {
    this.auth.updateCart(itemId, Number(newQuantity)).pipe(
      tap(() => {
        console.log('Cart updated');

        if (newQuantity <= 0) {
          // Remove item from the allCart.items array
          this.allCart.items = this.allCart.items.filter((item: any) => item._id !== itemId);
          delete this.quantities[itemId];
        } else {
          // Update the quantity in the quantities dictionary
          this.quantities[itemId] = newQuantity;
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
        this.errorMessageSuject.next(err)
        return EMPTY
      }
    )
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


   save(cartListForm: NgForm) {
    console.log(cartListForm.value);
    
    if (cartListForm.valid) {
      this.addCart(cartListForm.value);
    } else {
      console.error('Form is invalid');
    }
  }
  
  addCart(formData?: any) {
    this.auth.createCart(formData.id, formData.quantity).subscribe(
      response => console.log('Added to cart', JSON.stringify(response)),
      error => console.error('Error:', error)
    );
  }

  deleteProduct(itemId: string) {
    this.auth.updateCart(itemId, 0).pipe(
      tap(() => {
        console.log('Cart updated');

        const index = this.allCart.items.findIndex((item: any) => item._id === itemId);

        if (index !== -1) {
          this.allCart.items.splice(index, 1);
        }

      this.cartService.updateCart(this.allCart.items); // Update cart in CartService
        
        this.cdr.markForCheck(); // Manually trigger change detection
        this.loadCart();
      }),
      catchError(err => {
        this.errorMessageSuject.next(err)
        return EMPTY
      }
    )
  ).subscribe();
  }
}
