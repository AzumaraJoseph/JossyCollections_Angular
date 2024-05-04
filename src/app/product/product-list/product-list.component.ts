import { Component, HostListener, OnInit } from '@angular/core';
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



  isScrolledDown: boolean = false;
  lastScrollTop: number = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop

    if (currentScroll > this.lastScrollTop) {
      // Scroll down
      this.isScrolledDown = true;
    } else {
      // Scroll up
      this.isScrolledDown = false;
    }
    
    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }



  ngOnInit(): void {
    this.pageTitle = 'Products You May Love!';

    this.productService.products$.subscribe({
      next: product => this.products$ = product,
      error: catchError(err => this.errorMessage = err)
    });


  }


  

}
