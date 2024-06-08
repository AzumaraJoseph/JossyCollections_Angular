import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-star-review',
  templateUrl: './star-review.component.html',
  styleUrls: ['./star-review.component.css']
})
export class StarReviewComponent implements OnInit {

  @Input() rating: number = 0;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();

  stars: number[] = [1, 2, 3, 4, 5];
  hoverRating: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  setRating(star: number) {
    this.rating = star;
    this.ratingChange.emit(this.rating);
  }

  setHoverRating(star: number) {
    this.hoverRating = star;
  }

  resetHover() {
    this.hoverRating = 0;
  }

  isFilled(star: number): boolean {
    return star <= this.hoverRating || star <= this.rating;

  }

  isHalfFilled(star: number): boolean {
    return this.hoverRating < star && star - 1 < this.hoverRating && this.hoverRating > this.rating;
    
  }


}
