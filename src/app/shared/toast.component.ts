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
  messages: string[] = [];

  constructor(private toastService: ToastService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log('ToastComponent initialized'); // Debugging log

    // ---for single toast---
    // this.toastService.toastState$.subscribe(message => {
    //   this.showToast(message);
    // });


    // ---for multiple toast(s)---
    this.toastService.toastState$.subscribe(messages => {
      this.messages = messages;
      this.show = true;
      this.cdr.detectChanges(); // Trigger change detection

      messages.forEach((message, index) => {
        setTimeout(() => this.hideToast(message), 5000 * (index + 1)); // Automatically hide after 5 seconds, staggered
      });
    })    
  }





  // ---showtoast and hidetoast below it are display for single toast---

  // showToast(message: string) {
  //   console.log('showToast called'); // Debugging log
  //   this.message = message;
  //   this.show = true;
  //   this.cdr.detectChanges(); // Trigger change detection
  //   setTimeout(() => this.hideToast(), 4000); // Automatically hide after 4 seconds
  // }

  // hideToast() {
  //   console.log('hideToast called'); // Debugging log
  //   this.show = false;
  //   this.cdr.detectChanges(); // Trigger change detection
  // }


  hideToast(message: string) {
    console.log('hideToast called for message:', message); // Debugging log
    this.show = false;
    this.toastService.remove(message);
    this.cdr.detectChanges(); // Trigger change detection
  }
}
