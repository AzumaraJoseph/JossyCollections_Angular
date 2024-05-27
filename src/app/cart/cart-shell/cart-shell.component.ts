import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-shell',
  template: `
    <div class="row justify-content-center" style="background-color: rgba(246, 246, 246, 0.982); margin-top: 4rem;" >
      <div class="col-md-7">
        <app-cart-list></app-cart-list>
      </div>
      <div class="col-md-3">
        <app-cart-total></app-cart-total>
      </div>
    </div>
  `,
  styleUrls: ['./cart-shell.component.css']
})
export class CartShellComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
