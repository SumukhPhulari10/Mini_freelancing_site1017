import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Clock, Briefcase } from 'lucide-react';
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
    { id: 1, title: 'Full Stack Web Developer Needed', description: 'Looking for an experienced full stack developer to build a modern e-commerce platform using React and Node.js. The project includes user authentication, payment integration, and admin dashboard.', budget: '5000', location: 'Remote', duration: '3 months', skills: ['React', 'Node.js', 'MongoDB', 'Stripe API'], postedTime: '2 hours ago', company: 'TechStart Inc.', category: 'web-development', bids: 12 },
    { id: 2, title: 'Mobile App UI/UX Designer', description: 'We need a talented UI/UX designer to create beautiful and intuitive designs for our fitness tracking mobile app. Experience with mobile-first design is required.', budget: '3500', location: 'New York, NY', duration: '6 weeks', skills: ['Figma', 'Mobile Design', 'Prototyping', 'User Research'], postedTime: '5 hours ago', company: 'FitLife Studios', category: 'design', bids: 8 },
    { id: 3, title: 'Content Writer for Tech Blog', description: 'Seeking an experienced tech writer to create engaging blog posts about emerging technologies. Topics include AI, blockchain, and cloud computing.', budget: '1500', location: 'Remote', duration: 'Ongoing', skills: ['Technical Writing', 'SEO', 'Research', 'Blog Writing'], postedTime: '1 day ago', company: 'TechMedia Group', category: 'writing', bids: 15 },
    { id: 4, title: 'React Native Mobile App', description: 'Need a React Native developer to build a cross-platform mobile app for food delivery. Must have experience with APIs and real-time features.', budget: '8000', location: 'San Francisco, CA', duration: '4 months', skills: ['React Native', 'Firebase', 'Redux', 'API Integration'], postedTime: '1 day ago', company: 'QuickEats', category: 'mobile-development', bids: 20 },
    { id: 5, title: 'Digital Marketing Specialist', description: 'Looking for a digital marketing expert to manage our social media campaigns and improve our online presence. Experience with analytics tools is required.', budget: '2500', location: 'Remote', duration: '2 months', skills: ['Social Media', 'Google Analytics', 'SEO', 'Content Marketing'], postedTime: '2 days ago', company: 'GrowthHackers', category: 'marketing', bids: 10 },
    { id: 6, title: 'Vue.js Frontend Developer', description: 'We need a Vue.js specialist to help redesign our company website. Must be proficient in modern frontend technologies and responsive design.', budget: '4000', location: 'London, UK', duration: '2 months', skills: ['Vue.js', 'Vuex', 'CSS3', 'JavaScript'], postedTime: '3 days ago', company: 'WebSolutions Ltd', category: 'web-development', bids: 6 }
  ];

  React.useEffect(() => {
    setTimeout(() => { setJobs(mockJobs); setLoading(false); }, 1000);
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePlaceBid = (job) => { setSelectedJob(job); setShowBidModal(true); };
  const handleBidSubmit = () => { setShowBidModal(false); setSelectedJob(null); };

  const FreelancerJobCard = ({ job }) => (
    <motion.div
      className="bg-dark-secondary rounded-2xl border border-gray-800 hover:border-primary-500/30 hover:shadow-card transition-all duration-200 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <div className="p-5 flex flex-col h-full space-y-3">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0 mr-3">
            <h3 className="text-base font-semibold text-text-primary mb-0.5 hover:text-primary-400 transition-colors">
              {job.title}
            </h3>
            <p className="text-text-muted text-sm">{job.company}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-lg font-bold text-primary-400">${job.budget}</div>
            <div className="text-xs text-text-muted">{job.bids} bids</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-text-secondary text-sm line-clamp-3">{job.description}</p>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 text-xs text-text-muted">
          <div className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</div>
          <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.duration}</div>
          <div className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{job.postedTime}</div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5">
          {job.skills.map((skill, i) => (
            <motion.span
              key={skill}
              className="skill-tag"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: i * 0.04 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>

        {/* Actions */}
        <div className="pt-3 border-t border-gray-700/50 flex gap-2 mt-auto">
          <Button className="flex-1" onClick={() => handlePlaceBid(job)}>Place Bid</Button>
          <Button variant="secondary" className="flex-1">View Details</Button>
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-text-primary">Browse Jobs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
          <h1 className="text-2xl font-bold text-text-primary">Browse Jobs</h1>
          <p className="text-text-muted mt-0.5">Find opportunities that match your skills</p>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        className="bg-dark-secondary rounded-2xl border border-gray-800 p-5"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" />
            <input
              type="text"
              placeholder="Search jobs, skills, or companies..."
              className="w-full pl-9 pr-4 py-2.5 bg-dark-primary/60 border border-gray-700/60 rounded-xl text-sm text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/40 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2.5 bg-dark-primary/60 border border-gray-700/60 rounded-xl text-sm text-text-primary focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/40 transition-all"
            style={{ colorScheme: 'dark' }}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Job Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <FreelancerJobCard job={job} />
            </motion.div>
          ))
        ) : (
          <motion.div className="col-span-full text-center py-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Briefcase className="w-14 h-14 mx-auto text-text-muted mb-3" />
            <p className="text-text-muted text-base">No jobs found matching your criteria.</p>
            <Button variant="secondary" className="mt-4" onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>

      {/* Place Bid Modal */}
      {showBidModal && (
        <PlaceBidModal job={selectedJob} onClose={() => setShowBidModal(false)} onSubmit={handleBidSubmit} />
      )}
    </div>
  );
};

export default FreelancerJobs;
