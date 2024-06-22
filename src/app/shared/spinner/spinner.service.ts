// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class SpinnerService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading = this.loadingSubject.asObservable();

  // show() {
  //   this.loadingSubject.next(true);
  // }

  // hide() {
  //   this.loadingSubject.next(false);
  // }

  show() {
    // console.log('Spinner show called');
    this.loadingSubject.next(true);
  }
  
  hide() {
    // console.log('Spinner hide called');
    this.loadingSubject.next(false);
  }
  
}

