// toast.component.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  show!: boolean;
  message = '';

  constructor(private toastService: ToastService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log('ToastComponent initialized'); // Debugging log

    this.toastService.toastState$.subscribe(message => {
      this.showToast(message);
    });
  }

  showToast(message: string) {
    console.log('showToast called'); // Debugging log
    this.message = message;
    this.show = true;
    this.cdr.detectChanges(); // Trigger change detection
    // setTimeout(() => this.hideToast(), 4000); // Automatically hide after 9 seconds
  }

  hideToast() {
    console.log('hideToast called'); // Debugging log
    this.show = false;
    this.cdr.detectChanges(); // Trigger change detection
  }
}


// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ToastService } from './toast.service';

// @Component({
//   selector: 'app-toast',
//   templateUrl: './toast.component.html',
//   styleUrls: ['./toast.component.css']
// })
// export class ToastComponent implements OnInit, OnDestroy {

//   show = false;
//   message = '';
//   private timeoutRef: any; // Reference to the setTimeout timer

//   constructor(private toastService: ToastService, private cdr: ChangeDetectorRef) { }

//   ngOnInit(): void {
//     console.log('ToastComponent initialized'); // Debugging log

//     // Subscribe to toastService messages
//     this.toastService.toastState$.subscribe(message => {
//       this.showToast(message);
//     });

//     // Check if the page visibility changes (if supported by the browser)
//     document.addEventListener('visibilitychange', this.handleVisibilityChange);
//   }

//   ngOnDestroy(): void {
//     // Clean up - remove event listener when component is destroyed
//     document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    
//     // Clear the timeout when component is destroyed
//     if (this.timeoutRef) {
//       clearTimeout(this.timeoutRef);
//     }
//   }

//   showToast(message: string) {
//     console.log('showToast called'); // Debugging log
//     this.message = message;
//     this.show = true;
//     // Clear previous timeout if exists
//     if (this.timeoutRef) {
//       clearTimeout(this.timeoutRef);
//     }
//     this.timeoutRef = setTimeout(() => this.hideToast(), 3000); // Automatically hide after 3 seconds
//   }

//   hideToast() {
//     console.log('hideToast called'); // Debugging log
//     this.show = false;
//   }

//   private handleVisibilityChange = () => {
//     if (document.visibilityState === 'hidden') {
//       // Page is not visible, clear the timeout
//       clearTimeout(this.timeoutRef);
//     } else {
//       // Page is visible, resume timeout if toast is visible
//       if (this.show) {
//         this.timeoutRef = setTimeout(() => this.hideToast(), 3000);
//       }
//     }
//   }
// }
