import { Component, OnInit } from '@angular/core';
import { NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Router, Event } from '@angular/router';
import { Observable, Subject, shareReplay, catchError, EMPTY, finalize } from 'rxjs';
import { Product } from 'src/app/product/product';
import { ProductService } from 'src/app/product/product.service';
import { ToastService } from 'src/app/shared/toast.service';
import { SpinnerService } from 'src/app/spinner.service';

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

  errorMessage: string = '';


  constructor(private productService: ProductService, private toastService: ToastService, private spinnerService: SpinnerService, private router: Router) { }


  ngOnInit(): void {

    this.spinnerService.show();
    this.pageTitle = 'Recommended Products For You';

    this.products$ = this.productService.products$.pipe(
      // finalize(() => {
      //   // Hide spinner after data fetch completes
      //   this.spinnerService.hide();
      //   this.pageTitle = 'Recommended Products For You';
      // }),
      shareReplay(1),
      // tap(result => console.log(result)),
      catchError(err => {
        this.errorMessage = err.message || 'An unknown error occurred';
        this.errorMessageSubject.next(this.errorMessage);

        console.error('CartListRecommended error:', this.errorMessage);
        this.showToastError(this.errorMessage)
        return EMPTY;
      })
    );

  }

  // showToast(message: string) {
  //   console.log('showToast in LoginComponent called with message:', message); // Debugging log
  //   this.toastService.show(message);
  // }

  showToastSuccess(product: any) {
    console.log('showToast in CartShellComponent called with message:', product); // Debugging log
    // this.toastService.show(product);
    this.toastService.show(`${product.name} loaded successfully!`, 'success');

  }

  showToastError(message: string) {
    console.log('showToastEror in ProductDetailComponent called with message:', message); // Debugging log
    // this.toastService.show(product);
    this.toastService.show(message, 'error');

  }
}
