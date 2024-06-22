import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';
import { SpinnerService } from '../spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-order-shell',
  template: `
  <div class="row justify-content-center" style="background-color: rgba(246, 246, 246, 0.982); margin-top: 4rem; padding: 0 2rem" >
  <app-spinner></app-spinner>
  <div class="col-md-7">
      <app-create-order></app-create-order>
    </div>
    <div class="col-md-4">
      <app-create-order-total></app-create-order-total>
    </div>
  </div>
`
})
export class OrderShellComponent implements OnInit {

  constructor(private spinnerService: SpinnerService, private router: Router) {}
  
  ngOnInit(): void {
    this.spinnerService.show();
      
  }

 

}
