import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, map, tap, catchError, EMPTY, Observable } from 'rxjs';
import { ProductService } from 'src/app/product/product.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orderHistoryForm!: NgForm;

  productRating: number = 0;
  comment: string = ''


  // rating: number = 3;
  // review = {
  //   // rating: 3,
  //   id: ''
  // };

  orderHistory$!: Observable<any>;

  errorMessageSuject = new Subject<string>();
  errorMessage$ = this.errorMessageSuject.asObservable();
  
  constructor(private productService: ProductService, private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {


    this.orderHistory$ = this.auth.orderHistory().pipe(
      // tap(orders => console.log('All orders: ', JSON.stringify(orders))),
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

}
