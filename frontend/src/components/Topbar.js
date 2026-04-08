import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Search, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Topbar = () => {
  const { user } = useAuth();

  return (
    <motion.div
      className="bg-dark-secondary border-b border-gray-800"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Search Bar */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-dark-secondary border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500/50 focus:border-transparent text-text-primary placeholder-text-secondary"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4 ml-6">
            {/* Notifications */}
            <motion.button
              className="relative p-2 text-text-secondary hover:bg-dark-tertiary rounded-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </motion.button>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <motion.div
                className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <User className="w-4 h-4 text-white" />
              </motion.div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-text-primary">{user?.name}</p>
                <p className="text-xs text-text-secondary capitalize">{user?.role}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-text-secondary" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Topbar;
