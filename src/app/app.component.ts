import { Component, HostListener, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Jossy-Third-Project';

  
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


  // checkRouterEvent(routerEvent: Event): void {
  //   console.log(routerEvent);
    
  //   if (routerEvent instanceof NavigationStart) {
  //     this.isLoading = true;
  //   } 
  //   if ( routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationError) {
  //     this.isLoading = false;
  //     window.scrollTo(0, 0); // Scroll to top on navigation
  //   }
  // }

  constructor(private router: Router) { }
  
  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); // Scroll to top on navigation
      }
  
      // this.checkRouterEvent(event);
  
    });   
  }

  
} 
 
