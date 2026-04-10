import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Eye, MessageSquare, Briefcase } from 'lucide-react';
import Button from '../components/Button';
import { JobCardSkeleton } from '../components/LoadingSkeleton';
import { useNavigate } from 'react-router-dom';

const ClientJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  const mockJobs = [
    { id: 1, title: 'Full Stack Web Developer Needed', description: 'Looking for an experienced full stack developer to build a modern e-commerce platform using React and Node.js.', budget: 5000, status: 'active', bids: 12, postedDate: '2024-01-15', deadline: '2024-03-15', skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'] },
    { id: 2, title: 'Mobile App UI/UX Designer', description: 'We need a talented UI/UX designer to create beautiful and intuitive designs for our fitness tracking mobile app.', budget: 3500, status: 'reviewing', bids: 8, postedDate: '2024-01-12', deadline: '2024-02-28', skills: ['Figma', 'Mobile Design', 'Prototyping', 'User Research'] },
    { id: 3, title: 'Content Writer for Tech Blog', description: 'Seeking an experienced tech writer to create engaging blog posts about emerging technologies.', budget: 1500, status: 'completed', bids: 15, postedDate: '2024-01-10', deadline: '2024-02-10', skills: ['Technical Writing', 'SEO', 'Research', 'Blog Writing'] },
    { id: 4, title: 'React Native Mobile App', description: 'Need a React Native developer to build a cross-platform mobile app for food delivery.', budget: 8000, status: 'active', bids: 20, postedDate: '2024-01-08', deadline: '2024-04-15', skills: ['React Native', 'Firebase', 'Redux', 'API Integration'] },
    { id: 5, title: 'Digital Marketing Specialist', description: 'Looking for a digital marketing expert to manage our social media campaigns and improve our online presence.', budget: 2500, status: 'draft', bids: 0, postedDate: '2024-01-05', deadline: '2024-03-01', skills: ['Social Media', 'Google Analytics', 'SEO', 'Content Marketing'] }
  ];

  React.useEffect(() => {
    setTimeout(() => { setJobs(mockJobs); setLoading(false); }, 1000);
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status) => {
    const styles = {
      active:    'bg-green-500/15  text-green-400  border border-green-500/30',
      reviewing: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30',
      completed: 'bg-gray-600/30   text-gray-400   border border-gray-600/40',
      draft:     'bg-blue-500/15   text-blue-400   border border-blue-500/30'
    };
    return styles[status] || 'bg-gray-700/40 text-gray-400 border border-gray-600/30';
  };

  const getStatusDot = (status) => {
    const dots = { active: 'bg-green-400', reviewing: 'bg-yellow-400', completed: 'bg-gray-400', draft: 'bg-blue-400' };
    return dots[status] || 'bg-gray-400';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-text-primary">My Jobs</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">My Jobs</h1>
          <p className="text-text-muted mt-0.5">Manage and track all your job postings</p>
        </div>
        <Button className="flex items-center gap-2" onClick={() => navigate('/client/post-job')}>
          <Plus className="w-4 h-4" />
          Post New Job
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-dark-secondary rounded-2xl border border-gray-800 p-5"
      >
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" />
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full pl-9 pr-4 py-2.5 bg-dark-primary/60 border border-gray-700/60 rounded-xl text-sm text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/40 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2.5 bg-dark-primary/60 border border-gray-700/60 rounded-xl text-sm text-text-primary focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/40 transition-all"
            style={{ colorScheme: 'dark' }}
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
      </motion.div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredJobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.08 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-dark-secondary rounded-2xl border border-gray-800 hover:border-blue-500/30 hover:shadow-card transition-all duration-200 flex flex-col"
          >
            <div className="p-5 flex flex-col h-full">
              {/* Status & Budget */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusDot(job.status)}`} />
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(job.status)}`}>
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </span>
                </div>
                <div className="text-lg font-bold text-blue-400">
                  ${job.budget.toLocaleString()}
                </div>
              </div>

              {/* Title + Description */}
              <h3 className="text-base font-semibold text-text-primary mb-1">{job.title}</h3>
              <p className="text-text-muted text-sm mb-3 line-clamp-2 flex-1">{job.description}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {job.skills.slice(0, 3).map((skill) => (
                  <span key={skill} className="px-2 py-0.5 bg-primary-500/15 text-primary-400 text-xs rounded-full border border-primary-500/25 font-medium">
                    {skill}
                  </span>
                ))}
                {job.skills.length > 3 && (
                  <span className="text-xs text-text-muted">+{job.skills.length - 3} more</span>
                )}
              </div>

              {/* Meta */}
              <div className="flex justify-between text-xs text-text-muted mb-4 border-t border-gray-700/50 pt-3">
                <span>{job.bids} bids</span>
                <span>Deadline: {job.deadline}</span>
              </div>
              <div className="text-xs text-text-muted mb-4">Posted: {job.postedDate}</div>

              {/* Actions */}
              <div className="flex gap-2 mt-auto">
                <Button variant="secondary" size="sm" className="flex-1">
                  <Eye className="w-3.5 h-3.5 mr-1 inline" />
                  View
                </Button>
                {job.status === 'active' && (
                  <Button size="sm" className="flex-1">
                    <MessageSquare className="w-3.5 h-3.5 mr-1 inline" />
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
        <motion.div className="text-center py-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Briefcase className="w-14 h-14 mx-auto text-text-muted mb-3" />
          <h3 className="text-lg font-medium text-text-primary mb-1">No jobs found</h3>
          <p className="text-text-muted mb-5 text-sm">Try adjusting your search or filters</p>
          <Button onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}>Clear Filters</Button>
        </motion.div>
      )}
    </div>
  );
};

export default ClientJobs;
