import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, DollarSign, TrendingUp, Eye, FileText, Users } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import Button from '../components/Button';

const FreelancerDashboard = () => {
  const [loading, setLoading] = useState(false);

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

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Freelancer Dashboard</h1>
            <p className="text-gray-600">Track your bids and manage your freelance career</p>
          </div>
          <Button>Browse Jobs</Button>
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
        className="bg-white rounded-xl shadow-sm p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Bids</h2>
          <Button variant="secondary">View All</Button>
        </div>

        <div className="space-y-4">
          {recentBids.map((bid, index) => (
            <motion.div
              key={bid.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{bid.jobTitle}</h3>
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                  <span>{bid.bidAmount}</span>
                  <span>{bid.submitted}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(bid.status)}`}>
                  {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                </span>
                <Button variant="secondary" size="sm">View Details</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <motion.div
          className="bg-primary-50 rounded-xl p-6 text-center hover:bg-primary-100 transition-colors cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Briefcase className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">Browse Jobs</h3>
          <p className="text-sm text-gray-600">Find new opportunities</p>
        </motion.div>

        <motion.div
          className="bg-blue-50 rounded-xl p-6 text-center hover:bg-blue-100 transition-colors cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">My Bids</h3>
          <p className="text-sm text-gray-600">Track your proposals</p>
        </motion.div>

        <motion.div
          className="bg-green-50 rounded-xl p-6 text-center hover:bg-green-100 transition-colors cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">Profile</h3>
          <p className="text-sm text-gray-600">Update your information</p>
        </motion.div>
      </motion.div>

      {/* Earnings Chart Placeholder */}
      <motion.div
        className="bg-white rounded-xl shadow-sm p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Earnings Overview</h2>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <TrendingUp className="w-12 h-12 mx-auto mb-2" />
            <p>Earnings chart would be displayed here</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FreelancerDashboard;
