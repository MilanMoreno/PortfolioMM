import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../shared/services/language/language.service';

@Component({
    selector: 'app-navigation-bar',
    imports: [CommonModule, RouterModule, TranslateModule],
    template: `
    <header class="header">
      <div class="header__container">
        <a class="header__logo" [routerLink]="['/']">
          <img src="assets/img/logo.png" alt="Logo" class="header__logo-img">
        </a>
        
        <nav class="header__nav">
          <ul class="header__menu">
            <li *ngFor="let item of menuItems" class="header__menu-item">
              <a 
                class="header__menu-link" 
                (click)="scrollToSection(item.fragment, $event)">
                {{ item.label | translate }}
              </a>
            </li>
          </ul>
        </nav>
        
        <div class="header__actions">
          <div class="header__languages">
            <button 
              *ngFor="let lang of languages" 
              class="header__lang-btn"
              [class.header__lang-btn--active]="currentLanguage === lang.code"
              (click)="switchLanguage(lang.code)">
              <img [src]="lang.flag" [alt]="lang.name" class="header__lang-img">
            </button>
          </div>
          
          <button 
            class="header__mobile-toggle" 
            [class.header__mobile-toggle--active]="isMobileMenuOpen"
            (click)="toggleMobileMenu()">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      
      <div class="header__mobile-menu" [class.header__mobile-menu--open]="isMobileMenuOpen">
        <nav class="header__mobile-nav">
          <ul class="header__mobile-list">
            <li *ngFor="let item of menuItems" class="header__mobile-item">
              <a 
                class="header__mobile-link" 
                (click)="scrollToSection(item.fragment, $event); closeMobileMenu()">
                {{ item.label | translate }}
              </a>
            </li>
          </ul>
        </nav>
        
        <div class="header__mobile-languages">
          <button 
            *ngFor="let lang of languages" 
            class="header__mobile-lang-btn"
            [class.header__mobile-lang-btn--active]="currentLanguage === lang.code"
            (click)="switchLanguage(lang.code)">
            <img [src]="lang.flag" [alt]="lang.name" class="header__mobile-lang-img">
            <span class="header__mobile-lang-name">{{ lang.name }}</span>
          </button>
        </div>
      </div>
    </header>
  `,
    styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: var(--header-height);
      background-color: var(--color-background-primary);
      z-index: 100;
      box-shadow: 0 0px 0px rgba(0, 0, 0, 0.1);
    }
    
    .header__container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      max-width: 1440px;
      margin: 0 auto;
      padding: 0 2rem;
    }
    
    .header__logo {
      display: flex;
      align-items: center;
      height: 60px;
    }
    
    .header__logo-img {
      height: 100%;
      width: auto;
    }
    
    .header__nav {
      flex: 1;
      display: flex;
      justify-content: center;
    }
    
    .header__menu {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 3rem;
    }
    
    .header__menu-item {
      position: relative;
    }
    
    .header__menu-link {
      color: var(--color-text-primary);
      font-size: 1.125rem;
      font-weight: 500;
      text-decoration: none;
      text-transform: uppercase;
      position: relative;
      padding: 0.5rem 0;
      cursor: pointer;
    }
    
    .header__menu-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background-color: var(--color-accent-primary);
      transition: width 0.3s ease;
    }
    
    .header__menu-link:hover::after {
      width: 100%;
    }
    
    .header__actions {
      display: flex;
      align-items: center;
      gap: 2rem;
    }
    
    .header__languages {
      display: flex;
      gap: 0.75rem;
    }
    
    .header__lang-btn {
      width: 24px;
      height: 24px;
      padding: 0;
      border: none;
      background: none;
      border-radius: 50%;
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.3s ease;
    }
    
    .header__lang-btn:hover {
      transform: scale(1.2);
    }
    
    .header__lang-btn--active {
      box-shadow: 0 0 0 2px var(--color-accent-primary);
    }
    
    .header__lang-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .header__mobile-toggle {
      display: none;
      width: 30px;
      height: 24px;
      position: relative;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
    }
    
    .header__mobile-toggle span {
      display: block;
      width: 100%;
      height: 2px;
      background-color: var(--color-text-primary);
      position: absolute;
      left: 0;
      transition: all 0.3s ease;
    }
    
    .header__mobile-toggle span:first-child {
      top: 0;
    }
    
    .header__mobile-toggle span:nth-child(2) {
      top: 50%;
      transform: translateY(-50%);
    }
    
    .header__mobile-toggle span:last-child {
      bottom: 0;
    }
    
    .header__mobile-toggle--active span:first-child {
      transform: rotate(45deg);
      top: 50%;
    }
    
    .header__mobile-toggle--active span:nth-child(2) {
      opacity: 0;
    }
    
    .header__mobile-toggle--active span:last-child {
      transform: rotate(-45deg);
      bottom: 50%;
    }
    
    .header__mobile-menu {
      position: fixed;
      top: var(--header-height);
      left: 0;
      width: 100%;
      height: calc(100vh - var(--header-height));
      background-color: var(--color-background-primary);
      transform: translateX(-100%);
      transition: transform 0.3s ease;
      z-index: 99;
      display: flex;
      flex-direction: column;
      padding: 2rem;
    }
    
    .header__mobile-menu--open {
      transform: translateX(0);
    }
    
    .header__mobile-nav {
      margin-bottom: 2rem;
    }
    
    .header__mobile-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .header__mobile-item {
      margin-bottom: 1.5rem;
    }
    
    .header__mobile-link {
      color: var(--color-text-primary);
      font-size: 1.5rem;
      text-decoration: none;
      text-transform: uppercase;
      cursor: pointer;
    }
    
    .header__mobile-languages {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }
    
    .header__mobile-lang-btn {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: none;
      border: 1px solid var(--color-accent-primary);
      padding: 0.75rem 1rem;
      border-radius: 8px;
      color: var(--color-text-primary);
      cursor: pointer;
    }
    
    .header__mobile-lang-btn--active {
      background-color: rgba(112, 230, 28, 0.1);
    }
    
    .header__mobile-lang-img {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
    
    .header__mobile-lang-name {
      font-size: 1rem;
    }
    
    @media (max-width: 992px) {
      .header__nav {
        display: none;
      }
      
      .header__mobile-toggle {
        display: block;
      }
    }
    
    @media (max-width: 768px) {
      .header {
        height: 70px;
      }
      
      .header__container {
        padding: 0 1.5rem;
      }
      
      .header__logo {
        height: 50px;
      }
      
      .header__languages {
        display: none;
      }
    }
    
    @media (max-width: 576px) {
      .header {
        height: 60px;
      }
      
      .header__container {
        padding: 0 1rem;
      }
      
      .header__logo {
        height: 40px;
      }
      
      .header__mobile-link {
        font-size: 1.25rem;
      }
      
      .header__mobile-lang-btn {
        padding: 0.5rem 0.75rem;
      }
      
      .header__mobile-lang-img {
        width: 20px;
        height: 20px;
      }
      
      .header__mobile-lang-name {
        font-size: 0.875rem;
      }
    }
  `]
})
export class NavigationBarComponent {
  isMobileMenuOpen = false;
   currentLanguage = 'en';

  menuItems = [
    { fragment: 'about', label: 'HEADER.ABOUT_ME' },
    { fragment: 'skills', label: 'HEADER.SKILLS' },
    { fragment: 'portfolio', label: 'HEADER.PORTFOLIO' }
  ];

  languages = [
    { code: 'fr', name: 'Français', flag: 'assets/img/france.png' },
    { code: 'tr', name: 'Türkçe', flag: 'assets/img/turkey.png' },
    { code: 'de', name: 'Deutsch', flag: 'assets/img/de.png' },
    { code: 'en', name: 'English', flag: 'assets/img/en.png' },
    { code: 'es', name: 'Español', flag: 'assets/img/sp.png' }
  ];

  constructor(
    private translateService: TranslateService,
    private languageService: LanguageService,
    private router: Router
  ) {
    translateService.addLangs(['fr', 'tr', 'en', 'es', 'de']);
       this.languageService.currentLanguage$.subscribe(lang => {
           this.currentLanguage = lang;
       });
  }

  /**
   * Smoothly scrolls to a section by ID
   * @param sectionId - The ID of the target section
   * @param event - The click event
   */
  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault(); // Prevent default behavior
    
    // Check if we're on the main page by checking the current route
    const currentUrl = this.router.url;
    const isOnMainPage = currentUrl === '/' || currentUrl === '';
    
    if (isOnMainPage) {
      // We're on the main page, scroll to the section
      this.scrollToElementById(sectionId);
    } else {
      // We're not on the main page, navigate to the main page first
      this.router.navigate(['/']).then(() => {
        // Use a more reliable method to wait for the page to load
        this.waitForElementAndScroll(sectionId);
      });
    }
  }
  
  /**
   * Scrolls to an element by its ID
   * @param sectionId - The ID of the target section
   */
  private scrollToElementById(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      this.scrollToElement(element);
    }
  }
  
  /**
   * Waits for an element to be available and then scrolls to it
   * @param sectionId - The ID of the target section
   */
  private waitForElementAndScroll(sectionId: string, maxAttempts: number = 10): void {
    let attempts = 0;
    
    const checkElement = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        // Element found, scroll to it
        setTimeout(() => this.scrollToElement(element), 50);
      } else if (attempts < maxAttempts) {
        // Element not found yet, try again
        attempts++;
        setTimeout(checkElement, 100);
      }
    };
    
    checkElement();
  }
  
  /**
   * Helper method to scroll to an element
   * @param element - The element to scroll to
   */
  private scrollToElement(element: HTMLElement): void {
    // Calculate the header height to offset the scroll position
    const headerHeight = this.getHeaderHeight();
    
    // Get element position and subtract header height for proper positioning
    const elementPosition = element.offsetTop - headerHeight - 20; // 20px additional padding
    
    window.scrollTo({
      top: Math.max(0, elementPosition), // Ensure we don't scroll to negative position
      behavior: 'smooth'
    });
  }

  /**
   * Get current header height based on screen size
   */
  private getHeaderHeight(): number {
    const width = window.innerWidth;
    if (width <= 350) return 50;
    if (width <= 480) return 60;
    if (width <= 768) return 70;
    return 90;
  }

  switchLanguage(lang: string): void {
    this.languageService.setLanguage(lang);
    this.closeMobileMenu();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
}
