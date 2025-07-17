import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );
  }

  async submitContactForm(formData: {
    name: string;
    email: string;
    message: string;
  }) {
    try {
      const { data, error } = await this.supabase
        .from('contact_requests')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            processed: false,
            email_sent: false
          }
        ])
        .select();

      if (error) throw error;

      // Call the edge function to send email
      const { data: emailData, error: emailError } = await this.supabase.functions.invoke(
        'send-email',
        {
          body: {
            to: 'milan.moreno.crea@gmail.com',
            subject: `New Contact Form Submission from ${formData.name}`,
            name: formData.name,
            email: formData.email,
            message: formData.message
          }
        }
      );

      if (emailError) throw emailError;

      return { success: true, data };
    } catch (error) {
      console.error('Error submitting form:', error);
      return { success: false, error };
    }
  }
}