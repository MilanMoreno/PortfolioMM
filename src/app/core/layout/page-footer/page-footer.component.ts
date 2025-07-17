import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ClipboardManagerService } from '../../../shared/services/clipboard/clipboard.service';

@Component({
    selector: 'app-page-footer',
    imports: [CommonModule, RouterModule, TranslateModule],
    template: `
    <footer class="footer">
      <div class="footer__container">
        <div class="footer__content">
          <div class="footer__brand-section">
            <img 
              src="assets/img/logo.png" 
              alt="Logo" 
              class="footer__logo"
              routerLink="/">
            <a routerLink="/legal/imprint" class="footer__legal-link">
              {{ 'FOOTER.IMPRINT' | translate }}
            </a>
          </div>
          
          <div class="footer__copyright">
            © Milan Moreno 2025
          </div>
          
          <div class="footer__social">
            <a 
              href="https://github.com/MilanMoreno" 
              target="_blank" 
              class="footer__social-link">
              <img src="assets/img/github.png" alt="GitHub" class="footer__social-icon">
            </a>
            <button 
              class="footer__social-link"
              (click)="copyEmail()">
              <img src="assets/img/email.png" alt="Email" class="footer__social-icon">
            </button>
            <a 
              href="https://www.linkedin.com/in/milan-moreno-9a7482360/"
              target="_blank" 
              class="footer__social-link">
              <img src="assets/img/linkedin.png" alt="LinkedIn" class="footer__social-icon">
            </a>
          </div>
        </div>
      </div>
      
      <div class="footer__notification" [class.footer__notification--visible]="(clipboardService.copyStatus$ | async)">
        {{ 'FOOTER.EMAIL_COPIED' | translate }}
      </div>
    </footer>
  `,
    styles: [`
    .footer {
      position: relative;
      width: 100%;
      background-color: var(--color-background-primary);
      border-top: 2px solid var(--color-accent-primary);
      padding: 3rem 0;
    }
    
    .footer__container {
      max-width: 1440px;
      margin: 0 auto;
      padding: 0 2rem;
    }
    
    .footer__content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .footer__brand-section {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    
    .footer__logo {
      height: 60px;
      margin-bottom: 1rem;
      cursor: pointer;
      transition: transform 0.3s ease;
    }
    
    .footer__logo:hover {
      transform: scale(1.05);
    }
    
    .footer__legal-link {
      color: var(--color-text-primary);
      text-decoration: none;
      font-size: 1rem;
      margin-top: -25px;
      width: 50%;
      text-align: left;
      transition: color 0.3s ease;
      padding-left: 22px;
    }
    
    .footer__legal-link:hover {
      color: var(--color-accent-primary);
    }
    
    .footer__copyright {
      color: var(--color-text-primary);
      font-size: 23px;
      width: 300px;
    }
    
    .footer__social {
      display: flex;
      gap: 1.5rem;
    }
    
    .footer__social-link {
      background: none;
      border: none;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s ease;
    }
    
    .footer__social-link:hover {
      transform: scale(1.2);
    }
    
    .footer__social-icon {
      width: 24px;
      height: 24px;
      transition: filter 0.3s ease;
    }
    
    .footer__social-link:hover .footer__social-icon {
      filter: brightness(0) saturate(100%) invert(76%) sepia(15%) saturate(4614%) hue-rotate(71deg) brightness(102%) contrast(101%);
    }
    
    .footer__notification {
      position: fixed;
      bottom: -100px;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba(0, 0, 0, 0.8);
      color: var(--color-text-primary);
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      transition: bottom 0.3s ease;
      z-index: 100;
    }
    
    .footer__notification--visible {
      bottom: 2rem;
    }
    
    @media (max-width: 992px) {
      .footer__content {
        flex-direction: column;
        gap: 2rem;
        text-align: center;
      }
       .footer__legal-link {
     
      padding-left: 1px;
    }
    
      .footer__brand-section {
        align-items: center;
      }
    }
    
    @media (max-width: 768px) {
      .footer {
        padding: 2rem 0;
      }
      
      .footer__container {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }

      .footer__brand-section {
        align-items: center;
      }

      .footer__logo {
        max-width: 70vw;
      }
      
      .footer__legal-link {
        display: none;
      }

      .footer__social {
        margin-bottom: 10px;
      }
      
      .footer__copyright {
        text-align: center;
        margin-bottom: 10px;
      }
    }
    
    @media (max-width: 576px) {
      .footer__logo {
        height: 40px;
      }
      
      .footer__legal-link,
      .footer__copyright {
        font-size: 0.875rem;
      }
      
      .footer__social-icon {
        width: 20px;
        height: 20px;
      }
    }
  `]
})
export class PageFooterComponent {
  constructor(public clipboardService: ClipboardManagerService) {}
  
  copyEmail(): void {
    this.clipboardService.copyToClipboard('milan.moreno.crea@gmail.com');
  }
}