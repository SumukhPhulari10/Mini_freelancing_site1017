import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  db, 
  googleProvider, 
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs
} from './firebase';

const FirebaseAuthContext = createContext();

export const useFirebaseAuth = () => {
  const context = useContext(FirebaseAuthContext);
  if (!context) {
    throw new Error('useFirebaseAuth must be used within FirebaseAuthProvider');
  }
  return context;
};

// Generate notifications based on user role
const generateNotifications = (role, userData) => {
  const now = new Date();
  
  if (role === 'client') {
    return [
      {
        id: 1,
        type: 'bid',
        title: 'New Bid Received',
        message: 'Alex Johnson placed a bid of $450 on your "E-commerce Website" project.',
        time: new Date(now - 5 * 60000).toISOString(),
        read: false,
        icon: 'Portfolio'
      },
      {
        id: 2,
        type: 'message',
        title: 'Message from Sarah Miller',
        message: 'Hi! I wanted to discuss the project requirements in more detail...',
        time: new Date(now - 30 * 60000).toISOString(),
        read: false,
        icon: 'MessageCircle'
      },
      {
        id: 3,
        type: 'update',
        title: 'Project Milestone Completed',
        message: 'Freelancer David Park marked "Design Phase" as complete on your mobile app project.',
        time: new Date(now - 2 * 3600000).toISOString(),
        read: false,
        icon: 'CheckCircle'
      }
    ];
  } else {
    // Freelancer notifications
    const skills = userData?.skills || ['Web Development'];
    return [
      {
        id: 1,
        type: 'job',
        title: 'New Job Match',
        message: `A new "${skills[0] || 'Development'}" job was posted: "Build a Modern Dashboard" - Budget: $800-$1200.`,
        time: new Date(now - 10 * 60000).toISOString(),
        read: false,
        icon: 'Briefcase'
      },
      {
        id: 2,
        type: 'message',
        title: 'Message from TechCorp Inc.',
        message: 'We reviewed your proposal and would like to schedule an interview...',
        time: new Date(now - 45 * 60000).toISOString(),
        read: false,
        icon: 'MessageCircle'
      },
      {
        id: 3,
        type: 'bid',
        title: 'Bid Accepted!',
        message: 'Congratulations! Your bid on "Mobile App UI Design" was accepted by InnovateTech.',
        time: new Date(now - 3 * 3600000).toISOString(),
        read: false,
        icon: 'TrendingUp'
      }
    ];
  }
};

