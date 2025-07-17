import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { Observable, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private tokenRefresh$: Observable<any> = EMPTY;

  constructor() {
    console.log('Initializing Supabase client with:', {
      url: environment.supabaseUrl,
      hasAnonKey: !!environment.supabaseAnonKey
    });

    // Initialize Supabase client with anon key
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false
        },
        global: {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      }
    );
  }

  async testConnection() {
    try {
      console.log('Testing Supabase connection...');
      const { data, error } = await this.supabase
        .from('contact_requests')
        .select('count', { count: 'exact', head: true });
      
      if (error) {
        console.error('Connection test failed:', error);
        return { success: false, error };
      }
      
      console.log('Connection test successful');
      return { success: true, data };
    } catch (error) {
      console.error('Connection test error:', error);
      return { success: false, error };
    }
  }

  async submitContactForm(formData: {
    name: string;
    email: string;
    message: string;
  }) {
    try {
      console.log('Attempting to submit contact form:', formData);
      console.log('Supabase URL:', environment.supabaseUrl);
      
      // Skip connection test and try direct insertion

      // Use the REST API directly with the anon key for public access
      const { data, error } = await this.supabase
        .from('contact_requests')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            subject: 'Contact Form Submission',
            processed: false,
            email_sent: false
          }
        ])
        .select();

      if (error) {
        console.error('Error inserting into contact_requests:', error);
        
        // Provide more specific error messages
        if (error.message.includes('relation "contact_requests" does not exist')) {
          return { 
            success: false, 
            error: 'Database table not found. Please run the SQL script to create the contact_requests table.' 
          };
        }
        
        if (error.message.includes('permission denied')) {
          return { 
            success: false, 
            error: 'Permission denied. Please check the database policies.' 
          };
        }
        
        throw error;
      }

      console.log('Successfully submitted contact form:', data);
      
      return { success: true, data };
    } catch (error: any) {
      console.error('Error submitting form:', error);
      
      // Handle network errors
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        return { 
          success: false, 
          error: 'Network error. Please check your internet connection and try again.' 
        };
      }
      
      return { 
        success: false, 
        error: error.message || 'An unexpected error occurred. Please try again later.' 
      };
    }
  }
}
