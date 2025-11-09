// Firebase configuration and initialization
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, updateProfile, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFDb0UHJ1Oxp0qu5bNpU5Nddw_edhejHQ",
  authDomain: "build-lab-8ab53.firebaseapp.com",
  projectId: "build-lab-8ab53",
  storageBucket: "build-lab-8ab53.firebasestorage.app",
  messagingSenderId: "489727778169",
  appId: "1:489727778169:web:f32fb2d90c6045f2f4a3a8",
  measurementId: "G-7MB93C7WC7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Auth functions
export const authFunctions = {
  // Sign up with email and password
  async signUp(email, password, displayName = '') {
    try {
      console.log('🔄 Attempting signup for email:', email);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update display name if provided
      if (displayName && !user.displayName) {
        await updateProfile(user, {
          displayName: displayName
        });
      }

      console.log('✅ Signup successful for user:', user.email);
      return {
        success: true,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || displayName || user.email.split('@')[0],
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          providerData: user.providerData
        }
      };
    } catch (error) {
      console.error('❌ Signup failed:', error.code, error.message);
      const errorMessage = this.getErrorMessage(error.code, error.message);
      console.log('📝 User-friendly error:', errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    }
  },

  // Sign in with email and password
  async signIn(email, password) {
    try {
      console.log('🔄 Attempting login for email:', email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('✅ Login successful for user:', user.email);
      return {
        success: true,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email.split('@')[0],
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          providerData: user.providerData
        }
      };
    } catch (error) {
      console.error('❌ Login failed:', error.code, error.message);
      const errorMessage = this.getErrorMessage(error.code, error.message);
      console.log('📝 User-friendly error:', errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    }
  },

  // Sign in with Google
  async signInWithGoogle() {
    try {
      console.log('🔄 Attempting Google login...');
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      console.log('✅ Google login successful for user:', user.email);
      return {
        success: true,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email.split('@')[0],
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          providerData: user.providerData
        }
      };
    } catch (error) {
      console.error('❌ Google login failed:', error.code, error.message);
      const errorMessage = this.getErrorMessage(error.code, error.message);
      console.log('📝 User-friendly error:', errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    }
  },

  // Sign out
  async signOut() {
    try {
      console.log('🔄 Attempting logout...');
      await signOut(auth);
      console.log('✅ Logout successful');
      return { success: true };
    } catch (error) {
      console.error('❌ Logout failed:', error.code, error.message);
      const errorMessage = this.getErrorMessage(error.code, error.message);
      console.log('📝 User-friendly error:', errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    }
  },

  // Listen to auth state changes
  onAuthStateChange(callback) {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        callback({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email?.split('@')[0] || 'User',
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          providerData: user.providerData
        });
      } else {
        callback(null);
      }
    });
  },

  // Get current user
  getCurrentUser() {
    const user = auth.currentUser;
    if (user) {
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email?.split('@')[0] || 'User',
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
        providerData: user.providerData
      };
    }
    return null;
  },

  // Send password reset email
  async sendPasswordReset(email) {
    try {
      console.log('🔄 Sending password reset email to:', email);
      await sendPasswordResetEmail(auth, email);
      console.log('✅ Password reset email sent successfully');
      return { success: true };
    } catch (error) {
      console.error('❌ Password reset failed:', error.code, error.message);
      const errorMessage = this.getErrorMessage(error.code, error.message);
      console.log('📝 User-friendly error:', errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    }
  },

  // Helper function to get user-friendly error messages
  getErrorMessage(errorCode, errorMessage) {
    console.log('🔍 Processing error code:', errorCode);
    switch (errorCode) {
      case 'auth/email-already-in-use':
        console.log('📧 Email already exists');
        return 'This email is already registered. Try signing in instead.';
      case 'auth/weak-password':
        console.log('🔒 Password too weak');
        return 'Password should be at least 6 characters long.';
      case 'auth/invalid-email':
        console.log('📧 Invalid email format');
        return 'Please enter a valid email address.';
      case 'auth/user-disabled':
        console.log('🚫 User account disabled');
        return 'This account has been disabled. Please contact support.';
      case 'auth/user-not-found':
        console.log('👤 User not found');
        return 'No account found with this email. Please sign up first.';
      case 'auth/wrong-password':
        console.log('🔑 Wrong password');
        return 'Incorrect password. Please try again.';
      case 'auth/invalid-credential':
        console.log('❌ Invalid credentials');
        return 'Invalid credentials. Please check your email and password.';
      case 'auth/too-many-requests':
        console.log('⏰ Too many requests');
        return 'Too many failed attempts. Please try again later.';
      case 'auth/network-request-failed':
        console.log('🌐 Network error');
        return 'Network error. Please check your internet connection.';
      case 'auth/popup-closed-by-user':
        console.log('❌ Google popup closed by user');
        return 'Google sign-in was cancelled.';
      case 'auth/popup-blocked':
        console.log('🚫 Popup blocked');
        return 'Pop-up blocked. Please allow pop-ups for this site.';
      case 'auth/cancelled-popup-request':
        console.log('❌ Sign-in cancelled');
        return 'Sign-in was cancelled.';
      case 'auth/account-exists-with-different-credential':
        console.log('🔄 Account exists with different credential');
        return 'An account already exists with this email using a different sign-in method.';
      default:
        console.error('❓ Unhandled auth error:', errorCode, errorMessage);
        return 'An unexpected error occurred. Please try again.';
    }
  }
};
