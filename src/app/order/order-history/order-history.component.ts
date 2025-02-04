import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, map, tap, catchError, EMPTY, Observable, finalize } from 'rxjs';
import { ProductService } from 'src/app/product/product.service';
import { AuthService } from 'src/app/shared/auth.service';
import { ToastService } from 'src/app/shared/toast.service';
import { SpinnerService } from 'src/app/spinner.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orderHistoryForm!: NgForm;

  productRating: number = 0;
  comment: string = ''

  errorMessageSubject = new Subject<string>();
  errorMessage$: Observable<string> = this.errorMessageSubject.asObservable();

  errorMessage: string = '';



  // rating: number = 3;
  // review = {
  //   // rating: 3,
  //   id: ''
  // };

  orderHistory$!: Observable<any>;


  
  constructor(private productService: ProductService, private fb: FormBuilder, private auth: AuthService, private router: Router, private toastService: ToastService, private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.toastService.show('Order history loaded successfully', 'success');

    this.spinnerService.show();


    this.orderHistory$ = this.auth.orderHistory().pipe(
      // tap(orders => console.log('All orders: ', JSON.stringify(orders))),
      finalize(() => {
        // Hide spinner after data fetch completes
        this.spinnerService.hide();
      }),
      catchError(err => {
        this.errorMessage = err.message || 'An unknown error occurred';
        this.errorMessageSubject.next(this.errorMessage);

        console.error('Login error:', this.errorMessage);
        this.showToastError(this.errorMessage);
        this.spinnerService.hide();
        return EMPTY;
      })
    )

   


  }

  
  // save(orderHistoryForm: NgForm) {
  //   if (orderHistoryForm.valid) {
  //     console.log('Form submitted: ', JSON.stringify(this.orderHistoryForm.value));
  //     // const address = this.addressForm.value;
  //     // this.auth.createAddress(address).subscribe(
  //     //   response => {
  //     //     console.log('Address created successfully:', response);
  //     //     this.addressForm.reset();
  //     //     this.router.navigate(['/user/address'])
  //     //   },
  //     //   error => {
  //     //     console.error('Error creating address:', error);
  //     //   }
  //     // );
  //   } else {
  //     console.log('Form is invalid');
  //   }
    
  // }


  save(orderHistoryForm: NgForm) {

    if (orderHistoryForm.valid) {
      console.log('Form submitted: ', JSON.stringify(orderHistoryForm.value));
    // Handle form submission logic here
      this.reviewProduct(orderHistoryForm.value)
      // reset form leaving the id since its not part of the api body
      this.resetForm()
    } else {
      console.log('Form is invalid');
    }
  }

  reviewProduct(formData: any): void {
    this.auth.reviewProduct(formData.comment, formData.rating, formData.id).subscribe(response => console.log('User review: ', JSON.stringify(response)))
  }

  resetForm(): void {
    this.comment = '',
    this.productRating = 0
  }

  // showToast(message: string) {
  //   console.log('showToast in OrderHistoryComponent called with message:', message); // Debugging log
  //   this.toastService.show(message);
  // }

  showToastSuccess(message: string) {
    console.log('showToast in addressComponent called with message'); // Debugging log
    // this.toastService.show(product);
    this.toastService.show(message, 'success');

  }

  showToastError(message: string) {
    console.log('showToastEror in addressComponent called with message:', message); // Debugging log
    // this.toastService.show(product);
    this.toastService.show(message, 'error');

  }

}
