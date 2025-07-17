import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { fadeInLeft, fadeInUp } from '../../../../shared/animations/fade.animations';
import { SupabaseService } from '../../../../shared/services/supabase/supabase.service';

@Component({
    selector: 'app-contact-section',
    imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslateModule],
    template: `
    <!-- Previous template code remains the same -->
    <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form">
      <!-- Form fields remain the same -->
    </form>
    `,
    styles: [/* Previous styles remain the same */]
})
export class ContactSectionComponent {
  @ViewChild('emailAlert') emailAlert!: ElementRef;
  contactForm: FormGroup;
  isSubmitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private supabaseService: SupabaseService
  ) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      privacyPolicy: [false, Validators.requiredTrue]
    });
  }

  async onSubmit() {
    if (this.contactForm.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    try {
      const result = await this.supabaseService.submitContactForm({
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        message: this.contactForm.value.message
      });

      if (result.success) {
        this.showSuccessMessage();
        this.contactForm.reset();
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (show error message to user)
    } finally {
      this.isSubmitting = false;
    }
  }

  private showSuccessMessage() {
    // Your existing success message display logic
  }
}