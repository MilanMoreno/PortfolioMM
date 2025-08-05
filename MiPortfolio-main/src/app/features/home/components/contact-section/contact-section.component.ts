import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { fadeInLeft, fadeInUp } from '../../../../shared/animations/fade.animations';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  privacyPolicy: boolean;
}

@Component({
    selector: 'app-contact-section',
    imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
    template: `
    <section class="contact" id="contact">
      <div class="contact__container">
        <header class="contact__header">
          <div class="contact__title-wrapper">
            <div class="contact__line"></div>
            <h2 class="contact__title">{{ 'CONTACT.HEADLINE' | translate }}</h2>
          </div>
        </header>

        <div class="contact__content">
          <div class="contact__intro">
            <h3 class="contact__subtitle" [@fadeInUp]>
              {{ 'CONTACT.INTRODUCTION' | translate }}
            </h3>
            <p>{{ 'CONTACT.DESCRIPTION_1' | translate }}</p>
            <p>
              {{ 'CONTACT.DESCRIPTION_2' | translate }}
              <strong>{{ 'CONTACT.DESCRIPTION_3' | translate }}</strong>
            </p>
          </div>

          <form 
            class="contact__form" 
            (ngSubmit)="onSubmit(contactForm)"
            #contactForm="ngForm"
            [@fadeInLeft]
            novalidate>
            
            <div class="contact__form-group">
              <input
                type="text"
                id="name"
                name="name"
                [(ngModel)]="formData.name"
                #name="ngModel"
                required
                minlength="2"
                maxlength="100"
                [placeholder]="'CONTACT.NAME_PLACEHOLDER' | translate"
                [class.is-invalid]="name.invalid && (name.dirty || name.touched)"
                autocomplete="name">
              
              <div class="contact__error-container">
                <span class="contact__error" *ngIf="name.invalid && name.touched">
                  <span *ngIf="name.errors?.['required']">
                    {{ 'CONTACT.NAME_REQUIRED_ERROR' | translate }}
                  </span>
                  <span *ngIf="name.errors?.['minlength']">
                    {{ 'CONTACT.NAME_MIN_LENGTH_ERROR' | translate }}
                  </span>
                </span>
              </div>
            </div>

            <div class="contact__form-group">
              <input
                type="email"
                id="email"
                name="email"
                [(ngModel)]="formData.email"
                #email="ngModel"
                required
                email
                maxlength="254"
                [placeholder]="'CONTACT.EMAIL_PLACEHOLDER' | translate"
                [class.is-invalid]="email.invalid && (email.dirty || email.touched)"
                autocomplete="email">
              
              <div class="contact__error-container">
                <span class="contact__error" *ngIf="email.invalid && email.touched">
                  <span *ngIf="email.errors?.['required']">
                    {{ 'CONTACT.EMAIL_REQUIRED_ERROR' | translate }}
                  </span>
                  <span *ngIf="email.errors?.['email']">
                    {{ 'CONTACT.EMAIL_INVALID_ERROR' | translate }}
                  </span>
                </span>
              </div>
            </div>

            <div class="contact__form-group">
              <textarea
                id="message"
                name="message"
                [(ngModel)]="formData.message"
                #message="ngModel"
                required
                minlength="10"
                maxlength="1000"
                rows="4"
                [placeholder]="'CONTACT.MESSAGE_PLACEHOLDER' | translate"
                [class.is-invalid]="message.invalid && (message.dirty || message.touched)">
              </textarea>
              
              <div class="contact__error-container">
                <span class="contact__error" *ngIf="message.invalid && message.touched">
                  <span *ngIf="message.errors?.['required']">
                    {{ 'CONTACT.MESSAGE_REQUIRED_ERROR' | translate }}
                  </span>
                  <span *ngIf="message.errors?.['minlength']">
                    {{ 'CONTACT.MESSAGE_MIN_LENGTH_ERROR' | translate }}
                  </span>
                </span>
              </div>
            </div>

            <div class="contact__form-group">
              <label class="contact__checkbox-label">
                <input
                  type="checkbox"
                  name="privacyPolicy"
                  [(ngModel)]="formData.privacyPolicy"
                  #privacyPolicy="ngModel"
                  required>
                <span class="contact__checkbox-custom"></span>
                <span class="contact__checkbox-text">
                  {{ 'CONTACT.PRIVACY_POLICY_TEXT1' | translate }}
                  <a routerLink="/legal/privacy" target="_blank">
                    {{ 'CONTACT.PRIVACY_POLICY_TEXT2' | translate }}
                  </a>
                  {{ 'CONTACT.PRIVACY_POLICY_TEXT3' | translate }}
                </span>
              </label>
              
              <div class="contact__error-container">
                <span class="contact__error" *ngIf="privacyPolicy.invalid && privacyPolicy.touched">
                  {{ 'CONTACT.PRIVACY_POLICY_ERROR' | translate }}
                </span>
              </div>
            </div>

            <div class="contact__form-actions">
              <button 
                type="submit" 
                class="contact__submit"
                [disabled]="contactForm.invalid || isSubmitting"
                [attr.aria-label]="'CONTACT.SEND_BUTTON' | translate">
                <span *ngIf="!isSubmitting">{{ 'CONTACT.SEND_BUTTON' | translate }}</span>
                <span *ngIf="isSubmitting">{{ 'CONTACT.SENDING_BUTTON' | translate }}</span>
              </button>
            </div>

            <!-- Success/Error Messages -->
            <div class="contact__messages" *ngIf="submitMessage">
              <div 
                class="contact__message" 
                [class.contact__message--success]="submitSuccess"
                [class.contact__message--error]="!submitSuccess">
                {{ submitMessage }}
              </div>
            </div>
          </form>
        </div>

        <a href="#hero" class="contact__scroll-top" [attr.aria-label]="'CONTACT.SCROLL_TO_TOP' | translate">
          <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
            <path d="M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0zm0 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm1.879 7.121l5.707 5.707a1 1 0 01-1.414 1.414L17 11.071V24a1 1 0 01-2 0V11.07l-5.172 5.173a1 1 0 01-1.414-1.414l5.707-5.707a1 1 0 011.414 0 1 1 0 011.344 0z"/>
          </svg>
        </a>
      </div>

      <img 
        class="contact__shadow" 
        src="assets/img/shadow-purple-big.png" 
        alt=""
        loading="lazy"
        width="960"
        height="640"
      />
    </section>
  `,
    styles: [`
    .contact {
      position: relative;
      display: flex;
      justify-content: center;
      width: 100%;
    }

    .contact__container {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: var(--color-background-primary);
      min-height: 100vh;
      width: 100%;
      max-width: 1920px;
    }

    .contact__header {
      display: flex;
      align-items: center;
      width: 100%;
      margin-bottom: 4rem;
      z-index: 60;
    }

    .contact__title-wrapper {
      display: flex;
      align-items: center;
      width: 100%;
    }

    .contact__line {
      background-color: var(--color-accent-secondary);
      width: 50px;
      height: 4px;
      margin-right: 2rem;
    }

    .contact__title {
      font-size: var(--font-size-heading-large);
      color: var(--color-text-primary);
      margin: 0;
    }

    .contact__content {
      display: flex;
      justify-content: center;
      gap: 4rem;
      width: 100%;
      max-width: 1200px;
      padding: 0 2rem;
    }

    .contact__intro {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 470px;
      z-index: 60;

      p {
        font-size: var(--font-size-base);
        color: var(--color-text-primary);
        line-height: 1.6;
      }
    }

    .contact__subtitle {
      color: var(--color-text-primary);
      font-size: var(--font-size-heading-medium);
      margin: 0;
    }

    .contact__form {
      width: 680px;
      z-index: 60;
    }

    .contact__form-group {
      margin-bottom: 2.5rem;
      position: relative;
    }

    .contact__error-container {
      position: relative;
      min-height: 20px;
      margin-top: 8px;
    }

    .contact__input,
    input,
    textarea {
      width: 100%;
      font-size: 17px;
      border: 1px solid var(--color-accent-secondary);
      border-radius: 10px;
      padding: 15px 25px;
      background-color: rgba(20, 29, 47, 0.1);
      color: var(--color-text-primary);
      transition: border-color 0.3s ease;
      box-sizing: border-box;

      &::placeholder {
        color: var(--color-text-primary);
        opacity: 0.7;
      }

      &:hover {
        border-color: var(--color-accent-primary);
      }

      &:focus {
        outline: none;
        border-color: var(--color-accent-primary);
        box-shadow: 0 0 0 2px rgba(var(--color-accent-primary-rgb), 0.2);
      }

      &.is-invalid {
        border-color: var(--color-error, #ff4444);
      }
    }

    textarea {
      min-height: 150px;
      resize: vertical;
      font-family: inherit;
    }

    .contact__checkbox-label {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      color: var(--color-text-primary);
      cursor: pointer;
      line-height: 1.5;

      input[type="checkbox"] {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
      }
    }

    .contact__checkbox-custom {
      width: 20px;
      height: 20px;
      border: 2px solid var(--color-accent-secondary);
      border-radius: 4px;
      position: relative;
      flex-shrink: 0;
      margin-top: 2px;
      transition: border-color 0.3s ease;

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 6px;
        height: 12px;
        border: solid var(--color-text-primary);
        border-width: 0 2px 2px 0;
        transform: translate(-50%, -50%) rotate(45deg) scale(0);
        transition: transform 0.2s ease;
      }
    }

    input[type="checkbox"]:checked + .contact__checkbox-custom {
      border-color: var(--color-accent-primary);
      background-color: var(--color-accent-primary);

      &::after {
        transform: translate(-50%, -50%) rotate(45deg) scale(1);
        border-color: var(--color-text-on-primary, white);
      }
    }

    input[type="checkbox"]:focus + .contact__checkbox-custom {
      box-shadow: 0 0 0 2px rgba(var(--color-accent-primary-rgb), 0.2);
    }

    .contact__checkbox-text {
      font-size: 15px;

      a {
        color: var(--color-accent-secondary);
        text-decoration: underline;
        margin: 0 5px;
        transition: color 0.3s ease;

        &:hover,
        &:focus {
          color: var(--color-accent-primary);
        }
      }
    }

    .contact__error {
      display: block;
      color: var(--color-error, #ff4444);
      font-size: 14px;
      position: absolute;
      left: 0;
      top: 0;
    }

    .contact__form-actions {
      display: flex;
      justify-content: center;
      margin-top: 2rem;
    }

    .contact__submit {
      width: 250px;
      background-color: var(--color-accent-primary);
      border: none;
      border-radius: 10px;
      padding: 15px 30px;
      color: var(--color-text-on-primary, white);
      font-size: var(--font-size-base);
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      &:not(:disabled):hover {
        background-color: var(--color-accent-secondary);
        transform: translateY(-2px);
      }

      &:not(:disabled):active {
        transform: translateY(0);
      }

      &:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(var(--color-accent-primary-rgb), 0.3);
      }
    }

    .contact__messages {
      margin-top: 2rem;
    }

    .contact__message {
      padding: 1rem;
      border-radius: 8px;
      text-align: center;
      font-size: 16px;

      &--success {
        background-color: rgba(0, 255, 0, 0.1);
        color: var(--color-success, #00ff00);
        border: 1px solid var(--color-success, #00ff00);
      }

      &--error {
        background-color: rgba(255, 0, 0, 0.1);
        color: var(--color-error, #ff4444);
        border: 1px solid var(--color-error, #ff4444);
      }
    }

    .contact__scroll-top {
      position: absolute;
      right: 100px;
      bottom: 50px;
      height: 40px;
      width: 40px;
      color: var(--color-text-primary);
      transition: color 0.3s ease, transform 0.3s ease;
      text-decoration: none;

      &:hover,
      &:focus {
        color: var(--color-accent-primary);
        transform: translateY(-2px);
      }

      &:focus {
        outline: 2px solid var(--color-accent-primary);
        outline-offset: 2px;
      }

      svg {
        width: 100%;
        height: 100%;
      }
    }

    .contact__shadow {
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 1;
      max-width: 50%;
      height: auto;
    }

    @media (max-width: 1395px) {
      .contact__content {
        flex-direction: column;
        align-items: center;
      }

      .contact__intro {
        width: 100%;
        max-width: 80vw;
        text-align: center;
      }

      .contact__form {
        width: 100%;
        max-width: 80vw;
      }
    }

    @media (max-width: 768px) {
      .contact__scroll-top {
        right: 1rem;
        bottom: 1rem;
      }

      .contact__title {
        font-size: 45px;
      }

      .contact__subtitle {
        font-size: 24px;
      }

      .contact__shadow {
        display: none;
      }

      .contact__content {
        padding: 0 1rem;
      }

      .contact__checkbox-text {
        font-size: 14px;
      }
    }

    @media (max-width: 480px) {
      .contact__checkbox-text {
        font-size: 12px;
      }

      .contact__submit {
        width: 100%;
      }

      .contact__intro {
        max-width: 95vw;
      }

      .contact__form {
        max-width: 95vw;
      }
    }
  `],
    animations: [fadeInLeft, fadeInUp]
})
export class ContactSectionComponent {
  formData: ContactFormData = {
    name: '',
    email: '',
    message: '',
    privacyPolicy: false
  };

  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;

