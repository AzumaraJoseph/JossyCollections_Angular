import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { EMPTY, Observable, Subject, catchError, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Product } from './product';

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.css']
})
export class DialogueComponent implements OnInit {
  product$: Observable<Product> | undefined;

  errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];

      if (id) {
        this.productService.selectedProductChanged(id);
      } else {
        console.error('No product id provided in route parameters');
      }

      // this.productService.selectedProductChanged(id);
    });

    this.product$ = this.productService.product$.pipe(
      tap(data => console.log('data: ', JSON.stringify(data))),
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY
      })
    )

    
  }

  selectedProduct(id: string) {
    this.productService.selectedProductChanged(id);
  }

}
