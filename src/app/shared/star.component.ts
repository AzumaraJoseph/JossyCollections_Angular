import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../product/product.service';
import { Product } from '../product/product';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {


  constructor(private productService: ProductService) { }
  
 
  private ratingData = [
    {
      star: 5,
    },
    {
      star: 4,
    },
    {
      star: 3,
    },
    {
      star: 2,
    },
    {
      star: 1,
    }
    
  ]
  // public rating: number = 0;
  // public starWidth: number = 0;

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

    // getFullStars(): number[] {
    //   return Array(Math.floor(this.rating)).fill(0); // Get full stars
    // }
  
    // getPartialStarWidth(): string {
    //   return `${(this.rating % 1) * 100}%`; // Calculate width for partial star
    // }


    
    

    getFullStars(): Array<number> {
      return Array(Math.floor(this.rating));
    }
  
    // getPartialStarWidth(): any {
    //   // Calculate the width of a single star
    //   const singleStarWidth = 100 / 5; // Assuming 5 stars in total
    //   // Calculate the width of the partial star
    //   const fractionalPartWidth: any = (this.rating % 1) !== 0 ;
    //   const fraction = fractionalPartWidth * singleStarWidth
    //   return fraction;
    // }
    getPartialStarWidth(rating: number): any {
      // Calculate the width of a single star
      const fractionalPart = rating % 1;
      return (fractionalPart * 100) + '%'; // Calculate width for partial star
  
    }
    // getPartialStarWidth(): string {
    //   const fractionalPart = this.rating % 1;
    //   // Round to the nearest multiple of 10 to ensure the star is represented accurately
    //   const roundedWidth = Math.round(fractionalPart * 10) * 10;
    //   return `${roundedWidth}%`;
    // }
  // getStars(): any[] {
  //   const fullStars = Math.floor(this.rating);
  //   const fractionalPart = this.rating - fullStars;
  //   const stars = [];

  //   // Add full stars
  //   for (let i = 0; i < fullStars; i++) {
  //     stars.push({ type: 'full' });
  //   }

  //   // Add half star if fractional part >= 0.5
  //   if (fractionalPart >= 0.5) {
  //     stars.push({ type: 'half' });
  //   }

  //   return stars;
  // }

    // getFilledStars(rating: number): number[] {
    //   return Array(Math.floor(rating)).fill(0);
    // }
  
    // getPartialStar(rating: number): boolean {
    //   return rating % 1 !== 0;
    // }

    // getFullStars(rating: number): number[] {
    //   return Array(Math.floor(rating)).fill(0); // Get full stars
    // }

    // getPartialStarWidth(rating: number): string {
    //   const fractionalPart = rating % 1;
    //   return (fractionalPart * 100) + '%'; // Calculate width for partial star
    // }


    // getFullStars(): number[] {
    //   return Array(Math.floor(this.rating)).fill(0);
    // }
  
    // getFractionalPart(): number {
    //   return this.rating - Math.floor(this.rating);
    // }
  
    // getFractionalStarWidth(): string {
    //   return `${this.getFractionalPart() * 100}%`;
    // }

    // getFullStars(): number {
    //   return Math.floor(this.rating);
    // }
  
    // getFractionalPart(): number {
    //   return this.rating - this.getFullStars();
    // }

    // getFractionalStarWidth(): string {
    //   return `${this.getFractionalPart() * 100}%`;
    // }
  
    // getPartialStarPercentage(rating: number): number {
    //   return (rating % 1) * 100; // Get percentage of the partial star
    // }
    
  // ngOnInit() {
  //   this.productService.products$.pipe(
  //     map(products => {
  //       let totalRating = 0;
  //       let starRating = 0;

  //       products.forEach((product: any) => {
  //         // Compute the total number of ratings
  //         totalRating += product.ratingsAverage;
  //         // Compute the average star rating for each star
  //         this.ratingData.forEach((rating: any) => {
  //           starRating += product.ratingsAverage * rating.star;
  //         });
  //       });

  //       if (totalRating > 0) { // Avoid division by zero
  //         this.rating = (starRating / totalRating).toFixed(1);
  //       } else {
  //         this.rating = "0"; // Default rating if no products or no ratings
  //       }
        
  //       // Log the final computed average
  //       console.log('Computed Average Rating:', this.rating);

  //       // After computation, update the UI accordingly
       
  //       // Example function to update an element's width
  //         const element: HTMLElement | null = document.querySelector('.star-inner');

  //         // Check if the element exists before accessing its properties
  //         if (element !== null) {
  //           element.style.width = (parseFloat(this.rating) / 5) * 100 + '%';
  //         } else {
  //           console.log('Failed to find the .star-inner element in the DOM');
  //         }


  //       console.log(this.rating);

  //       return this.rating;
  //     })
  //   ).subscribe();

  // }

   
  // ngOnInit() {
  //   this.productService.products$.pipe(
  //     map(products => products.forEach((product: any) => {
  //       let totalRating = 0;
  //       let starRating = 0;
  //       totalRating += product.ratingsAverage;
  //       console.log(totalRating);

  //       this.ratingData.forEach((rating: any) => {
  //         starRating += product.ratingsAverage * rating.star;
  //       });


  //       this.rating = +(starRating / totalRating).toFixed(1);

  //       this.starWidth = (this.rating / 5) * 100;

  //       // console.log('this is average' + this.starWidth);

  //       // update UI
  //       // this.updateUiStars();

  //     }))
  //   ).subscribe();
  // }
}
    


  // ngOnInit() {  

  //   this.productService.products$.pipe(
  //     map(products => {
  //       // Extract ratings from each product
  //       this.rating = products.map((product: { ratingsAverage: number; }) => product.ratingsAverage);
        
  //       // Log the ratings array
  //       // console.log(this.rating);

  //       // Optionally, return the ratings array if needed
  //       return this.rating;
  //     })).subscribe();



  //   this.ratingData.forEach(data => {
  //       this.totalRating += data.avgRating;
  
  //       this.starRating += data.avgRating * data.star;
  //   })
  //   console.log(this.ratingData);

  //   const elements: NodeList = document.querySelectorAll('.star-inner');

  //   elements.forEach((node: Node) => {
  //       if (node instanceof HTMLElement) {
  //           // If it's an HTMLElement, we can access its style property
  //           const element: HTMLElement = node;
  //           // Update the width of each element based on your logic
  //           element.style.width = (this.averageStar / 5) * 100 + '%';
  //       }
  //   });
  // }    