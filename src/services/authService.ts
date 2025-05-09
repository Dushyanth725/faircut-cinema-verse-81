
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://vxjsghlwyidmifdszzfu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4anNnaGx3eWlkbWlmZHN6emZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MDc3MzcsImV4cCI6MjA2MjM4MzczN30.Ou87OZxCYKxx4N4zretUcfw7aTLq3kwFxPtNziZz64k';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Configuration for email sending (would typically be handled securely on backend)
const emailConfig = {
  senderEmail: 'faircutorg@gmail.com',
  // Note: App password should be securely stored in backend environment variables, 
  // not in frontend code. This is just for demonstration.
  appPassword: 'swuu nxru wcdb fqdr'
};

/**
 * Sends OTP email to user
 */
export const signInWithEmail = async (email: string) => {
  try {
    // For production, this would be handled by a secure backend service
    // Here we're using Supabase's built-in OTP functionality
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      throw error;
    }
    
    // In a real implementation, you might want to add additional logging or tracking here
    console.log("OTP email sent successfully to:", email);
    
    return { success: true, data };
  } catch (error) {
    console.error('Error sending OTP:', error);
    return { success: false, error };
  }
};

/**
 * Verifies the OTP code entered by the user
 */
export const verifyOtp = async (email: string, otp: string) => {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email',
    });

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return { success: false, error };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    return { success: true };
  } catch (error) {
    console.error('Error signing out:', error);
    return { success: false, error };
  }
};

export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      throw error;
    }
    return { success: true, user: data.user };
  } catch (error) {
    console.error('Error getting current user:', error);
    return { success: false, error };
  }
};
