import { Component, OnInit } from '@angular/core';
import { Observable, Subject, shareReplay, catchError, EMPTY } from 'rxjs';
import { Product } from 'src/app/product/product';
import { ProductService } from 'src/app/product/product.service';

@Component({
  selector: 'app-cart-shell',
  templateUrl: './cart-shell.component.html',
  // template: `
  //   <div class="row justify-content-center" style="background-color: rgba(246, 246, 246, 0.982); margin-top: 4rem;" >
  //     <div class="col-md-7">
  //       <app-cart-list></app-cart-list>
  //     </div>
  //     <div class="col-md-3">
  //       <app-cart-total></app-cart-total>
  //     </div>
  //   </div>
  // `,
  styleUrls: ['./cart-shell.component.css']
})
export class CartShellComponent implements OnInit {

  pageTitle!: string;
  products$: Observable<Product[]> | undefined

  errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();


  constructor(private productService: ProductService) { }


  ngOnInit(): void {


    this.pageTitle = 'Recommended Products For You';

    this.products$ = this.productService.products$.pipe(
      shareReplay(1),
      // tap(result => console.log(result)),
      catchError(err => {
        console.error('Product List error:', err.message);
          const errorMessage = err.message || 'An unknown error occurred';
          this.errorMessageSubject.next(errorMessage);
        return EMPTY;
      })
    );

  }

}
