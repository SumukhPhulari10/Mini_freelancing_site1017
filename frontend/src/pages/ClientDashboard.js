import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, DollarSign, FileText, TrendingUp, Plus, Building2 } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ClientDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const getStatusStyle = (status) => {
    const styles = {
      active: 'bg-green-500/15 text-green-400 border border-green-500/30',
      reviewing: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30',
      completed: 'bg-gray-600/30 text-gray-400 border border-gray-600/40'
    };
    return styles[status] || 'bg-gray-700/50 text-gray-400 border border-gray-600/30';
  };

  // Get first name for greeting
  const firstName = user?.name ? user.name.split(' ')[0] : 'Client';
  const companyName = user?.companyName;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-blue-600/20 via-dark-secondary to-primary-600/10 rounded-2xl border border-gray-700/60 p-6 shadow-card"
      >
        {/* Background decorative orbs */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-16 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex justify-between items-center">
          <div>
            <p className="text-sm text-text-muted font-medium uppercase tracking-wider mb-1">Welcome back 👋</p>
            <h1 className="text-3xl font-bold text-text-primary">
              Hello, <span className="gradient-text">{firstName}</span>!
            </h1>
            <p className="text-text-secondary mt-1">
              {companyName
                ? <>Managing jobs for <span className="text-blue-400 font-medium">{companyName}</span></>
                : 'Manage your jobs and track progress'}
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => navigate('/client/jobs')}>
              <Plus className="w-4 h-4 mr-2 inline" />
              Post New Job
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

      {/* Recent Jobs */}
      <motion.div
        className="bg-dark-secondary rounded-2xl border border-gray-800 shadow-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Recent Jobs</h2>
            <p className="text-sm text-text-muted mt-0.5">Your latest job postings</p>
          </div>
          <Button variant="secondary" onClick={() => navigate('/client/jobs')}>View All</Button>
        </div>

        <div className="space-y-3">
          {recentJobs.map((job, index) => (
            <motion.div
              key={job.id}
              className="flex items-center justify-between p-4 border border-gray-700/50 rounded-xl hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              whileHover={{ x: 4 }}
            >
              <div className="flex-1">
                <h3 className="font-medium text-text-primary">{job.title}</h3>
                <div className="flex items-center space-x-4 mt-1 text-sm">
                  <span className="text-blue-400 font-semibold">{job.budget}</span>
                  <span className="text-text-muted">{job.bids} bids</span>
                  <span className="text-text-muted">{job.posted}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(job.status)}`}>
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
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
          onClick={() => navigate('/client/jobs')}
        >
          <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-500/30 transition-colors">
            <Briefcase className="w-6 h-6 text-primary-400" />
          </div>
          <h3 className="font-semibold text-text-primary mb-1">Post a Job</h3>
          <p className="text-sm text-text-muted">Create a new job posting</p>
        </motion.div>

        <motion.div
          className="bg-dark-secondary rounded-2xl border border-gray-800 p-6 text-center hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-200 cursor-pointer group"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30 transition-colors">
            <Users className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="font-semibold text-text-primary mb-1">Find Freelancers</h3>
          <p className="text-sm text-text-muted">Browse talented professionals</p>
        </motion.div>

        <motion.div
          className="bg-dark-secondary rounded-2xl border border-gray-800 p-6 text-center hover:border-green-500/40 hover:bg-green-500/5 transition-all duration-200 cursor-pointer group"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/30 transition-colors">
            <TrendingUp className="w-6 h-6 text-green-400" />
          </div>
          <h3 className="font-semibold text-text-primary mb-1">Analytics</h3>
          <p className="text-sm text-text-muted">View performance metrics</p>
        </motion.div>
      </motion.div>

      {/* Activity placeholder */}
      <motion.div
        className="bg-dark-secondary rounded-2xl border border-gray-800 shadow-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Hiring Activity</h2>
            <p className="text-sm text-text-muted mt-0.5">Your hiring trends this year</p>
          </div>
          <span className="px-3 py-1 bg-blue-500/15 text-blue-400 text-xs font-medium rounded-full border border-blue-500/30">
            +28% bids received
          </span>
        </div>
        <div className="h-48 bg-dark-primary/50 rounded-xl flex items-center justify-center border border-gray-700/30">
          <div className="text-center text-text-muted">
            <TrendingUp className="w-10 h-10 mx-auto mb-2 text-blue-400/50" />
            <p className="text-sm">Activity chart will be displayed here</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ClientDashboard;
