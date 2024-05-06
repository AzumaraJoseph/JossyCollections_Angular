import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  pageTitle!: string;
  products$: Product[] | undefined
  errorMessage!: string;

  constructor(private productService: ProductService) { }


  ngOnInit(): void {
    this.pageTitle = 'Products You May Love!';

    this.productService.products$.subscribe({
      next: product => this.products$ = product,
      error: catchError(err => this.errorMessage = err)
    });


  }
  
}
