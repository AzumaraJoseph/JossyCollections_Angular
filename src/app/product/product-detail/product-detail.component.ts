import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { EMPTY, Observable, Subject, catchError, shareReplay, tap } from 'rxjs';
import { Product } from '../product';
import { ActivatedRoute, Router } from '@angular/router';
// import bootstrap from 'bootstrap'; // Import Bootstrap JavaScript (if not already imported)

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit {
  // @ViewChild('exampleModal') modalElement!: any; // Use ViewChild to get a reference to the modal element


  // product$: Observable<Product> | undefined;
  selectProduct$: Observable<Product> | undefined;
  relatedProducts$: Observable<Product[]> | undefined;
  index: number = 0;
  quantity: number = 1;

  errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const id = params['id'];

      // This is no lnger relavant, cos i am not using new subject/behaviourSubject observables 
      // this.selectedProduct(id);

      // this.openRelated(id);

      this.selectProduct$ = this.productService.selectedProduct$(id).pipe(
        shareReplay(1),
        tap(product => console.log('single product: ', JSON.stringify(product))
        ),
        catchError(err => {
          this.errorMessageSubject.next(err);
          return EMPTY
        })
      )

      this.relatedProducts$ = this.productService.relatedProduct$(id).pipe(
        shareReplay(1),
        // tap( result=> console.log('related: ', JSON.stringify(result))),
        catchError(err => {
          this.errorMessageSubject.next(err);
          return EMPTY;
        })
      );

    });

    // this.product$ = this.productService.product$.pipe(
    //   shareReplay(1),
    //   // tap( result=> console.log('id: ', JSON.stringify(result))),
    //   catchError(err => {
    //     this.errorMessageSubject.next(err);
    //     return EMPTY;
    //   })
    // );

  }

  openRelated(id: string) {
    this.router.navigate(['/products', id]);
  }

  eachProduct(index: number) {
    this.index = index;
  }

increment(add: number): void {
  if (this.quantity < add) this.quantity += 1;
}

decrement(): void {
  if(this.quantity > 1) this.quantity--;
    
 }

  //   // To programmatically scroll the detail page to the top when a related product is clicked, you can use the window.scrollTo() method provided by the browser's window object. You can call this method with 0 as both the x and y coordinates to scroll the page to the top. 

  // it has been implemented in the root app component
  // scrollTop(): void {
  //   window.scrollTo(0, 0);

  getColors(quantity: number): string {
    if(quantity > 200) {
      return 'black';
    } else if(quantity > 100 && quantity <= 200) {
      return 'orange';
    } else if(quantity === 0) {
      return 'grey';
    } else {
      return 'red';
    }
  }

  // No longer using this, cos im not using new behaviorsubject and next from the product service

  // selectedProduct(id: string) {
  //   this.productService.selectedProductChanged(id);
  // }


  // openModal() {
  //   // Open the Bootstrap modal dialog
  //   if (this.modalElement) {
  //     const modal = new bootstrap.Modal(this.modalElement.nativeElement);
  //     modal.show();
  //   }
  // }
  
  // closeModal() {
  //   // Close the Bootstrap modal dialog
  //   if (this.modalElement) {
  //     const modal = new bootstrap.Modal(this.modalElement.nativeElement);
  //     modal.hide();
  //   }
  // }
  

}


