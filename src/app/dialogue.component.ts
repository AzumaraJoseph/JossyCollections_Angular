import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from './product/product';
import { AuthService } from './shared/auth.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
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

  returnUrl!: string;


  get isLoggedIn() {
    return this.auth.isLoggedIn;
  }

  errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  constructor(private auth: AuthService, private router: Router, private guard: AuthGuard, private route: ActivatedRoute) { }

  ngOnInit(): void {

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

increment(maxQuantity: number): void {
  if (this.quantity < maxQuantity) this.quantity += 1;
}

decrement(): void {
  if(this.quantity > 1) this.quantity--;
    
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
    this.addCart(cartForm.value);
  } else {
    console.error('Form is invalid');
    // this.closeModal();
    // auth guard was used instead
    // this.router.navigate(['/user/login'])

  }
}


addCart(formData: any) {
    this.auth.createCart(formData.id, formData.quantity, formData.color).subscribe(
      response => {
        console.log('Added to cart', JSON.stringify(response))
        this.closeModal();
        // Use setTimeout to ensure the modal is fully closed before navigating
        // if (this.auth.redirectUrl) {
        //   this.router.navigateByUrl(this.auth.redirectUrl)
        // } else {
        //   this.router.navigate(['/cart']);
        // }

        // Navigate to the returnUrl using navigateByUrl
        // this.router.navigateByUrl(this.returnUrl);

        this.router.navigate(['/cart']);

        // setTimeout(() => {
        //   this.router.navigate(['/cart']);
        // }, 500); // Adjust the timeout as needed
          },
          error => console.error('Error:', error)
        );
        // this.router.navigate(['/cart'])
  }
    

  closeModal() {
    // Hide the Bootstrap modal
    $('.modal').modal('hide');
  }

}
