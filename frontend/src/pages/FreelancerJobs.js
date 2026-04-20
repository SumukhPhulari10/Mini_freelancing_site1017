import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Clock, Briefcase, X, CheckCircle } from 'lucide-react';
import { JobCardSkeleton } from '../components/LoadingSkeleton';
import Button from '../components/Button';
import PlaceBidModal from '../components/PlaceBidModal';

const FreelancerJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showBidModal, setShowBidModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [successToast, setSuccessToast] = useState(false);

  const categories = [
    { value: 'all',                label: 'All Categories' },
    { value: 'web-development',    label: 'Web Development' },
    { value: 'mobile-development', label: 'Mobile Development' },
    { value: 'design',             label: 'Design' },
    { value: 'writing',            label: 'Writing' },
    { value: 'marketing',          label: 'Marketing' },
  ];

  const mockJobs = [
    { id: 1, title: 'Full Stack Web Developer Needed',  description: 'Looking for an experienced full stack developer to build a modern e-commerce platform using React and Node.js. The project includes user authentication, payment integration, and admin dashboard. You will work closely with our product team to understand requirements and deliver a scalable, well-tested solution.', budget: '5000', location: 'Remote',           duration: '3 months', skills: ['React', 'Node.js', 'MongoDB', 'Stripe API'],               postedTime: '2 hours ago',  company: 'TechStart Inc.',    category: 'web-development',    bids: 12 },
    { id: 2, title: 'Mobile App UI/UX Designer',        description: 'We need a talented UI/UX designer to create beautiful and intuitive designs for our fitness tracking mobile app. Experience with mobile-first design and user research is required. You will deliver wireframes, interactive prototypes, and final design assets in Figma.', budget: '3500', location: 'New York, NY',      duration: '6 weeks',  skills: ['Figma', 'Mobile Design', 'Prototyping', 'User Research'],    postedTime: '5 hours ago',  company: 'FitLife Studios',   category: 'design',             bids: 8  },
    { id: 3, title: 'Content Writer for Tech Blog',     description: 'Seeking an experienced tech writer to create engaging blog posts about emerging technologies. Topics include AI, blockchain, and cloud computing. Posts should be SEO-optimised and between 1500–2500 words each. Weekly deadlines apply.', budget: '1500', location: 'Remote',           duration: 'Ongoing',  skills: ['Technical Writing', 'SEO', 'Research', 'Blog Writing'],       postedTime: '1 day ago',    company: 'TechMedia Group',   category: 'writing',            bids: 15 },
    { id: 4, title: 'React Native Mobile App',          description: 'Need a React Native developer to build a cross-platform mobile app for food delivery. Must have experience with REST APIs and real-time features like order tracking and push notifications. Firebase integration required.', budget: '8000', location: 'San Francisco, CA', duration: '4 months', skills: ['React Native', 'Firebase', 'Redux', 'API Integration'],        postedTime: '1 day ago',    company: 'QuickEats',         category: 'mobile-development', bids: 20 },
    { id: 5, title: 'Digital Marketing Specialist',     description: 'Looking for a digital marketing expert to manage our social media campaigns and improve our online presence. You will plan and execute multi-channel campaigns across Google, Meta, and LinkedIn. Analytics reporting is a weekly requirement.', budget: '2500', location: 'Remote',           duration: '2 months', skills: ['Social Media', 'Google Analytics', 'SEO', 'Content Marketing'], postedTime: '2 days ago',   company: 'GrowthHackers',    category: 'marketing',          bids: 10 },
    { id: 6, title: 'Vue.js Frontend Developer',        description: 'We need a Vue.js specialist to help redesign our company website. Must be proficient in modern frontend technologies and responsive design. The existing site uses plain HTML/CSS and needs a full migration to a Vue 3 + Vite setup.', budget: '4000', location: 'London, UK',       duration: '2 months', skills: ['Vue.js', 'Vuex', 'CSS3', 'JavaScript'],                        postedTime: '3 days ago',   company: 'WebSolutions Ltd',  category: 'web-development',    bids: 6  },
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
  const handleViewDetails = (job) => { setSelectedJob(job); setShowDetailsModal(true); };

  const handleBidSubmit = () => {
    setShowBidModal(false);
    setSelectedJob(null);
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 3500);
  };

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
            <div className="text-lg font-bold text-primary-400">₹{job.budget}</div>
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
          <Button variant="secondary" className="flex-1" onClick={() => handleViewDetails(job)}>View Details</Button>
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

      {/* View Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedJob && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDetailsModal(false)}
          >
            <motion.div
              className="bg-dark-secondary border border-gray-700 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-700/60 flex justify-between items-start flex-shrink-0">
                <div>
                  <h2 className="text-xl font-bold text-text-primary">{selectedJob.title}</h2>
                  <p className="text-primary-400 text-sm mt-0.5">{selectedJob.company}</p>
                </div>
                <button onClick={() => setShowDetailsModal(false)} className="p-2 hover:bg-white/5 rounded-lg text-text-muted transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-5 overflow-y-auto">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Budget', value: `₹${Number(selectedJob.budget).toLocaleString('en-IN')}`, color: 'text-blue-400' },
                    { label: 'Duration', value: selectedJob.duration, color: 'text-text-primary' },
                    { label: 'Bids', value: `${selectedJob.bids} bids`, color: 'text-text-primary' },
                  ].map(s => (
                    <div key={s.label} className="bg-dark-primary/60 border border-gray-800 rounded-xl p-3 text-center">
                      <div className="text-xs text-text-muted mb-1">{s.label}</div>
                      <div className={`font-semibold text-sm ${s.color}`}>{s.value}</div>
                    </div>
                  ))}
                </div>

                {/* Meta */}
                <div className="flex flex-wrap gap-4 text-sm text-text-muted">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{selectedJob.location}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{selectedJob.postedTime}</span>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Description</h3>
                  <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-wrap">{selectedJob.description}</p>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-primary-500/15 text-primary-400 text-sm rounded-full border border-primary-500/25">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-700/60 flex gap-3 flex-shrink-0">
                <Button variant="secondary" className="flex-1" onClick={() => setShowDetailsModal(false)}>Close</Button>
                <Button className="flex-1" onClick={() => { setShowDetailsModal(false); handlePlaceBid(selectedJob); }}>
                  Place Bid
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Toast */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-green-500/10 border border-green-500/40 text-green-400 px-5 py-3.5 rounded-2xl shadow-lg backdrop-blur-sm"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
          >
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm">Bid submitted successfully!</p>
              <p className="text-xs text-green-500/70">Check My Bids to track your proposal.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FreelancerJobs;
