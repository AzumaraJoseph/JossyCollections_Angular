import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { EMPTY, Observable, Subject, catchError, finalize, shareReplay } from 'rxjs';
import { Product } from '../product';
import { ActivatedRoute, Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { ToastService } from 'src/app/shared/toast.service';
import { SpinnerService } from 'src/app/spinner.service';
// import bootstrap from 'bootstrap'; // Import Bootstrap JavaScript (if not already imported)

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit {

  selectProduct$: Observable<Product> | undefined;
  relatedProducts$: Observable<Product[]> | undefined;
  index: number = 0;
  quantity: number = 1;

  stars: number[] = [5, 4, 3, 2, 1];

  errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  errorMessage: string = '';

  constructor(private productService: ProductService, private toastService: ToastService, private route: ActivatedRoute, private router: Router, private auth: AuthService, private spinnerService: SpinnerService) { }

  ngOnInit(): void {

    // this.router.events.subscribe((event: Event) => {
    //   if (event instanceof NavigationStart) {
    //     this.spinnerService.show();
    //     console.log('Spinner navStart');
    //   } else if (
    //     event instanceof NavigationEnd ||
    //     event instanceof NavigationCancel ||
    //     event instanceof NavigationError
    //   ) {
    //     // this.spinnerService.hide();
    //     console.log('Spinner navEnd');
    //     setTimeout(() => {
    //           this.spinnerService.hide();
    //           console.log('Spinner navEnd');
    //           // Hide spinner after 5 seconds
    //         }, 10000);
    //   }        
    // }); 

    this.spinnerService.show();

    this.route.params.subscribe(params => {
      const id = params['id'];

      // This is no lnger relavant, cos i am not using new subject/behaviourSubject observables 
      // this.selectedProduct(id);

      // this.openRelated(id);

      this.selectProduct$ = this.productService.selectedProduct$(id).pipe(
        finalize(() => {
          // Hide spinner after data fetch completes
          this.spinnerService.hide();
        }),
        shareReplay(1),
        // tap(product => console.log('single product: ', JSON.stringify(product))),
        catchError(err => {
          console.error('Single Product error:', err.message);
          this.errorMessage = err.message || 'An unknown error occurred';
          this.errorMessageSubject.next(this.errorMessage);
          this.showToast(this.errorMessage)
          return EMPTY;
        })
      )

      this.relatedProducts$ = this.productService.relatedProduct$(id).pipe(
        finalize(() => {
          // Hide spinner after data fetch completes
          this.spinnerService.hide();
        }),
        shareReplay(1),
        // tap( result=> console.log('related: ', JSON.stringify(result))),
        catchError(err => {
          console.error('Related Product error:', err.message);
          this.errorMessage = err.message || 'An unknown error occurred';
          this.errorMessageSubject.next(this.errorMessage);
          this.showToast(this.errorMessage)
          return EMPTY;
        })
      );

    });
  }

  openRelated(id: string, message: any) {
    this.showToast(message)
    this.router.navigate(['/products', id]);
    this.spinnerService.show()
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


  totalRatings(product: Product): number {
    return product ?
          product.reviewStat.star5 + 
           product.reviewStat.star4 + 
           product.reviewStat.star3 + 
           product.reviewStat.star2 + 
           product.reviewStat.star1
           : 0
  }


  getRatingPercentage(product: Product, star: number): number {
    const total = this.totalRatings(product);
    if (total === 0) {
      return 50;
    }
    console.log('rating total:' + total);
    
    return (product?.reviewStat[`star${star}`] / total) * 100;
    
  }

  showToast(message: string) {
    console.log('showToast in ProductDetailComponent called with message:', message); // Debugging log
    this.toastService.show(message);
  }
  


  // get totalRatings() {
  //   if (!this.product) return 0;
  //   const total = this.product.reviewStat.star5 + 
  //                 this.product.reviewStat.star4 + 
  //                 this.product.reviewStat.star3 + 
  //                 this.product.reviewStat.star2 + 
  //                 this.product.reviewStat.star1;
  //   console.log('Total Ratings:', total);  // Debug log
  //   return total;
  // }

  // getRatingPercentage(star: number): number {
  //   const total = this.totalRatings;
  //   if (!total || !this.product) {
  //     return 0;
  //   }
  //   const percentage = (this.product.reviewStat[`star${star}`] / total) * 100;
  //   console.log(`Percentage for star ${star}:`, percentage);  // Debug log
  //   return percentage;
  // }


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


