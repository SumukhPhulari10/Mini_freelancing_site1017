import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, User, Star, MessageSquare, DollarSign, Calendar, Clock } from 'lucide-react';
import Button from '../components/Button';
import { FreelancerCardSkeleton } from '../components/LoadingSkeleton';

const ClientBids = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const mockBids = [
    {
      id: 1,
      jobId: 1,
      jobTitle: 'Full Stack Web Developer Needed',
      freelancerId: 1,
      freelancerName: 'Sarah Johnson',
      freelancerTitle: 'Full Stack Developer',
      avatar: null,
      rating: 4.9,
      completedJobs: 47,
      hourlyRate: 85,
      bidAmount: 4800,
      deliveryTime: '3 weeks',
      coverLetter: 'I have 5+ years of experience in full stack development with React and Node.js. I\'ve built several e-commerce platforms and can deliver this project within 3 weeks with high quality code and proper documentation.',
      skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'GraphQL'],
      status: 'pending',
      submittedAt: '2024-01-16T10:30:00Z'
    },
    {
      id: 2,
      jobId: 1,
      jobTitle: 'Full Stack Web Developer Needed',
      freelancerId: 2,
      freelancerName: 'Michael Chen',
      freelancerTitle: 'Senior Web Developer',
      avatar: null,
      rating: 4.7,
      completedJobs: 32,
      hourlyRate: 75,
      bidAmount: 4500,
      deliveryTime: '4 weeks',
      coverLetter: 'Experienced web developer with expertise in React and Node.js. I\'ve worked on similar e-commerce projects and can provide references. My approach focuses on scalability and performance.',
      skills: ['React', 'Node.js', 'Express', 'MongoDB', 'AWS'],
      status: 'pending',
      submittedAt: '2024-01-16T14:20:00Z'
    },
    {
      id: 3,
      jobId: 2,
      jobTitle: 'Mobile App UI/UX Designer',
      freelancerId: 3,
      freelancerName: 'Emily Rodriguez',
      freelancerTitle: 'UI/UX Designer',
      avatar: null,
      rating: 4.8,
      completedJobs: 28,
      hourlyRate: 65,
      bidAmount: 3200,
      deliveryTime: '2 weeks',
      coverLetter: 'Creative UI/UX designer specializing in mobile apps. I\'ll create intuitive and beautiful designs for your fitness app, focusing on user experience and modern design principles.',
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Mobile Design'],
      status: 'shortlisted',
      submittedAt: '2024-01-15T09:15:00Z'
    },
    {
      id: 4,
      jobId: 2,
      jobTitle: 'Mobile App UI/UX Designer',
      freelancerId: 4,
      freelancerName: 'David Kim',
      freelancerTitle: 'Product Designer',
      avatar: null,
      rating: 4.6,
      completedJobs: 19,
      hourlyRate: 70,
      bidAmount: 3500,
      deliveryTime: '3 weeks',
      coverLetter: 'I\'m a product designer with experience in fitness apps. I understand the user journey and can create designs that not only look great but also drive engagement and retention.',
      skills: ['Figma', 'Sketch', 'User Research', 'Interaction Design', 'Mobile Design'],
      status: 'rejected',
      submittedAt: '2024-01-14T16:45:00Z'
    }
  ];

  React.useEffect(() => {
    setTimeout(() => {
      setBids(mockBids);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredBids = bids.filter(bid => {
    const matchesJob = selectedJob === 'all' || bid.jobId.toString() === selectedJob;
    const matchesSearch = bid.freelancerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bid.coverLetter.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesJob && matchesSearch;
  });

  const jobs = [...new Set(bids.map(bid => ({ id: bid.jobId, title: bid.jobTitle })))];

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      shortlisted: 'bg-blue-100 text-blue-800',
      rejected: 'bg-red-100 text-red-800',
      hired: 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-200 text-yellow-400" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  const handleHire = (bidId) => {
    console.log('Hiring freelancer for bid:', bidId);
    // Handle hire logic
  };

  const handleChat = (freelancerId) => {
    console.log('Starting chat with freelancer:', freelancerId);
    // Handle chat logic
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Bids Management</h1>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <FreelancerCardSkeleton key={index} />
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
          <h1 className="text-2xl font-bold text-gray-900">Bids Management</h1>
          <p className="text-gray-600">Review and manage bids for your jobs</p>
        </div>
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
              placeholder="Search freelancers or bids..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
            >
              <option value="all">All Jobs</option>
              {jobs.map(job => (
                <option key={job.id} value={job.id}>{job.title}</option>
              ))}
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
            transition={{ delay: 0.2 + index * 0.1 }}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start space-x-4">
                  {/* Freelancer Avatar */}
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-primary-600" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{bid.freelancerName}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bid.status)}`}>
                        {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{bid.freelancerTitle}</p>
                    
                    {/* Rating and Jobs */}
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        {renderStars(bid.rating)}
                        <span className="ml-1">{bid.rating}</span>
                      </div>
                      <span>{bid.completedJobs} jobs completed</span>
                      <span>${bid.hourlyRate}/hr</span>
                    </div>
                  </div>
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

              {/* Job Reference */}
              <div className="mb-3">
                <span className="text-sm text-gray-600">For job: </span>
                <span className="text-sm font-medium text-gray-900">{bid.jobTitle}</span>
              </div>

              {/* Cover Letter */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Cover Letter</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{bid.coverLetter}</p>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Skills</h4>
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
                  Submitted {new Date(bid.submittedAt).toLocaleDateString()}
                </div>
                
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" onClick={() => handleChat(bid.freelancerId)}>
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Chat
                  </Button>
                  <Button variant="secondary" size="sm">
                    View Profile
                  </Button>
                  {bid.status === 'pending' && (
                    <Button size="sm" onClick={() => handleHire(bid.id)}>
                      Hire Freelancer
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
            <User className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bids found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
          <Button onClick={() => {
            setSearchTerm('');
            setSelectedJob('all');
          }}>
            Clear Filters
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default ClientBids;
