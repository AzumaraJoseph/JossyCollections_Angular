// toast.component.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastMessage, ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  show!: boolean;
  messages: ToastMessage[] = [];

  constructor(private toastService: ToastService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log('ToastComponent initialized'); // Debugging log

    this.toastService.toastState$.subscribe(messages => {
      this.messages = messages;
      this.show = true;
      this.cdr.detectChanges(); // Trigger change detection

      messages.forEach((message, index) => {
        setTimeout(() => this.hideToast(message), 5000 * (index + 1)); // Automatically hide after 5 seconds, staggered
      });
    });
  }

  hideToast(message: ToastMessage) {
    console.log('hideToast called for message:', message.message); // Debugging log
    this.show = false;
    this.toastService.remove(message);
    this.cdr.detectChanges(); // Trigger change detection
  }
}