  async onSubmit(form: NgForm): Promise<void> {
    if (form.invalid || this.isSubmitting) {
      this.markAllFieldsAsTouched(form);
      return;
    }

    this.isSubmitting = true;
    this.submitMessage = '';

    try {
      // Simulate API call - replace with your actual service call
      await this.submitContactForm();
      
      this.submitSuccess = true;
      this.submitMessage = 'Your message has been sent successfully!';
      
      // Reset form after successful submission
      form.resetForm();
      this.resetFormData();
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        this.submitMessage = '';
      }, 5000);
      
    } catch (error) {
      console.error('Failed to submit form:', error);
      this.submitSuccess = false;
      this.submitMessage = 'Failed to send message. Please try again.';
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        this.submitMessage = '';
      }, 5000);
    } finally {
      this.isSubmitting = false;
    }
  }

  private async submitContactForm(): Promise<void> {
    // Replace this with your actual service call
    // Example: await this.contactService.submitForm(this.formData);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate potential error (remove this in production)
    if (Math.random() < 0.1) {
      throw new Error('Simulated API error');
    }
  }

  private markAllFieldsAsTouched(form: NgForm): void {
    Object.keys(form.controls).forEach(key => {
      form.controls[key].markAsTouched();
    });
  }

  private resetFormData(): void {
    this.formData = {
      name: '',
      email: '',
      message: '',
      privacyPolicy: false
    };
  }
}