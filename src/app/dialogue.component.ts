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
    // this.spinnerService.show();
    setTimeout(() => {
      this.isLoadingQuantity = false; // Set loading state to false
      this.quantity += 1;
    }, 450);
  }
}

// decrement(): void {
//   if(this.quantity > 1)  this.quantity--;
    
//  }

decrement(): void {
  if(this.quantity > 1) {
    this.isLoadingQuantity = true; // Set loading state to true
    // this.spinnerService.show();
    setTimeout(() => {
      // this.spinnerService.hide();
      this.isLoadingQuantity = false; // Set loading state to true
      this.quantity --
    }, 450);
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
  this.isLoadingForm = true; // Set loading state to true
  this.spinnerService.show();

  this.auth.createCart(formData.id, formData.quantity, formData.color).subscribe(
    response => {
      console.log('Added to cart', JSON.stringify(response))

      this.closeModal();
      this.showToast('Item(s) added to cart successfully')

      // Route to Cart
      this.router.navigate(['/cart']);
    });
  }
    

  closeModal() {
    // Hide the Bootstrap modal
    $('.modal').modal('hide');
  }

  
  showToast(message: string) {
    console.log('showToast in ProductDetailComponent modal called with message:', message); // Debugging log
    this.toastService.show(message);
  }

}
