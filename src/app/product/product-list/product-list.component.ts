import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { EMPTY, Observable, Subject, catchError, shareReplay, tap } from 'rxjs';
import { ToastComponent } from 'src/app/toast.component';

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


  constructor(private productService: ProductService) { }


  ngOnInit(): void {

    this.pageTitle = 'Products You May Love!';

    this.products$ = this.productService.products$.pipe(
      shareReplay(1),
      // tap(result => console.log(result)),
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );

  }

  // @ViewChild(ToastComponent) toast!: ToastComponent;


  showToast(message: string) {
    // this.toast.showToast(message);
    console.log('showToast method in ProductListComponent called'); // Debugging log
    if (this.toast) {
      this.toast.showToast(message);
    }
    console.log(this.toast); // Debugging log

  }

}
