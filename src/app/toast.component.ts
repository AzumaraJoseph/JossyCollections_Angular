import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  show = false;
  message = '';
  
  constructor() { }

  ngOnInit(): void {
    console.log('ToastComponent initialized'); // Debugging log
  }

  showToast(message: string) {
    console.log('showToast called'); // Debugging log
    this.message = message;
    this.show = true;
    setTimeout(() => this.hideToast(), 9000); // Automatically hide after 3 seconds
  }

  hideToast() {
    console.log('hideToast called'); // Debugging log
    this.show = false;
  }
}
