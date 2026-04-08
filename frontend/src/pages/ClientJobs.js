import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, Eye, MessageSquare, DollarSign, Briefcase } from 'lucide-react';
import Button from '../components/Button';
import { JobCardSkeleton } from '../components/LoadingSkeleton';

const ClientJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const mockJobs = [
    {
      id: 1,
      title: 'Full Stack Web Developer Needed',
      description: 'Looking for an experienced full stack developer to build a modern e-commerce platform using React and Node.js.',
      budget: 5000,
      status: 'active',
      bids: 12,
      postedDate: '2024-01-15',
      deadline: '2024-03-15',
      skills: ['React', 'Node.js', 'MongoDB', 'TypeScript']
    },
    {
      id: 2,
      title: 'Mobile App UI/UX Designer',
      description: 'We need a talented UI/UX designer to create beautiful and intuitive designs for our fitness tracking mobile app.',
      budget: 3500,
      status: 'reviewing',
      bids: 8,
      postedDate: '2024-01-12',
      deadline: '2024-02-28',
      skills: ['Figma', 'Mobile Design', 'Prototyping', 'User Research']
    },
    {
      id: 3,
      title: 'Content Writer for Tech Blog',
      description: 'Seeking an experienced tech writer to create engaging blog posts about emerging technologies.',
      budget: 1500,
      status: 'completed',
      bids: 15,
      postedDate: '2024-01-10',
      deadline: '2024-02-10',
      skills: ['Technical Writing', 'SEO', 'Research', 'Blog Writing']
    },
    {
      id: 4,
      title: 'React Native Mobile App',
      description: 'Need a React Native developer to build a cross-platform mobile app for food delivery.',
      budget: 8000,
      status: 'active',
      bids: 20,
      postedDate: '2024-01-08',
      deadline: '2024-04-15',
      skills: ['React Native', 'Firebase', 'Redux', 'API Integration']
    },
    {
      id: 5,
      title: 'Digital Marketing Specialist',
      description: 'Looking for a digital marketing expert to manage our social media campaigns and improve our online presence.',
      budget: 2500,
      status: 'draft',
      bids: 0,
      postedDate: '2024-01-05',
      deadline: '2024-03-01',
      skills: ['Social Media', 'Google Analytics', 'SEO', 'Content Marketing']
    }
  ];

  React.useEffect(() => {
    setTimeout(() => {
      setJobs(mockJobs);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      reviewing: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-gray-100 text-gray-800',
      draft: 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    const icons = {
      active: <div className="w-2 h-2 bg-green-500 rounded-full"></div>,
      reviewing: <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>,
      completed: <div className="w-2 h-2 bg-gray-500 rounded-full"></div>,
      draft: <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
    };
    return icons[status] || <div className="w-2 h-2 bg-gray-500 rounded-full"></div>;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">My Jobs</h1>
          <Button disabled>Loading...</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <JobCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Jobs</h1>
          <p className="text-gray-600">Manage and track all your job postings</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Post New Job
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="reviewing">Reviewing</option>
              <option value="completed">Completed</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {getStatusIcon(job.status)}
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </span>
                </div>
                <div className="text-2xl font-bold text-primary-600">
                  ${job.budget.toLocaleString()}
                </div>
              </div>

              {/* Job Info */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1 mb-4">
                {job.skills.slice(0, 3).map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                    {skill}
                  </span>
                ))}
                {job.skills.length > 3 && (
                  <span className="text-xs text-gray-500">+{job.skills.length - 3} more</span>
                )}
              </div>

              {/* Meta Info */}
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>{job.bids} bids</span>
                  <span>Deadline: {job.deadline}</span>
                </div>
                <div className="text-xs text-gray-500">
                  Posted: {job.postedDate}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                {job.status === 'active' && (
                  <Button size="sm" className="flex-1">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Bids ({job.bids})
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredJobs.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-gray-400 mb-4">
            <Briefcase className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
          <Button onClick={() => {
            setSearchTerm('');
            setStatusFilter('all');
          }}>
            Clear Filters
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default ClientJobs;
