import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-page',
  template: `
  <h1>This is not the page you were looking for!</h1>
  `
})
export class ErrorPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

