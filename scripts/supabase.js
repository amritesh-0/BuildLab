// Supabase Configuration
// Load configuration from environment or use defaults
const SUPABASE_CONFIG = {
  url: process?.env?.SUPABASE_URL ||
    (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
      ? 'https://jqbqhopwpvubdmrzyjmj.supabase.co'
      : 'https://jqbqhopwpvubdmrzyjmj.supabase.co'),

  anonKey: process?.env?.SUPABASE_ANON_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxYnFob3B3cHZ1YmRtcnp5am1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2NTU4ODIsImV4cCI6MjA3ODIzMTg4Mn0.d1iuy97u5ikDsN9FSRmTbxvMrOiGIsnaRBJBDRI1AAE'
};

const SUPABASE_URL = SUPABASE_CONFIG.url;
const SUPABASE_ANON_KEY = SUPABASE_CONFIG.anonKey;

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Authentication helper functions
const auth = {
  /**
   * Sign up a new user
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @param {object} metadata - Additional user metadata
   * @returns {Promise<{data: any, error: any}>}
   */
  async signUp(email, password, metadata = {}) {
    try {
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            ...metadata,
            created_at: new Date().toISOString()
          }
        }
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Signup error:', error);
      return { data: null, error };
    }
  },

  /**
   * Sign in an existing user
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @returns {Promise<{data: any, error: any}>}
   */
  async signIn(email, password) {
    try {
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Signin error:', error);
      return { data: null, error };
    }
  },

  /**
   * Sign out the current user
   * @returns {Promise<{error: any}>}
   */
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Signout error:', error);
      return { error };
    }
  },

  /**
   * Get the current authenticated user
   * @returns {Promise<{data: {user: any}, error: any}>}
   */
  async getCurrentUser() {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Get current user error:', error);
      return { data: null, error };
    }
  },

  /**
   * Get the current session
   * @returns {Promise<{data: {session: any}, error: any}>}
   */
  async getCurrentSession() {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Get current session error:', error);
      return { data: null, error };
    }
  },

  /**
   * Listen to authentication state changes
   * @param {Function} callback - Callback function for auth state changes
   * @returns {Object} Subscription object
   */
  onAuthStateChange(callback) {
    if (typeof callback !== 'function') {
      console.error('onAuthStateChange requires a callback function');
      return null;
    }
    return supabase.auth.onAuthStateChange(callback);
  },

  /**
   * Send password reset email
   * @param {string} email - User's email address
   * @returns {Promise<{error: any}>}
   */
  async resetPassword(email) {
    try {
      if (!email) {
        throw new Error('Email is required');
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
        redirectTo: `${window.location.origin}/reset-password`
      });
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Password reset error:', error);
      return { error };
    }
  },

  /**
   * Refresh the current session
   * @returns {Promise<{data: any, error: any}>}
   */
  async refreshSession() {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Session refresh error:', error);
      return { data: null, error };
    }
  }
};

// Export for use in other scripts
window.supabaseAuth = auth;
window.supabaseClient = supabase;
