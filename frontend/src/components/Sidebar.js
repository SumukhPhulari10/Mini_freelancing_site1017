import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  FileText, 
  DollarSign, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut,
  User,
  BarChart3,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = ({ role }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  const clientNavItems = [
    { icon: Home, label: 'Dashboard', href: '/client/dashboard' },
    { icon: Briefcase, label: 'My Jobs', href: '/client/jobs' },
    { icon: FileText, label: 'Post Job', href: '/client/post-job' },
    { icon: DollarSign, label: 'Bids', href: '/client/bids' },
    { icon: MessageSquare, label: 'Messages', href: '/client/messages' },
    { icon: Settings, label: 'Settings', href: '/client/settings' },
  ];

  const freelancerNavItems = [
    { icon: Home, label: 'Dashboard', href: '/freelancer/dashboard' },
    { icon: Briefcase, label: 'Browse Jobs', href: '/freelancer/jobs' },
    { icon: FileText, label: 'My Bids', href: '/freelancer/bids' },
    { icon: DollarSign, label: 'Earnings', href: '/freelancer/earnings' },
    { icon: User, label: 'Profile', href: '/freelancer/profile' },
    { icon: MessageSquare, label: 'Messages', href: '/freelancer/messages' },
    { icon: Settings, label: 'Settings', href: '/freelancer/settings' },
  ];

  const navItems = role === 'client' ? clientNavItems : freelancerNavItems;

  return (
    <motion.div
      className="w-64 bg-dark-secondary border-r border-gray-800 h-screen sticky top-0"
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold gradient-text">
            MiniFreelance
          </h1>
          <p className="text-sm text-gray-600 capitalize">{role} Dashboard</p>
        </div>

        {/* User Info */}
        <div className="mb-8 p-4 bg-dark-tertiary rounded-2xl border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center shadow-glow">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-text-primary">{user?.name || 'John Doe'}</p>
              <p className="text-sm text-text-secondary capitalize">{role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => (
            <motion.button
              key={item.label}
              onClick={() => navigate(item.href)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                location.pathname === item.href
                  ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30 shadow-glow'
                  : 'text-text-secondary hover:bg-dark-tertiary hover:text-text-primary'
              }`}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
              {location.pathname === item.href && (
                <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
              )}
            </motion.button>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-6 left-6 right-6">
          <motion.button
            onClick={logout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 border border-red-500/20 transition-all duration-200"
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
