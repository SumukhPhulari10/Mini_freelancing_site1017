import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, DollarSign, FileText, TrendingUp } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import Button from '../components/Button';

const ClientDashboard = () => {
  const [loading, setLoading] = useState(false);

  const stats = [
    {
      title: 'Total Jobs Posted',
      value: '24',
      change: '+12%',
      changeType: 'increase',
      icon: Briefcase,
      color: 'primary'
    },
    {
      title: 'Active Jobs',
      value: '8',
      change: '+3',
      changeType: 'increase',
      icon: FileText,
      color: 'green'
    },
    {
      title: 'Bids Received',
      value: '156',
      change: '+28%',
      changeType: 'increase',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Hired Freelancers',
      value: '19',
      change: '+5',
      changeType: 'increase',
      icon: DollarSign,
      color: 'purple'
    }
  ];

  const recentJobs = [
    {
      id: 1,
      title: 'Full Stack Web Developer',
      status: 'active',
      bids: 12,
      budget: '$5,000',
      posted: '2 days ago'
    },
    {
      id: 2,
      title: 'Mobile App UI Design',
      status: 'reviewing',
      bids: 8,
      budget: '$3,500',
      posted: '5 days ago'
    },
    {
      id: 3,
      title: 'Content Writing Project',
      status: 'completed',
      bids: 15,
      budget: '$1,500',
      posted: '1 week ago'
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      reviewing: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-gray-100 text-gray-800'
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
            <h1 className="text-2xl font-bold text-gray-900">Client Dashboard</h1>
            <p className="text-gray-600">Manage your jobs and track progress</p>
          </div>
          <Button>Post New Job</Button>
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

      {/* Recent Jobs */}
      <motion.div
        className="bg-white rounded-xl shadow-sm p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Jobs</h2>
          <Button variant="secondary">View All</Button>
        </div>

        <div className="space-y-4">
          {recentJobs.map((job, index) => (
            <motion.div
              key={job.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{job.title}</h3>
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                  <span>{job.budget}</span>
                  <span>{job.bids} bids</span>
                  <span>{job.posted}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
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
          <h3 className="font-semibold text-gray-900 mb-2">Post a Job</h3>
          <p className="text-sm text-gray-600">Create a new job posting</p>
        </motion.div>

        <motion.div
          className="bg-blue-50 rounded-xl p-6 text-center hover:bg-blue-100 transition-colors cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">Find Freelancers</h3>
          <p className="text-sm text-gray-600">Browse talented professionals</p>
        </motion.div>

        <motion.div
          className="bg-green-50 rounded-xl p-6 text-center hover:bg-green-100 transition-colors cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">Analytics</h3>
          <p className="text-sm text-gray-600">View your performance metrics</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ClientDashboard;
