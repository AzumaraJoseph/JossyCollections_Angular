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

    this.products$ = this.productService.products$.pipe(
      shareReplay(1),
      tap(result => console.log(result)),
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );

  }

}
