// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-spinner',
//   templateUrl: './spinner.component.html',
//   styleUrls: ['./spinner.component.css']
// })
// export class SpinnerComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {

  isLoading: Observable<boolean>;

  constructor(private spinnerService: SpinnerService) {
    this.isLoading = this.spinnerService.isLoading;

    // this.isLoading.subscribe(value => console.log('Spinner loading state:', value));
  }

  // constructor(private router: Router, private spinnerService: SpinnerService) {}

  // ngOnInit() {
  //   this.router.events.subscribe(event => {
  //     if (event instanceof NavigationStart) {
  //       this.spinnerService.show();
  //     } else if (
  //       event instanceof NavigationEnd ||
  //       event instanceof NavigationCancel ||
  //       event instanceof NavigationError
  //     ) {
  //       this.spinnerService.hide();
  //     }
  //   });
  // }
}

