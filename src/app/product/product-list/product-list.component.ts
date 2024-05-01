import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle!: string;
  products$!: Product[] | undefined
  @Input() rating!: number | null;

  constructor(private productService: ProductService) { }

  ratingAvg(): number | null {
    if (this.products$) {
    this.products$?.map(product => {
     return product.ratingsAverage
     })
    }
    return null

  }

  ngOnInit(): void {
    this.pageTitle = 'Products You May Love!';
    this.rating = this.ratingAvg()

    this.productService.products$.subscribe(product => 
      this.products$ = product
    );
  }

}
