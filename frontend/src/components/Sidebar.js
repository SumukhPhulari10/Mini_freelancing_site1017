import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Briefcase, 
  Users, 
  MessageSquare, 
  Settings, 
  FileText,
  DollarSign,
  TrendingUp,
  User,
  LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = ({ role }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const clientNavItems = [
    { name: 'Dashboard', href: '/client/dashboard', icon: Home },
    { name: 'Post a Job', href: '/client/post-job', icon: Briefcase },
    { name: 'My Jobs', href: '/client/jobs', icon: FileText },
    { name: 'Bids', href: '/client/bids', icon: Users },
    { name: 'Messages', href: '/client/messages', icon: MessageSquare },
    { name: 'Settings', href: '/client/settings', icon: Settings },
  ];

  const freelancerNavItems = [
    { name: 'Dashboard', href: '/freelancer/dashboard', icon: Home },
    { name: 'Browse Jobs', href: '/freelancer/jobs', icon: Briefcase },
    { name: 'My Bids', href: '/freelancer/bids', icon: FileText },
    { name: 'Earnings', href: '/freelancer/earnings', icon: DollarSign },
    { name: 'Profile', href: '/freelancer/profile', icon: User },
    { name: 'Messages', href: '/freelancer/messages', icon: MessageSquare },
    { name: 'Settings', href: '/freelancer/settings', icon: Settings },
  ];

  const navItems = role === 'client' ? clientNavItems : freelancerNavItems;

  return (
    <motion.div
      className="w-64 bg-white shadow-lg h-screen sticky top-0"
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-primary-600">
            Mini<span className="text-primary-800">Freelance</span>
          </h1>
          <p className="text-sm text-gray-600 capitalize">{role} Dashboard</p>
        </div>

        {/* User Info */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-600 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="w-5 h-5" />
              </motion.div>
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <motion.button
            onClick={logout}
            className="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
