import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService } from '../product/product.service';
import { Product } from '../product/product';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {


  constructor(private productService: ProductService) { }
  

  products!: Product[];
  // starRating!: number;
  rating = 3.7;

  ngOnInit(): void {

    }

    getFullStar(): Array<number> {
      return Array(Math.floor(this.rating));
    }
  
    getPartialStarWidths(): string {
      return `${(this.rating % 1) * 100}`;
    }   
    

    getFullStars(): Array<number> {
      return Array(Math.floor(this.rating));
    }
  
   
    getPartialStarWidth(rating: number): any {
      // Calculate the width of a single star
      const fractionalPart = rating % 1;
      return (fractionalPart * 100) + '%'; // Calculate width for partial star
  
    }









  //   @Input() rating: number = 0;
  //   @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();

  // stars: number[] = [1, 2, 3, 4, 5];
  // hoverRating: number = 0;

  // setRating(star: number) {
  //   this.rating = star;
  //   this.ratingChange.emit(this.rating);
  // }

  // setHoverRating(star: number) {
  //   this.hoverRating = star;
  // }

  // resetHover() {
  //   this.hoverRating = 0;
  // }

  // isFilled(star: number): boolean {
  //   return star <= (this.hoverRating || this.rating);
  // }



  
  


  }