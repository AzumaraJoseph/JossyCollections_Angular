import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Iuser } from './user/user.component';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'Jossy-Third-Project';
  isClicked: boolean = false;
  currentUser: any;

  get isLoggedIn() {
    return this.auth.isLoggedIn;
  }

  get userName(): string | null {
    return this.currentUser ? this.currentUser.firstName : null;
  }
  
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

  constructor(private router: Router, private elementRef: ElementRef, private auth: AuthService) { }
  
  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); // Scroll to top on navigation
      }  
    }); 

      this.auth.getCurrentUser().pipe(
        // map(res => res.data.data),
        map(res => this.currentUser = res),
        tap(user => console.log('user:', JSON.stringify(user)))
      ).subscribe();
  }

  toggleArrow(): void {
    this.isClicked = !this.isClicked;
  }
  
  logOut(): void {
    this.auth.logOut().subscribe(
      () => {
        this.router.navigate(['/login']);
        console.log('Log out success');
      }
    ); 
  }
} 
 
