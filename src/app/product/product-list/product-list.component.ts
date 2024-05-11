import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { EMPTY, Observable, Subject, catchError, shareReplay, tap } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  pageTitle!: string;
  products$: Observable<Product[]> | undefined

  errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  constructor(private productService: ProductService) { }


  ngOnInit(): void {
    this.pageTitle = 'Products You May Love!';

    // this.productService.products$.subscribe({
    //   next: product => this.products$ = product,
    //   error: catchError(err => this.errorMessage = err)
    // });

    this.products$ = this.productService.products$.pipe(
      shareReplay(1),
      tap(result => console.log(result)),
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );

    // this.products$ = this.productService.products$.pipe(
    //   map(products => products.map((product: any) => {
    //     return product.color
    //   })),
    //   tap(result => console.log(result)),
    //   catchError(err => {
    //     this.errorMessageSubject.next(err);
    //     return EMPTY;
    //   })
    // );

  }

  onProductChange(productId: string) {
    this.productService.selectedProductChanged(productId);
  }

}
