import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './star.component';
import { FormsModule } from '@angular/forms';
import { CollapsibleWellComponent } from './collapsible-well.component';
import { StarReviewComponent } from './star-review.component';
import { SpinnerComponent } from '../spinner.component';



@NgModule({
  declarations: [
    StarComponent,
    CollapsibleWellComponent,
    StarReviewComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    StarComponent,
    StarReviewComponent,
    CollapsibleWellComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
