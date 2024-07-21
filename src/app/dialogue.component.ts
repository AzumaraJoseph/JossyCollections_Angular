import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from './product/product';
import { AuthService } from './shared/auth.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ToastService } from './shared/toast.service';
// import { SpinnerService } from './shared/spinner/spinner.service';
import { SpinnerService } from 'src/app/spinner.service';

declare let $: any;

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.css']
})
export class DialogueComponent implements OnInit {
  @Input() indexer: any;
  @Input() product: any;

  cartForm!: NgForm;

  product$: Observable<Product> | undefined;
  selectProduct$: Observable<Product> | undefined;
  quantity: number = 1;
  // isLoading = false;
  isLoadingQuantity: boolean = false;
  isLoadingForm: boolean = false;


  returnUrl!: string;


  get isLoggedIn() {
    return this.auth.isLoggedIn;
  }

  errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  errorMessage: string = '';

constructor(private auth: AuthService, private router: Router, private guard: AuthGuard, private route: ActivatedRoute, private toastService: ToastService, private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    // this.spinnerService.show();

    // Read the returnUrl query parameter from the route
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

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

// increment(maxQuantity: number): void {
//     if (this.quantity < maxQuantity) this.quantity += 1; 
    
// }

increment(maxQuantity: number): void {
  if (this.quantity < maxQuantity) {
    this.isLoadingQuantity = true; // Set loading state to true
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.isLoadingQuantity = false; // Set loading state to false
      this.quantity += 1;
    }, 600);
  }
}

// decrement(): void {
//   if(this.quantity > 1)  this.quantity--;
    
//  }

decrement(): void {
  if(this.quantity > 1) {
    this.isLoadingQuantity = true; // Set loading state to true
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.isLoadingQuantity = false; // Set loading state to true
      this.quantity --
    }, 600);
  }
    
 }




//  save(cartForm: NgForm) {
//   console.log(cartForm.value);
  
//   if (cartForm.valid) {
//     this.addCart(cartForm.value);
//   } else {
//     console.error('Form is invalid');
//   }
// }



save(cartForm: NgForm) {
  console.log(cartForm.value);
  
  if (cartForm.valid) {
    this.isLoadingForm = true; // Set loading state to true
    this.addCart(cartForm.value);
  } else {
    console.error('Form is invalid');
    // this.closeModal();
    // auth guard was used instead
    // this.router.navigate(['/user/login'])

  }
}


addCart(formData: any) {

  // If the user is logged in, proceed with adding to the cart
  this.spinnerService.show();

    this.auth.createCart(formData.id, formData.quantity, formData.color).subscribe(
      response => {
        console.log('Added to cart', JSON.stringify(response))
        this.spinnerService.hide();
        this.isLoadingForm = false; // Set loading state to false
  
        this.closeModal();
        // this.showToast('Item(s) added to cart successfully')
        this.toastService.show('Item(s) added to cart successfully', 'success');
  
  
        // Route to Cart
        this.router.navigate(['/cart']);
      },
      error => {
        this.spinnerService.hide();
        this.isLoadingForm = false; // Set loading state to false
        this.showToastError(error);
        console.error('Error adding to cart', error);

        this.router.navigate(['/login']);
        this.closeModal();



      });

  }
    

  closeModal() {
    // Hide the Bootstrap modal
    $('.modal').modal('hide');
  }

  
  // showToast(message: string) {
  //   console.log('showToast in ProductDetailComponent modal called with message:', message); // Debugging log
  //   this.toastService.show(message);
  // }

  
  // showToastSuccess(product: any) {
  //   console.log('showToast in ProductDetailModal called with message:', product); // Debugging log
  //   // this.toastService.show(product);
  //   this.toastService.show(`${product.name} details loaded successfully!`, 'success');

  // }

  showToastInfo(color: any) {
    console.log('showToastColor in ProductDetailComponent called with message:', color); // Debugging log
    // this.toastService.show(product);
    this.toastService.show(`Color ${color.color} is selected!`, 'info');

  }

  showToastError(message: string) {
    console.log('showToastEror in ProductDetailComponent called with message:', message); // Debugging log
    // this.toastService.show(product);
    this.toastService.show(message, 'error');

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
