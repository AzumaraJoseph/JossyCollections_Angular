import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-order-shell',
  template: `
  <div class="row justify-content-center" style="background-color: rgba(246, 246, 246, 0.982); margin-top: 4rem;" >
    <div class="col-md-7">
      <app-create-order></app-create-order>
    </div>
    <div class="col-md-3">
      <app-create-order-total></app-create-order-total>
    </div>
  </div>
`,  styleUrls: ['./create-order-shell.component.css']
})
export class OrderShellComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