export const FirebaseAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  
  // Save user profile to Firestore
  const saveUserProfile = async (firebaseUser, additionalData = {}) => {
    try {
      const userRef = doc(db, 'users', firebaseUser.uid);
      const userDoc = await getDoc(userRef);
      
      const profileData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName || additionalData.name || '',
        avatar: firebaseUser.photoURL || null,
        role: additionalData.role || 'freelancer',
        phone: additionalData.phone || '',
        location: additionalData.location || '',
        bio: additionalData.bio || '',
        companyName: additionalData.companyName || '',
        workType: additionalData.workType || '',
        skills: additionalData.skills || [],
        experience: additionalData.experience || 'beginner',
        hourlyRate: additionalData.hourlyRate || '',
        portfolioUrl: additionalData.portfolioUrl || '',
        education: additionalData.education || '',
        availability: additionalData.availability || 'available',
        createdAt: userDoc.exists() ? userDoc.data().createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isVerified: firebaseUser.emailVerified || false
      };

      await setDoc(userRef, profileData);
      return profileData;
    } catch (err) {
      console.error('Error saving user profile:', err);
      throw err;
    }
  };

  // Get user profile from Firestore
  const getUserProfile = async (uid) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        return userDoc.data();
      }
      return null;
    } catch (err) {
      console.error('Error getting user profile:', err);
      throw err;
    }
  };

  // Update user profile
  const updateUserProfile = async (uid, updates) => {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: new Date().toISOString()
      });
      
      // Update local state
      setUserProfile(prev => ({ ...prev, ...updates }));
    } catch (err) {
      console.error('Error updating user profile:', err);
      throw err;
    }
  };

  // Sign up with email and password
  const signup = async (email, password, userData) => {
    try {
      setError(null);
      setIsLoading(true);

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Save user profile to Firestore
      const profile = await saveUserProfile(firebaseUser, userData);
      
      // Send email verification
      await sendEmailVerification(firebaseUser);
      console.log('Verification email sent to:', email);
      
      setUser(firebaseUser);
      setUserProfile(profile);
      
      // Generate notifications
      const userNotifications = generateNotifications(profile.role, profile);
      setNotifications(userNotifications);
      
      return { 
        profile, 
        emailSent: true,
        message: 'Please verify your email to continue. Check your spam folder.'
      };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in with email and password
  const login = async (email, password) => {
    try {
      setError(null);
      setIsLoading(true);

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Check if email is verified
      if (!firebaseUser.emailVerified) {
        // Get user profile for role info
        const profile = await getUserProfile(firebaseUser.uid);
        
        setUser(firebaseUser);
        setUserProfile(profile);
        
        return { 
          profile, 
          emailVerified: false, 
          emailSent: false 
        };
      }

      // Get user profile from Firestore
      const profile = await getUserProfile(firebaseUser.uid);
      
      if (!profile) {
        throw new Error('User profile not found. Please register first.');
      }
      
      setUser(firebaseUser);
      setUserProfile(profile);
      
      // Generate notifications
      const userNotifications = generateNotifications(profile.role, profile);
      setNotifications(userNotifications);
      
      return { profile, emailVerified: true };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      setError(null);
      setIsLoading(true);

      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      // Check if user profile exists
      let profile = await getUserProfile(firebaseUser.uid);
      
      if (!profile) {
        // Create new profile for Google user
        profile = await saveUserProfile(firebaseUser, {
          role: 'freelancer' // Default role for Google sign-in
        });
      }
      
      setUser(firebaseUser);
      setUserProfile(profile);
      
      // Generate notifications
      const userNotifications = generateNotifications(profile.role, profile);
      setNotifications(userNotifications);
      
      return profile;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out
  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
      console.log('User signed out successfully');
      setUser(null);
      setUserProfile(null);
      setNotifications([]);
      setError(null);
    } catch (err) {
      console.error('Logout error:', err);
      setError(err.message);
    }
  };

  // Manual function to clear auth state
  const clearAuthState = () => {
    console.log('Manually clearing auth state');
    setUser(null);
    setUserProfile(null);
    setNotifications([]);
    setError(null);
    setIsLoading(false);
  };

  // Mark notification as read
  const markNotificationRead = (notifId) => {
    setNotifications(prev => 
      prev.map(n => n.id === notifId ? { ...n, read: true } : n)
    );
  };

  // Mark all notifications as read
  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Listen for auth state changes
  useEffect(() => {
    console.log('Firebase Auth: Setting up auth state listener...');
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      console.log('Firebase Auth: State changed, user:', firebaseUser ? firebaseUser.uid : 'null');
      
      if (firebaseUser) {
        try {
          console.log('Firebase Auth: Loading user profile...');
          const profile = await getUserProfile(firebaseUser.uid);
          console.log('Firebase Auth: Profile loaded:', profile);
          
          setUser(firebaseUser);
          setUserProfile(profile);
          
          if (profile) {
            const userNotifications = generateNotifications(profile.role, profile);
            setNotifications(userNotifications);
            console.log('Firebase Auth: Notifications generated');
          } else {
            // Don't set error - profile might be null during signup
            console.log('Firebase Auth: No profile found (user may be signing up)');
          }
        } catch (err) {
          console.error('Firebase Auth: Error loading profile:', err);
          setError('Failed to load user profile');
        }
      } else {
        console.log('Firebase Auth: No user signed in');
        setUser(null);
        setUserProfile(null);
        setNotifications([]);
        setError(null);
      }
      
      console.log('Firebase Auth: Setting isLoading=false, isInitialized=true');
      setIsLoading(false);
      setIsInitialized(true);
    });

    return unsubscribe;
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const value = {
    user,
    userProfile,
    signup,
    login,
    signInWithGoogle,
    logout,
    clearAuthState,
    updateUserProfile,
    isLoading,
    isInitialized,
    error,
    isAuthenticated: !!user,
    isClient: userProfile?.role === 'client',
    isFreelancer: userProfile?.role === 'freelancer',
    notifications,
    unreadCount,
    markNotificationRead,
    markAllNotificationsRead
  };

  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export default FirebaseAuthContext;
