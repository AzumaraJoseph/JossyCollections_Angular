import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { EMPTY, Observable, Subject, catchError } from 'rxjs';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product$: Observable<Product> | undefined;
  errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.productService.selectedProductChanged(id);
    });

    this.product$ = this.productService.product$.pipe(
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    )
  }

  getColors(quantity: number): string {
    if(quantity > 200) {
      return 'black'
    } else if(quantity > 150 && quantity <= 200) {
      return 'orange'
    } else {
      return 'red'
    }
  }

}
