
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://vxjsghlwyidmifdszzfu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4anNnaGx3eWlkbWlmZHN6emZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MDc3MzcsImV4cCI6MjA2MjM4MzczN30.Ou87OZxCYKxx4N4zretUcfw7aTLq3kwFxPtNziZz64k';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Store OTPs in memory (in a real app, you'd use a database with TTL)
const otpStore = new Map<string, { otp: string, expires: number }>();

// Generate a random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Validate email format
const isValidEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Sends OTP email to user
 */
export const signInWithEmail = async (email: string) => {
  try {
    if (!isValidEmail(email)) {
      return { success: false, error: { message: 'Invalid email format' } };
    }

    // Generate a 6-digit OTP
    const otp = generateOTP();
    
    // Store the OTP with 10-minute expiration
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    otpStore.set(email, { otp, expires: expiresAt });

    // Send the OTP via Supabase Auth (this will trigger an email)
    // In a real implementation, you would customize this email template in Supabase
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // Use the OTP as the email subject to make it visible
        // (Note: In a real implementation, you'd use a proper email service)
        emailRedirectTo: `${window.location.origin}?otp=${otp}`,
      },
    });

    if (error) {
      throw error;
    }
    
    console.log("OTP email sent successfully to:", email, "OTP:", otp);
    
    return { success: true, message: 'OTP sent successfully' };
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
    const storedData = otpStore.get(email);
    
    if (!storedData) {
      return { success: false, error: { message: 'No OTP was sent to this email or it has expired' } };
    }
    
    if (Date.now() > storedData.expires) {
      otpStore.delete(email); // Clean up expired OTP
      return { success: false, error: { message: 'OTP has expired. Please request a new one.' } };
    }
    
    if (storedData.otp !== otp) {
      return { success: false, error: { message: 'Invalid OTP. Please try again.' } };
    }
    
    // OTP is valid, clear it from storage
    otpStore.delete(email);
    
    // Sign in the user with Supabase
    // Fixed: removed the invalid 'token' property
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      }
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
