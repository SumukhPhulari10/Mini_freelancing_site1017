import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, FileText, DollarSign, Clock, CheckCircle, XCircle, Hourglass } from 'lucide-react';
import Button from '../components/Button';
import { JobCardSkeleton } from '../components/LoadingSkeleton';

const FreelancerBids = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const mockBids = [
    {
      id: 1,
      jobTitle: 'Full Stack Web Developer Needed',
      companyName: 'TechStart Inc.',
      bidAmount: 4800,
      deliveryTime: '3 weeks',
      status: 'pending',
      submittedAt: '2024-01-16T10:30:00Z',
      coverLetter: 'I have 5+ years of experience in full stack development with React and Node.js. I\'ve built several e-commerce platforms and can deliver this project within 3 weeks with high quality code and proper documentation.',
      skills: ['React', 'Node.js', 'MongoDB', 'TypeScript']
    },
    {
      id: 2,
      jobTitle: 'Mobile App UI/UX Designer',
      companyName: 'FitLife Studios',
      bidAmount: 3200,
      deliveryTime: '2 weeks',
      status: 'accepted',
      submittedAt: '2024-01-15T09:15:00Z',
      coverLetter: 'Creative UI/UX designer specializing in mobile apps. I\'ll create intuitive and beautiful designs for your fitness app, focusing on user experience and modern design principles.',
      skills: ['Figma', 'Mobile Design', 'Prototyping', 'User Research']
    },
    {
      id: 3,
      jobTitle: 'Content Writing Project',
      companyName: 'TechMedia Group',
      bidAmount: 1500,
      deliveryTime: '1 month',
      status: 'rejected',
      submittedAt: '2024-01-14T16:45:00Z',
      coverLetter: 'Experienced tech writer with expertise in creating engaging content about emerging technologies.',
      skills: ['Technical Writing', 'SEO', 'Research', 'Blog Writing']
    },
    {
      id: 4,
      jobTitle: 'React Native Mobile App',
      companyName: 'QuickEats',
      bidAmount: 7500,
      deliveryTime: '4 months',
      status: 'pending',
      submittedAt: '2024-01-13T11:20:00Z',
      coverLetter: 'React Native developer with 3+ years of experience building cross-platform mobile applications. I\'ve worked on similar food delivery apps and can deliver a high-quality solution.',
      skills: ['React Native', 'Firebase', 'Redux', 'API Integration']
    },
    {
      id: 5,
      jobTitle: 'Digital Marketing Specialist',
      companyName: 'GrowthHackers',
      bidAmount: 2200,
      deliveryTime: '6 weeks',
      status: 'accepted',
      submittedAt: '2024-01-12T14:30:00Z',
      coverLetter: 'Digital marketing expert with proven track record in social media campaigns and analytics.',
      skills: ['Social Media', 'Google Analytics', 'SEO', 'Content Marketing']
    }
  ];

  React.useEffect(() => {
    setTimeout(() => {
      setBids(mockBids);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredBids = bids.filter(bid => {
    const matchesSearch = bid.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bid.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bid.coverLetter.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || bid.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <Hourglass className="w-4 h-4" />,
      accepted: <CheckCircle className="w-4 h-4" />,
      rejected: <XCircle className="w-4 h-4" />
    };
    return icons[status] || <FileText className="w-4 h-4" />;
  };

  const getStatusText = (status) => {
    const texts = {
      pending: 'Pending Review',
      accepted: 'Bid Accepted',
      rejected: 'Bid Rejected'
    };
    return texts[status] || status;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">My Bids</h1>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
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
          <h1 className="text-2xl font-bold text-gray-900">My Bids</h1>
          <p className="text-gray-600">Track all your bid proposals and their status</p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Bids</p>
              <p className="text-2xl font-bold text-gray-900">{bids.length}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Accepted Bids</p>
              <p className="text-2xl font-bold text-green-600">
                {bids.filter(bid => bid.status === 'accepted').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Bids</p>
              <p className="text-2xl font-bold text-yellow-600">
                {bids.filter(bid => bid.status === 'pending').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Hourglass className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search bids by job title or company..."
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
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Bids List */}
      <div className="space-y-4">
        {filteredBids.map((bid, index) => (
          <motion.div
            key={bid.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{bid.jobTitle}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(bid.status)}`}>
                      {getStatusIcon(bid.status)}
                      {getStatusText(bid.status)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{bid.companyName}</p>
                </div>

                {/* Bid Amount */}
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary-600">${bid.bidAmount.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {bid.deliveryTime}
                  </div>
                </div>
              </div>

              {/* Cover Letter */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Your Cover Letter</h4>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{bid.coverLetter}</p>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Job Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {bid.skills.map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  Submitted {new Date(bid.submittedAt).toLocaleDateString()} at {new Date(bid.submittedAt).toLocaleTimeString()}
                </div>
                
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm">
                    View Job
                  </Button>
                  {bid.status === 'accepted' && (
                    <Button size="sm">
                      Start Project
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredBids.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-gray-400 mb-4">
            <FileText className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bids found</h3>
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

export default FreelancerBids;
