import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'collapsible-well',
  template: `<div class="well pt-3 pe-5 pb-3" (click)="toggleCollapsible()">
    <ng-content select="[well-title]" *ngIf="!visible"></ng-content>
    <ng-content select="[well-body]" *ngIf="visible"></ng-content>
  </div>
  
  `
})
export class CollapsibleWellComponent implements OnInit {

  constructor() { }

  visible: boolean = false;

  toggleCollapsible(): boolean {
    this.visible = !this.visible;
    return false;
  }

  ngOnInit(): void {
  }

}
