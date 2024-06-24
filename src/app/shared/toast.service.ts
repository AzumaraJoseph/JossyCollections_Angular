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

  // toast.service.ts
  private toastSubject = new Subject<ToastMessage[]>();
  toastState$ = this.toastSubject.asObservable();
  private messages: ToastMessage[] = [];

  show(message: string, type: ToastType = 'success') {
    console.log('ToastService.show called with message:', message, 'and type:', type); // Debugging log
    this.messages.push({ message, type });
    this.toastSubject.next(this.messages);
  }

  remove(message: ToastMessage) {
    this.messages = this.messages.filter(m => m !== message);
    this.toastSubject.next(this.messages);
  }
}

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface ToastMessage {
  message: string;
  type: ToastType;
}

