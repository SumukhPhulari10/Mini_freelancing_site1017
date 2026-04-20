import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Dummy notifications generator based on user role
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
        icon: '💼'
      },
      {
        id: 2,
        type: 'message',
        title: 'Message from Sarah Miller',
        message: 'Hi! I wanted to discuss the project requirements in more detail...',
        time: new Date(now - 30 * 60000).toISOString(),
        read: false,
        icon: '💬'
      },
      {
        id: 3,
        type: 'update',
        title: 'Project Milestone Completed',
        message: 'Freelancer David Park marked "Design Phase" as complete on your mobile app project.',
        time: new Date(now - 2 * 3600000).toISOString(),
        read: false,
        icon: '✅'
      },
      {
        id: 4,
        type: 'recommendation',
        title: 'Top Freelancer Available',
        message: 'Emily Chen (React Expert, 4.9★) is now available for new projects!',
        time: new Date(now - 5 * 3600000).toISOString(),
        read: true,
        icon: '⭐'
      },
      {
        id: 5,
        type: 'update',
        title: 'Platform Update',
        message: 'New escrow payment system is now live! Secure your project payments with ease.',
        time: new Date(now - 24 * 3600000).toISOString(),
        read: true,
        icon: '🔔'
      },
      {
        id: 6,
        type: 'message',
        title: 'Message from Mike Thompson',
        message: 'I have completed the initial wireframes. Please review when you get a chance.',
        time: new Date(now - 3 * 3600000).toISOString(),
        read: true,
        icon: '💬'
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
        icon: '🎯'
      },
      {
        id: 2,
        type: 'message',
        title: 'Message from TechCorp Inc.',
        message: 'We reviewed your proposal and would like to schedule an interview...',
        time: new Date(now - 45 * 60000).toISOString(),
        read: false,
        icon: '💬'
      },
      {
        id: 3,
        type: 'bid',
        title: 'Bid Accepted!',
        message: 'Congratulations! Your bid on "Mobile App UI Design" was accepted by InnovateTech.',
        time: new Date(now - 3 * 3600000).toISOString(),
        read: false,
        icon: '🎉'
      },
      {
        id: 4,
        type: 'recommendation',
        title: 'Recommended for You',
        message: `Based on your ${skills[0] || 'development'} skills: "Full-Stack Web App" - Budget: $2000-$5000.`,
        time: new Date(now - 6 * 3600000).toISOString(),
        read: true,
        icon: '💡'
      },
      {
        id: 5,
        type: 'update',
        title: 'Profile Views Up!',
        message: 'Your profile was viewed 12 times this week. Consider updating your portfolio.',
        time: new Date(now - 12 * 3600000).toISOString(),
        read: true,
        icon: '📈'
      },
      {
        id: 6,
        type: 'message',
        title: 'Message from StartupXYZ',
        message: 'Can you provide a timeline estimate for the landing page project?',
        time: new Date(now - 8 * 3600000).toISOString(),
        read: true,
        icon: '💬'
      },
      {
        id: 7,
        type: 'update',
        title: 'New Feature: Skill Badges',
        message: 'Earn verified skill badges to stand out! Complete skill assessments to get started.',
        time: new Date(now - 48 * 3600000).toISOString(),
        read: true,
        icon: '🏆'
      }
    ];
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Signup function - stores user data locally for later login
  const signup = (role, userData) => {
    // Store the signup data in localStorage keyed by email
    const signupData = {
      id: Date.now(),
      role,
      name: userData.name,
      email: userData.email,
      avatar: null,
      // Client specific
      workingProfession: userData.workingProfession || '',
      workType: userData.workType || '',
      location: userData.location || '',
      // Freelancer specific
      skills: userData.skills || [],
      experience: userData.experience || '',
      portfolio: userData.portfolio || '',
      hourlyRate: userData.hourlyRate || '',
      createdAt: new Date().toISOString()
    };

    // Store in a registry of signed-up users
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    existingUsers[userData.email] = signupData;
    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

    return signupData;
  };

  // Login function - looks up stored signup data by email
  const login = (role, userData) => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        // Try to find signup data for this email
        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
        const storedUserData = existingUsers[userData.email];

        let finalUserData;
        if (storedUserData) {
          // User found in local registry - use their actual signup data
          finalUserData = {
            ...storedUserData,
            role: storedUserData.role // Use the role from signup
          };
        } else {
          // No signup data found - use form data directly
          finalUserData = {
            id: Date.now(),
            role,
            name: userData.name || userData.email.split('@')[0],
            email: userData.email,
            avatar: null,
            workingProfession: userData.workingProfession || '',
            workType: userData.workType || '',
            location: userData.location || '',
            skills: userData.skills || [],
            experience: userData.experience || '',
            portfolio: userData.portfolio || '',
            hourlyRate: userData.hourlyRate || '',
          };
        }
        
        setUser(finalUserData);
        setIsLoading(false);
        
        // Generate role-based notifications
        const userNotifications = generateNotifications(finalUserData.role, finalUserData);
        setNotifications(userNotifications);
        
        // Store user data in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(finalUserData));
        localStorage.setItem('notifications', JSON.stringify(userNotifications));
        
        resolve(finalUserData);
      }, 1500);
    });
  };

  const logout = () => {
    setUser(null);
    setNotifications([]);
    localStorage.removeItem('user');
    localStorage.removeItem('notifications');
    window.location.href = '/login';
  };

  const markNotificationRead = (notifId) => {
    setNotifications(prev => {
      const updated = prev.map(n => n.id === notifId ? { ...n, read: true } : n);
      localStorage.setItem('notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }));
      localStorage.setItem('notifications', JSON.stringify(updated));
      return updated;
    });
  };

  // Check for existing user session on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedNotifications = localStorage.getItem('notifications');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        
        if (storedNotifications) {
          setNotifications(JSON.parse(storedNotifications));
        } else {
          // Generate fresh notifications if none stored
          const userNotifications = generateNotifications(parsedUser.role, parsedUser);
          setNotifications(userNotifications);
          localStorage.setItem('notifications', JSON.stringify(userNotifications));
        }
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('notifications');
      }
    }
    setIsInitialized(true);
  }, []);

  // Update user profile data (used by Settings page)
  const updateUser = (updatedFields) => {
    const updatedUser = { ...user, ...updatedFields };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));

    // Also update in registered users registry
    if (updatedUser.email) {
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
      existingUsers[updatedUser.email] = updatedUser;
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const value = {
    user,
    login,
    signup,
    logout,
    updateUser,
    isLoading,
    isInitialized,
    isAuthenticated: !!user,
    isClient: user?.role === 'client',
    isFreelancer: user?.role === 'freelancer',
    notifications,
    unreadCount,
    markNotificationRead,
    markAllNotificationsRead
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
