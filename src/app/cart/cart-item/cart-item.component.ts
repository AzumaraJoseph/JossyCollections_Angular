import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, catchError, EMPTY } from 'rxjs';
import { Product } from 'src/app/product/product';
import { ProductService } from 'src/app/product/product.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  product$: Observable<Product> | undefined;

  quantity = 1;

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();


  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const id = params['id']
      this.product$ = this.productService.selectedProduct$(id).pipe(
        catchError(err => {
          console.error('Cart Item error:', err.message);
          const errorMessage = err.message || 'An unknown error occurred';
          this.errorMessageSubject.next(errorMessage);          
          return EMPTY
        })
      )

    });
  }


  increment(maxQuantity: number): void {
    if (this.quantity < maxQuantity) this.quantity += 1;
  }
  
  decrement(): void {
    if(this.quantity > 1) this.quantity--;
      
   }

}
