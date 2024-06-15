// toast.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
    // ---for stacking single toast---

  // private toastSubject = new Subject<string>();
  // toastState$ = this.toastSubject.asObservable();

  // show(message: string) {
  //   console.log('ToastService.show called with message:', message); // Debugging log
  //   this.toastSubject.next(message);
  // }




  // ---for stacking multiple toast(s)---

  private toastSubject = new Subject<string[]>();
  toastState$ = this.toastSubject.asObservable();
  private messages: string[] = [];

  show(message: string) {
    console.log('ToastService.show called with message:', message); // Debugging log
    this.messages.push(message);
    this.toastSubject.next(this.messages);
  }

  remove(message: string) {
    this.messages = this.messages.filter(m => m !== message);
    this.toastSubject.next(this.messages);
  }

}
