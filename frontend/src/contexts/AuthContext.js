import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock login function
  const login = (role, userData) => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const userDataWithDefaults = {
          id: role === 'client' ? 1 : 2,
          role,
          name: userData.name || (role === 'client' ? 'John Client' : 'Sarah Freelancer'),
          email: userData.email || (role === 'client' ? 'client@example.com' : 'freelancer@example.com'),
          avatar: null,
          ...userData
        };
        
        setUser(userDataWithDefaults);
        setIsLoading(false);
        
        // Store user data in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(userDataWithDefaults));
        
        resolve(userDataWithDefaults);
      }, 1500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  // Check for existing user session on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const value = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user,
    isClient: user?.role === 'client',
    isFreelancer: user?.role === 'freelancer'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
