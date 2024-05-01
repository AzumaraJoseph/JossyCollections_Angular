import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/product.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {

  private rating =  this.productService.products$.pipe(map(product => product ? product.ratingsAverage : null ))

  

  constructor(private productService: ProductService) { }
  
 
  private ratingData = [
    {
      star: 5,
      avgRating: this.rating
    },
    {
      star: 4,
      avgRating: this.rating
    },
    {
      star: 3,
      avgRating: this.rating
    },
    {
      star: 2,
      avgRating: this.rating
    },
    {
      star: 1,
      avgRating: this.rating
    }
    
  ]
  
  private totalRating = 0; 
  private totalStarRating = 0;

  private averageStar = this.totalStarRating / this.totalRating;

  ngOnInit() {
    console.log(this.ratingData)

    this.ratingData.forEach(data => {
      data.avgRating.subscribe(ratingValue => {
        this.totalRating += ratingValue.avgRating;
  
        this.totalStarRating += ratingValue.avgRating * data.star;
      })
    })
    console.log(this.ratingData);


  //   const element = document.querySelector('.star-inner');

  //   if (element != null) {
  //     const Element = element as HTMLElement;
  //     Element.style.width = (this.averageStar / 5) * 100 + '%';
  //   }
   }


}