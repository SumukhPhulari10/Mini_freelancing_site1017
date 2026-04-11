import React, { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { Menu, X, User, Briefcase, Home, PlusCircle, LogOut } from 'lucide-react';

import Button from './Button';

import { useFirebaseAuth } from '../firebase/FirebaseAuthContext';

import { useNavigate } from 'react-router-dom';



const Navbar = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const { user, logout, isAuthenticated } = useFirebaseAuth();

  // Force logout on main dashboard to clear any existing session
  useEffect(() => {
    if (window.location.pathname === '/' && isAuthenticated) {
      logout();
    }
  }, [isAuthenticated, logout]);



  const navItems = [

    { name: 'Home', icon: Home, href: '#home' },

    { name: 'Browse Jobs', icon: Briefcase, href: '#jobs' },

    { name: 'Post Job', icon: PlusCircle, href: '#post-job' },

    { name: 'Dashboard', icon: User, href: isAuthenticated ? (user?.role === 'client' ? '/client/dashboard' : '/freelancer/dashboard') : '#' },

  ];



  const handleNavClick = (href) => {

    if (href.startsWith('#')) {

      const element = document.querySelector(href);

      if (element) {

        element.scrollIntoView({ behavior: 'smooth' });

      }

    } else {

      navigate(href);

    }

    setIsMobileMenuOpen(false);

  };



  const handleLogin = () => {

    navigate('/login');

  };



  const handleLogout = () => {

    logout();

  };



  return (

    <motion.nav 

      className="sticky top-0 z-50 glass-card border-b border-gray-800/50 backdrop-blur-xl"

      initial={{ y: -100 }}

      animate={{ y: 0 }}

      transition={{ duration: 0.5 }}

    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}

          <motion.div 

            className="flex items-center"

            whileHover={{ scale: 1.05 }}

          >

            <span className="text-2xl font-bold gradient-text">

              MiniFreelance

            </span>

          </motion.div>



          {/* Desktop Navigation */}

          <div className="hidden md:flex items-center">

            <div className="bg-dark-secondary/50 backdrop-blur-sm rounded-full px-6 py-2 flex items-center space-x-6 border border-gray-700/50">

              {navItems.map((item) => (

                <motion.button

                  key={item.name}

                  onClick={() => handleNavClick(item.href)}

                  className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-all duration-200 px-3 py-1 rounded-full hover:bg-primary-500/10"

                  whileHover={{ scale: 1.05 }}

                  whileTap={{ scale: 0.95 }}

                >

                  <item.icon className="w-4 h-4" />

                  <span className="text-sm font-medium">{item.name}</span>

                </motion.button>

              ))}

            </div>

          </div>



          {/* Desktop Auth Buttons */}

          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-2 bg-dark-secondary/50 rounded-full border border-gray-700/50">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-text-primary font-medium">{user?.name}</span>
                </div>
                <Button variant="secondary" onClick={handleLogout} className="flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button variant="secondary" onClick={handleLogin}>Login</Button>
                <Button onClick={handleLogin}>Start Now</Button>
              </>
            )}
          </div>



          {/* Mobile Menu Button */}

          <motion.button

            className="md:hidden p-2 rounded-lg bg-dark-secondary/50 border border-gray-700/50"

            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}

            whileTap={{ scale: 0.95 }}

          >

            {isMobileMenuOpen ? (

              <X className="w-6 h-6 text-text-primary" />

            ) : (

              <Menu className="w-6 h-6 text-text-primary" />

            )}

          </motion.button>

        </div>



        {/* Mobile Menu */}

        <AnimatePresence>

          {isMobileMenuOpen && (

            <motion.div

              className="md:hidden py-4 border-t border-gray-800/50"

              initial={{ opacity: 0, height: 0 }}

              animate={{ opacity: 1, height: 'auto' }}

              exit={{ opacity: 0, height: 0 }}

              transition={{ duration: 0.3 }}

            >

              <div className="flex flex-col space-y-4">

                {navItems.map((item) => (

                  <motion.button

                    key={item.name}

                    onClick={() => handleNavClick(item.href)}

                    className="flex items-center space-x-3 text-text-secondary hover:text-text-primary transition-colors duration-200 px-4 py-3 rounded-xl hover:bg-dark-secondary/50"

                    whileHover={{ scale: 1.02, x: 5 }}

                    whileTap={{ scale: 0.98 }}

                  >

                    <item.icon className="w-5 h-5" />

                    <span className="font-medium">{item.name}</span>

                  </motion.button>

                ))}

                <div className="flex flex-col space-y-3 pt-4 border-t border-gray-800/50">
                  {isAuthenticated && user ? (
                    <>
                      <div className="flex items-center space-x-3 px-4 py-3 bg-dark-secondary/50 rounded-xl">
                        <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-text-primary font-medium">{user?.name}</p>
                          <p className="text-text-secondary text-sm">{user?.role}</p>
                        </div>
                      </div>
                      <Button variant="secondary" className="w-full" onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="secondary" className="w-full" onClick={handleLogin}>Login</Button>
                      <Button className="w-full" onClick={handleLogin}>Start Now</Button>
                    </>
                  )}
                </div>

              </div>

            </motion.div>

          )}

        </AnimatePresence>

      </div>

    </motion.nav>

  );

};



export default Navbar;