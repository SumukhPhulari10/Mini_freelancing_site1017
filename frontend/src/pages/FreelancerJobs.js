import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, DollarSign, Clock, MapPin, Briefcase } from 'lucide-react';
import JobCard from '../components/JobCard';
import { JobCardSkeleton } from '../components/LoadingSkeleton';
import Button from '../components/Button';
import PlaceBidModal from '../components/PlaceBidModal';

const FreelancerJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showBidModal, setShowBidModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-development', label: 'Mobile Development' },
    { value: 'design', label: 'Design' },
    { value: 'writing', label: 'Writing' },
    { value: 'marketing', label: 'Marketing' },
  ];

  const mockJobs = [
    {
      id: 1,
      title: 'Full Stack Web Developer Needed',
      description: 'Looking for an experienced full stack developer to build a modern e-commerce platform using React and Node.js. The project includes user authentication, payment integration, and admin dashboard.',
      budget: '5000',
      location: 'Remote',
      duration: '3 months',
      skills: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
      postedTime: '2 hours ago',
      company: 'TechStart Inc.',
      category: 'web-development',
      bids: 12
    },
    {
      id: 2,
      title: 'Mobile App UI/UX Designer',
      description: 'We need a talented UI/UX designer to create beautiful and intuitive designs for our fitness tracking mobile app. Experience with mobile-first design is required.',
      budget: '3500',
      location: 'New York, NY',
      duration: '6 weeks',
      skills: ['Figma', 'Mobile Design', 'Prototyping', 'User Research'],
      postedTime: '5 hours ago',
      company: 'FitLife Studios',
      category: 'design',
      bids: 8
    },
    {
      id: 3,
      title: 'Content Writer for Tech Blog',
      description: 'Seeking an experienced tech writer to create engaging blog posts about emerging technologies. Topics include AI, blockchain, and cloud computing.',
      budget: '1500',
      location: 'Remote',
      duration: 'Ongoing',
      skills: ['Technical Writing', 'SEO', 'Research', 'Blog Writing'],
      postedTime: '1 day ago',
      company: 'TechMedia Group',
      category: 'writing',
      bids: 15
    },
    {
      id: 4,
      title: 'React Native Mobile App',
      description: 'Need a React Native developer to build a cross-platform mobile app for food delivery. Must have experience with APIs and real-time features.',
      budget: '8000',
      location: 'San Francisco, CA',
      duration: '4 months',
      skills: ['React Native', 'Firebase', 'Redux', 'API Integration'],
      postedTime: '1 day ago',
      company: 'QuickEats',
      category: 'mobile-development',
      bids: 20
    },
    {
      id: 5,
      title: 'Digital Marketing Specialist',
      description: 'Looking for a digital marketing expert to manage our social media campaigns and improve our online presence. Experience with analytics tools is required.',
      budget: '2500',
      location: 'Remote',
      duration: '2 months',
      skills: ['Social Media', 'Google Analytics', 'SEO', 'Content Marketing'],
      postedTime: '2 days ago',
      company: 'GrowthHackers',
      category: 'marketing',
      bids: 10
    },
    {
      id: 6,
      title: 'Vue.js Frontend Developer',
      description: 'We need a Vue.js specialist to help redesign our company website. Must be proficient in modern frontend technologies and responsive design.',
      budget: '4000',
      location: 'London, UK',
      duration: '2 months',
      skills: ['Vue.js', 'Vuex', 'CSS3', 'JavaScript'],
      postedTime: '3 days ago',
      company: 'WebSolutions Ltd',
      category: 'web-development',
      bids: 6
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
                         job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handlePlaceBid = (job) => {
    setSelectedJob(job);
    setShowBidModal(true);
  };

  const handleBidSubmit = (bidData) => {
    console.log('Bid submitted:', bidData);
    setShowBidModal(false);
    setSelectedJob(null);
  };

  // Custom job card for freelancer view
  const FreelancerJobCard = ({ job }) => (
    <motion.div
      className="card p-6 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-1 hover:text-primary-600 transition-colors">
              {job.title}
            </h3>
            <p className="text-gray-600 text-sm">{job.company}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-600">
              ${job.budget}
            </div>
            <div className="text-xs text-gray-500">{job.bids} bids</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 line-clamp-3">
          {job.description}
        </p>

        {/* Meta Information */}
        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{job.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            <span>{job.postedTime}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill, index) => (
            <motion.span
              key={skill}
              className="skill-tag"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              whileHover={{ scale: 1.1 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-gray-100 flex gap-2">
          <Button 
            className="flex-1"
            onClick={() => handlePlaceBid(job)}
          >
            Place Bid
          </Button>
          <Button variant="secondary" className="flex-1">
            View Details
          </Button>
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Browse Jobs</h1>
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
          <h1 className="text-2xl font-bold text-gray-900">Browse Jobs</h1>
          <p className="text-gray-600">Find opportunities that match your skills</p>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        className="bg-white rounded-xl shadow-sm p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search jobs, skills, or companies..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2">
            <select
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Job Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FreelancerJobCard job={job} />
            </motion.div>
          ))
        ) : (
          <motion.div
            className="col-span-full text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
            <Button
              variant="secondary"
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>

      {/* Place Bid Modal */}
      {showBidModal && (
        <PlaceBidModal
          job={selectedJob}
          onClose={() => setShowBidModal(false)}
          onSubmit={handleBidSubmit}
        />
      )}
    </div>
  );
};

export default FreelancerJobs;
