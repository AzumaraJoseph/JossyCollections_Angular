import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { AuthService } from './shared/auth.service';

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


  onButtonClick(event: MouseEvent): void {
    this.isClicked = !this.isClicked;
    event.stopPropagation();
  }

  onDivClick(event: MouseEvent): void {
    // Stop propagation to prevent the document click handler from triggering
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target as Node);
    if (!clickedInside) {
      this.isClicked = false;
    }
  }


  constructor(private router: Router, private elementRef: ElementRef, public auth: AuthService) { }
  isClicked: boolean = false;

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn;
  }

  currentUser: string | undefined;

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); // Scroll to top on navigation
      }
  
      // this.checkRouterEvent(event);
  
    });   

     // Initialize the current user
     if (this.auth.isLoggedIn) {
      this.currentUser = this.auth.currentUser.name;
    } else {
      this.currentUser = 'Guest';
    }
  }

  toggleArrow(): void {
    // this.arrow = this.arrow === 'keyboard_arrow_down' ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
    this.isClicked = !this.isClicked;
    }
  
} 
 
