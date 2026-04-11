# Firebase Authentication Setup Guide

## 🔥 **Current Issues & Solutions**

### **Issue 1: `auth/operation-not-allowed`**
**Cause:** Google Sign-In not enabled in Firebase Console
**Solution:**
1. Go to: https://console.firebase.google.com/project/minifreelancing/authentication
2. Click "Sign-in method" tab
3. Click "Google" → Enable → Save
4. Add authorized domains: `localhost`, `127.0.0.1`

### **Issue 2: `auth/invalid-credential`**
**Cause:** Email/Password authentication not enabled in Firebase Console
**Solution:**
1. Go to: https://console.firebase.google.com/project/minifreelancing/authentication
2. Click "Email/Password" → Enable → Save

### **Issue 3: Loading State After Sign-In**
**Cause:** Missing error handling and proper state management
**Solution:** Fixed in updated Firebase context

## 🚀 **Step-by-Step Fix**

### **Step 1: Enable Authentication Methods (5 minutes)**
1. **Enable Email/Password:**
   - Go to Firebase Console → Authentication → Sign-in method
   - Click "Email/Password" → Enable → Save

2. **Enable Google Sign-In:**
   - Click "Google" → Enable → Save
   - Add authorized domains: `localhost`, `127.0.0.1`

### **Step 2: Deploy Security Rules (2 minutes)**
1. Go to: https://console.firebase.google.com/project/minifreelancing/firestore/rules
2. Copy content from `firestore.rules` file
3. Paste and click "Publish"

### **Step 3: Test Authentication Flow**

**Test Email/Password Registration:**
1. Navigate to: `http://localhost:3000/register`
2. Fill form:
   - Email: `test@example.com`
   - Password: `Test123456`
   - Name: `Test User`
   - Role: Select Client or Freelancer
3. Click "Create Account"
4. Should redirect to login page

**Test Email/Password Login:**
1. Navigate to: `http://localhost:3000/login`
2. Use same credentials
3. Should redirect to role-specific dashboard

**Test Google Sign-In:**
1. Navigate to: `http://localhost:3000/login` or `/register`
2. Click "Sign up with Google"
3. Should work and redirect to dashboard

## 🔧 **Troubleshooting**

### **If Still Getting Errors:**
1. **Check Firebase Project ID:**
   - Should be: `minifreelancing`
   - URL: https://console.firebase.google.com/project/minifreelancing

2. **Check API Keys:**
   - Go to Project Settings → General
   - Verify Web API Key is active

3. **Check Domain Configuration:**
   - Ensure `localhost` and `127.0.0.1` are in authorized domains
   - For production: Add your actual domain

### **Common Error Codes:**
- `auth/operation-not-allowed` → Enable the authentication method
- `auth/invalid-credential` → Check email/password authentication
- `auth/user-not-found` → User doesn't exist, register first
- `auth/wrong-password` → Incorrect password
- `auth/email-already-in-use` → Email already registered

## ✅ **Expected Behavior After Fix**

1. **Registration:**
   - Creates Firebase Auth user
   - Saves profile to Firestore `users` collection
   - Redirects to login page

2. **Login:**
   - Authenticates with Firebase Auth
   - Loads user profile from Firestore
   - Redirects to correct dashboard

3. **Google Sign-In:**
   - Creates or signs in user
   - Creates profile if doesn't exist
   - Redirects to dashboard

## 🎯 **Next Steps After Fix**

1. Test all authentication flows
2. Verify user data appears in Firestore
3. Test role-based routing
4. Deploy security rules
5. Set up Firestore indexes

## 📞 **Need Help?**

If issues persist:
1. Check Firebase Console configuration
2. Verify project ID matches
3. Ensure all authentication methods are enabled
4. Check authorized domains list

The authentication system is fully implemented - just needs proper Firebase Console configuration!
