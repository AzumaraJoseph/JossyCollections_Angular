import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { EMPTY, Observable, Subject, catchError, shareReplay } from 'rxjs';
import { ToastComponent } from 'src/app/shared/toast.component';
import { ToastService } from 'src/app/shared/toast.service';
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


  constructor(private productService: ProductService, private toastService: ToastService) { }


  ngOnInit(): void {


    this.pageTitle = 'Products You May Love!';

    this.products$ = this.productService.products$.pipe(
      shareReplay(1),
      // tap(result => console.log(result)),
      catchError(err => {
          this.errorMessage = err.message || 'An unknown error occurred';
          this.errorMessageSubject.next(this.errorMessage);
          
          console.error('Product error:', this.errorMessage);
          this.showToast(this.errorMessage)
        return EMPTY;
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
  

  // @ViewChild(ToastComponent) toast!: ToastComponent;


  // showToast(message: string) {
  //   // this.toast.showToast(message);
  //   // console.log('showToast method in ProductListComponent called'); // Debugging log
  //   if (this.toast) {
  //     this.toast.showToast(message);
  //   }
  //   console.log(this.toast); // Debugging log

  // }

  showToast(message: string) {
    console.log('showToast in ProductListComponent called with message:', message); // Debugging log
    this.toastService.show(message);
  }

}
