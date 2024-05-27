import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable, Subject, catchError } from 'rxjs';
import { Product } from 'src/app/product/product';
import { ProductService } from 'src/app/product/product.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  product$: Observable<Product> | undefined;

  quantity = 1;

  errorMessageSuject = new Subject<string>();
  errorMessage$ = this.errorMessageSuject.asObservable();


  constructor(private route: ActivatedRoute, private productService: ProductService) { }

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
  }


  increment(maxQuantity: number): void {
    if (this.quantity < maxQuantity) this.quantity += 1;
  }
  
  decrement(): void {
    if(this.quantity > 1) this.quantity--;
      
   }
}
