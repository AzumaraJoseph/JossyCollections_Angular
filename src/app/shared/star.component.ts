import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {


  @Input() rating: number = 0;
  stars: number[] = [0, 1, 2, 3, 4];

  constructor() {}

  ngOnInit(): void {}

  isFullStar(index: number): boolean {
    return index < Math.floor(this.rating);
  }

  isPartialStar(index: number): boolean {
    return index === Math.floor(this.rating) && this.rating % 1 !== 0;
  }

  isEmptyStar(index: number): boolean {
    return index > Math.floor(this.rating);
  }

  getPartialStarWidth(): string {
    return `${(this.rating % 1) * 100}%`;
  }





  // isFullStar(index: number): boolean {
  //   return index < Math.floor(this.rating);
  // }

  // isPartialStar(index: number): boolean {
  //   return index === Math.floor(this.rating) && this.rating % 1 !== 0;
  // }

  // getPartialStarWidth(): string {
  //   return `${(this.rating % 1) * 100}%`;
  // }



  // get fullStars() {
  //   return Math.floor(this.rating);
  // }

  // get halfStar() {
  //   return this.rating % 1 >= 0.5;
  // }

  // get partialStar() {
  //   return this.rating % 1 > 0 && this.rating % 1 < 0.5;
  // }

  // get partialStarWidth() {
  //   return (this.rating % 1) * 100 + '%';
  // }
  
  
  // @Input() rating: number = 0;
  // stars: string[] = [];
  // stars: number[] = [1, 2, 3, 4, 5];

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['rating']) {
  //     this.updateStars();
  //   }
  // }

  // updateStars(): void {
  //   this.stars = [];
  //   const fullStars = Math.floor(this.rating);
  //   const fraction = this.rating - fullStars;

  //   for (let i = 1; i <= 5; i++) {
  //     if (i <= fullStars) {
  //       this.stars.push('full');
  //     } else if (i === fullStars + 1 && fraction > 0) {
  //       if (fraction > 0.75) {
  //         this.stars.push('full');
  //       } else if (fraction > 0.25) {
  //         this.stars.push('partial');
  //       } else {
  //         this.stars.push('half');
  //       }
  //     } else {
  //       this.stars.push('empty');
  //     }
  //   }
  // }




  // updateStars(): void {
  //   this.stars = [];
  //   const fullStars = Math.floor(this.rating);
  //   const fraction = this.rating - fullStars;

  //   for (let i = 1; i <= 5; i++) {
  //     if (i <= fullStars) {
  //       this.stars.push('full');
  //     } else if (i === fullStars + 1 && fraction > 0) {
  //       if (fraction >= 0.75) {
  //         this.stars.push('three-quarters');
  //       } else if (fraction >= 0.5) {
  //         this.stars.push('half');
  //       } else if (fraction >= 0.25) {
  //         this.stars.push('quarter');
  //       } else {
  //         this.stars.push('empty');
  //       }
  //     } else {
  //       this.stars.push('empty');
  //     }
  //   }
  // }


  // @Input() rating: number = 0;

  // getFullStars(): number[] {
  //   const fullStarsCount = Math.floor(this.rating);
  //   return Array(fullStarsCount).fill(0);
  // }

  // hasHalfStar(): boolean {
  //   return this.rating % 1 >= 0.5;
  // }

  // getPartialStarWidth(): string {
  //   return ((this.rating % 1) * 100) + '%';
  // }


  // fullStars: number[] = [];
  // partialStar: number | null = null;
  // emptyStars: number[] = [];

  // ngOnChanges() {
  //   this.calculateStars();
  // }

  // calculateStars() {
  //   this.fullStars = Array(Math.floor(this.rating)).fill(0);
  //   const fractionalPart = this.rating % 1;

  //   if (fractionalPart > 0.75) {
  //     this.partialStar = 100; // Full star
  //   } else if (fractionalPart > 0.25) {
  //     this.partialStar = Math.round(fractionalPart * 100); // Partial star
  //   } else {
  //     this.partialStar = null; // No partial star
  //   }

  //   const totalStars = 5;
  //   this.emptyStars = Array(totalStars - this.fullStars.length - (this.partialStar ? 1 : 0)).fill(0);
  // }

  // getPartialStarWidth(): string {
  //   return `${this.partialStar}%`;
  // }

  }