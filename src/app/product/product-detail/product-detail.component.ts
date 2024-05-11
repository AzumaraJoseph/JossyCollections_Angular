import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { EMPTY, Observable, Subject, catchError, empty, observable, shareReplay, tap } from 'rxjs';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productColors$: Observable<any[]> | undefined;
  Colors$: Observable<any[]> | undefined;

  product$: Observable<Product> | undefined;
  relatedProduct$: Observable<Product[]> | undefined;
  errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const id = params['id'];
      this.productService.selectedProductChanged(id);
    });


    // this.productService.relatedProduct$.subscribe()

    this.relatedProduct$ = this.productService.relatedProduct$.pipe(
      catchError(err => {
        //tap( result=> console.log('related: ', JSON.stringify(result))),
        this.errorMessageSubject.next(err);
        return EMPTY
      })
    );

    this.product$ = this.productService.product$.pipe(
      shareReplay(1),
      // tap( result=> console.log('id: ', JSON.stringify(result))),
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );

    // this.productColors$ = this.productService.products$.pipe(
    //   map(products => {
    //       const colors: any[] = [];
    //       products.forEach((product: { color: any[]; }) => {
    //           if (product.color) {
    //               product.color.forEach(color => {
    //                   colors.push(color);
    //               });
    //           }
    //       });
    //       return colors;
    //   }),
    //   tap(result => console.log('colors: ', JSON.stringify(result)))
    // );

    

    

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

  selectedProduct(id: string) {
    this.productService.selectedProductChanged(id);
  }

}
