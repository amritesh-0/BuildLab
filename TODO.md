# Authentication and Session Management Fixes

## Issues Identified
1. **Label Mismatch**: Login/signup forms label inputs as "Username" but treat as email in code.
2. **Signup Form Issues**: "Email / Phone" label but only handles email; password confirmation validation only after submit.
3. **Session Management**: Dashboard relies on stale localStorage without proper Firebase session verification.
4. **Auth State Handling**: Inconsistent token refresh and session expiry handling.
5. **User Data Sync**: localStorage may desync with Firebase session.

## Tasks
- [x] Update login.html: Change "Username" label to "Email" and ensure input is treated as email.
- [x] Update signup.html: Change "Email / Phone" label to "Email"; add real-time password confirmation validation.
- [x] Update dashboard.js: Implement proper session verification on load; sync localStorage with Firebase auth state; handle auth state changes.
- [x] Update firebase.js: Ensure consistent error handling and user data return.
- [x] Test login, signup, dashboard load, logout, and session expiry scenarios.
