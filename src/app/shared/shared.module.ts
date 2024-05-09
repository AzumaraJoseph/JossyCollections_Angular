import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './star.component';
import { FormsModule } from '@angular/forms';
import { CollapsibleWellComponent } from './collapsible-well.component';



@NgModule({
  declarations: [
    StarComponent,
    CollapsibleWellComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    StarComponent,
    CollapsibleWellComponent
  ]
})
export class SharedModule { }
