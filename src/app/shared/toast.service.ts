// toast.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<string>();
  toastState$ = this.toastSubject.asObservable();

  shown = false;

  show(message: string) {
    console.log('ToastService.show called with message:', message); // Debugging log
    this.toastSubject.next(message);
  }

}
