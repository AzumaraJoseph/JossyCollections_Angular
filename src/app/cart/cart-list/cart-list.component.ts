import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable, Subject, catchError, map, tap } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { Product } from 'src/app/product/product';
import { ProductService } from 'src/app/product/product.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  product$: Observable<Product> | undefined;
  quantity: number = 1;
  itemId!: string;
  allCart$!: Observable<any>;

  cartListForm!: NgForm;

  errorMessageSuject = new Subject<string>();
  errorMessage$ = this.errorMessageSuject.asObservable();


  constructor(private route: ActivatedRoute, private productService: ProductService, private auth: AuthService) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const id = params['id']
      this.product$ = this.productService.selectedProduct$(id).pipe(
        catchError(err => {
          this.errorMessageSuject.next(err)
          return EMPTY
        })
      )

    });
    // 66599d85e1963ec543de2669
    this.allCart$ = this.auth.getCart(this.itemId, this.quantity).pipe(
      map(data => data.items),
      tap(data => console.log('onlyArray: ', JSON.stringify(data))),
      catchError(err => {
        this.errorMessageSuject.next(err)
        return EMPTY
      })
    );

    // const FormData = this.cartForm.value;
    // this.auth.createCart(FormData.id, FormData.quantity, FormData.color).subscribe()

  }


  increment(maxQuantity: number): void {
    if (this.quantity < maxQuantity) this.quantity += 1;
  }
  
  decrement(): void {
    if(this.quantity > 0) this.quantity--;
      
   }
   
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
    this.auth.createCart(formData.id, formData.quantity, formData.color).subscribe(
      response => console.log('Added to cart', JSON.stringify(response)),
      error => console.error('Error:', error)
    );
  }
}
