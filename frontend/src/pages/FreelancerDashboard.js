import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, DollarSign, TrendingUp, Eye, FileText, Users, Star, Zap } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const FreelancerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Active Bids',
      value: '12',
      change: '+3',
      changeType: 'increase',
      icon: FileText,
      color: 'primary'
    },
    {
      title: 'Jobs Won',
      value: '28',
      change: '+5',
      changeType: 'increase',
      icon: Briefcase,
      color: 'green'
    },
    {
      title: 'Total Earnings',
      value: '$45,280',
      change: '+18%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'blue'
    },
    {
      title: 'Profile Views',
      value: '1,247',
      change: '+32%',
      changeType: 'increase',
      icon: Eye,
      color: 'purple'
    }
  ];

  const recentBids = [
    {
      id: 1,
      jobTitle: 'Full Stack Web Developer',
      bidAmount: '$4,800',
      status: 'pending',
      submitted: '2 days ago'
    },
    {
      id: 2,
      jobTitle: 'Mobile App UI Design',
      bidAmount: '$3,200',
      status: 'accepted',
      submitted: '5 days ago'
    },
    {
      id: 3,
      jobTitle: 'Content Writing Project',
      bidAmount: '$1,500',
      status: 'rejected',
      submitted: '1 week ago'
    }
  ];

  const getStatusStyle = (status) => {
    const styles = {
      pending: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30',
      accepted: 'bg-green-500/15 text-green-400 border border-green-500/30',
      rejected: 'bg-red-500/15 text-red-400 border border-red-500/30'
    };
    return styles[status] || 'bg-gray-700/50 text-gray-400 border border-gray-600/30';
  };

  // Get first name for greeting
  const firstName = user?.name ? user.name.split(' ')[0] : 'Freelancer';

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-primary-600/20 via-dark-secondary to-accent/10 rounded-2xl border border-gray-700/60 p-6 shadow-card"
      >
        {/* Background decorative orbs */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-16 w-32 h-32 bg-accent/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex justify-between items-center">
          <div>
            <p className="text-sm text-text-muted font-medium uppercase tracking-wider mb-1">Welcome back 👋</p>
            <h1 className="text-3xl font-bold text-text-primary">
              Hello, <span className="gradient-text">{firstName}</span>!
            </h1>
            <p className="text-text-secondary mt-1">
              Track your bids and manage your freelance career
              {user?.skills && user.skills.length > 0 && (
                <span className="ml-2 text-primary-400 text-sm">
                  · {user.skills.slice(0, 2).join(', ')} {user.skills.length > 2 ? `+${user.skills.length - 2} more` : ''}
                </span>
              )}
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => navigate('/freelancer/jobs')}>
              <Zap className="w-4 h-4 mr-2 inline" />
              Browse Jobs
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <DashboardCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Recent Bids */}
      <motion.div
        className="bg-dark-secondary rounded-2xl border border-gray-800 shadow-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Recent Bids</h2>
            <p className="text-sm text-text-muted mt-0.5">Your latest submitted proposals</p>
          </div>
          <Button variant="secondary" onClick={() => navigate('/freelancer/bids')}>View All</Button>
        </div>

        <div className="space-y-3">
          {recentBids.map((bid, index) => (
            <motion.div
              key={bid.id}
              className="flex items-center justify-between p-4 border border-gray-700/50 rounded-xl hover:border-primary-500/30 hover:bg-primary-500/5 transition-all duration-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              whileHover={{ x: 4 }}
            >
              <div className="flex-1">
                <h3 className="font-medium text-text-primary">{bid.jobTitle}</h3>
                <div className="flex items-center space-x-4 mt-1 text-sm text-text-secondary">
                  <span className="text-primary-400 font-semibold">{bid.bidAmount}</span>
                  <span className="text-text-muted">{bid.submitted}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(bid.status)}`}>
                  {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                </span>
                <Button variant="secondary" size="sm">View</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <motion.div
          className="bg-dark-secondary rounded-2xl border border-gray-800 p-6 text-center hover:border-primary-500/40 hover:bg-primary-500/5 transition-all duration-200 cursor-pointer group"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/freelancer/jobs')}
        >
          <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-500/30 transition-colors">
            <Briefcase className="w-6 h-6 text-primary-400" />
          </div>
          <h3 className="font-semibold text-text-primary mb-1">Browse Jobs</h3>
          <p className="text-sm text-text-muted">Find new opportunities</p>
        </motion.div>

        <motion.div
          className="bg-dark-secondary rounded-2xl border border-gray-800 p-6 text-center hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-200 cursor-pointer group"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/freelancer/bids')}
        >
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30 transition-colors">
            <FileText className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="font-semibold text-text-primary mb-1">My Bids</h3>
          <p className="text-sm text-text-muted">Track your proposals</p>
        </motion.div>

        <motion.div
          className="bg-dark-secondary rounded-2xl border border-gray-800 p-6 text-center hover:border-purple-500/40 hover:bg-purple-500/5 transition-all duration-200 cursor-pointer group"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/freelancer/profile')}
        >
          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/30 transition-colors">
            <Users className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="font-semibold text-text-primary mb-1">My Profile</h3>
          <p className="text-sm text-text-muted">Update your information</p>
        </motion.div>
      </motion.div>

      {/* Earnings Overview Placeholder */}
      <motion.div
        className="bg-dark-secondary rounded-2xl border border-gray-800 shadow-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Earnings Overview</h2>
            <p className="text-sm text-text-muted mt-0.5">Your income this year</p>
          </div>
          <span className="px-3 py-1 bg-green-500/15 text-green-400 text-xs font-medium rounded-full border border-green-500/30">
            +18% this month
          </span>
        </div>
        <div className="h-48 bg-dark-primary/50 rounded-xl flex items-center justify-center border border-gray-700/30">
          <div className="text-center text-text-muted">
            <TrendingUp className="w-10 h-10 mx-auto mb-2 text-primary-400/50" />
            <p className="text-sm">Earnings chart will be displayed here</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FreelancerDashboard;
