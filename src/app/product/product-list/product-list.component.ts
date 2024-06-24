import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { EMPTY, Observable, Subject, catchError, finalize, shareReplay } from 'rxjs';
import { ToastComponent } from 'src/app/shared/toast.component';
import { ToastService } from 'src/app/shared/toast.service';
import { SpinnerService } from 'src/app/spinner.service';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
declare let $: any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {

  @ViewChild(ToastComponent) toast!: ToastComponent;

  pageTitle!: string;
  products$: Observable<Product[]> | undefined

  errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  errorMessage: string = '';


  constructor(private productService: ProductService, private toastService: ToastService, private router: Router, private spinnerService: SpinnerService) { }


  ngOnInit(): void { 

    this.spinnerService.show();

    this.pageTitle = 'Products You May Love!';

    this.products$ = this.productService.products$.pipe(
      shareReplay(1),
      // tap(result => console.log(result)),
      catchError(err => {
          this.errorMessage = err.message || 'An unknown error occurred';
          this.errorMessageSubject.next(this.errorMessage);
          
          console.error('Product error:', this.errorMessage);
          // this.showToast(this.errorMessage);
          this.toastService.show(this.errorMessage, 'error');      
        
          this.spinnerService.hide();

        return EMPTY;
      }),
      finalize(() => {
        // Hide spinner after data fetch completes or encounters an error
        this.spinnerService.hide();
      })
    );

  }

  // ngAfterViewInit(): void {
  //   // Initialize carousel
  //   $('#carouselid').carousel();

  // }

  ngAfterViewInit(): void {
    // console.log('Initializing carousel');
    setTimeout(() => {
      const carouselElement = $('#carouselid');
      if (carouselElement.length) {
        // console.log('Carousel element found:', carouselElement);
        carouselElement.carousel({
          interval: 2000 // Customize interval as needed
        });
      } else {
        // console.error('Carousel element not found');
      }
    }, 0);
  }

  routeToDetail(product: any): void {
    this.showToastSuccess(product);
    this.router.navigate(['/products', product.id])
  }


  showToastSuccess(product: any) {
    console.log('showToastSuccess in ProductListComponent called with message:', product.name); // Debugging log
    this.toastService.show(`${product.name} loaded successfully!`, 'success');
    // this.toastService.show(product.name, 'success');

  }


  // Some component

  // showSuccess() {
  //   this.toastService.show('This is a success message!', 'success');
  // }

  // showInfo() {
  //   this.toastService.show('This is an info message.', 'info');
  // }

  // showWarning() {
  //   this.toastService.show('This is a warning message.', 'warning');
  // }

  // showError() {
  //   this.toastService.show('This is an error message.', 'error');
  // }



}
