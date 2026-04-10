import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, User, Star, MessageSquare, Clock } from 'lucide-react';
import Button from '../components/Button';
import { FreelancerCardSkeleton } from '../components/LoadingSkeleton';

const ClientBids = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const mockBids = [
    { id: 1, jobId: 1, jobTitle: 'Full Stack Web Developer Needed', freelancerId: 1, freelancerName: 'Sarah Johnson', freelancerTitle: 'Full Stack Developer', avatar: null, rating: 4.9, completedJobs: 47, hourlyRate: 85, bidAmount: 4800, deliveryTime: '3 weeks', coverLetter: "I have 5+ years of experience in full stack development with React and Node.js. I've built several e-commerce platforms and can deliver this project within 3 weeks with high quality code and proper documentation.", skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'GraphQL'], status: 'pending', submittedAt: '2024-01-16T10:30:00Z' },
    { id: 2, jobId: 1, jobTitle: 'Full Stack Web Developer Needed', freelancerId: 2, freelancerName: 'Michael Chen', freelancerTitle: 'Senior Web Developer', avatar: null, rating: 4.7, completedJobs: 32, hourlyRate: 75, bidAmount: 4500, deliveryTime: '4 weeks', coverLetter: "Experienced web developer with expertise in React and Node.js. I've worked on similar e-commerce projects and can provide references. My approach focuses on scalability and performance.", skills: ['React', 'Node.js', 'Express', 'MongoDB', 'AWS'], status: 'pending', submittedAt: '2024-01-16T14:20:00Z' },
    { id: 3, jobId: 2, jobTitle: 'Mobile App UI/UX Designer', freelancerId: 3, freelancerName: 'Emily Rodriguez', freelancerTitle: 'UI/UX Designer', avatar: null, rating: 4.8, completedJobs: 28, hourlyRate: 65, bidAmount: 3200, deliveryTime: '2 weeks', coverLetter: "Creative UI/UX designer specializing in mobile apps. I'll create intuitive and beautiful designs for your fitness app, focusing on user experience and modern design principles.", skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Mobile Design'], status: 'shortlisted', submittedAt: '2024-01-15T09:15:00Z' },
    { id: 4, jobId: 2, jobTitle: 'Mobile App UI/UX Designer', freelancerId: 4, freelancerName: 'David Kim', freelancerTitle: 'Product Designer', avatar: null, rating: 4.6, completedJobs: 19, hourlyRate: 70, bidAmount: 3500, deliveryTime: '3 weeks', coverLetter: "I'm a product designer with experience in fitness apps. I understand the user journey and can create designs that not only look great but also drive engagement and retention.", skills: ['Figma', 'Sketch', 'User Research', 'Interaction Design', 'Mobile Design'], status: 'rejected', submittedAt: '2024-01-14T16:45:00Z' }
  ];

  React.useEffect(() => {
    setTimeout(() => { setBids(mockBids); setLoading(false); }, 1000);
  }, []);

  const filteredBids = bids.filter(bid => {
    const matchesJob = selectedJob === 'all' || bid.jobId.toString() === selectedJob;
    const matchesSearch =
      bid.freelancerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bid.coverLetter.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesJob && matchesSearch;
  });

  const jobs = [...new Map(bids.map(b => [b.jobId, { id: b.jobId, title: b.jobTitle }])).values()];

  const getStatusStyle = (status) => {
    const styles = {
      pending:     'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30',
      shortlisted: 'bg-blue-500/15   text-blue-400   border border-blue-500/30',
      rejected:    'bg-red-500/15    text-red-400    border border-red-500/30',
      hired:       'bg-green-500/15  text-green-400  border border-green-500/30'
    };
    return styles[status] || 'bg-gray-700/40 text-gray-400 border border-gray-600/30';
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-text-primary">Bids Management</h1>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => <FreelancerCardSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Bids Management</h1>
          <p className="text-text-muted mt-0.5">Review and manage bids for your jobs</p>
        </div>
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
              placeholder="Search freelancers or bids..."
              className="w-full pl-9 pr-4 py-2.5 bg-dark-primary/60 border border-gray-700/60 rounded-xl text-sm text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/40 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2.5 bg-dark-primary/60 border border-gray-700/60 rounded-xl text-sm text-text-primary focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/40 transition-all"
            style={{ colorScheme: 'dark' }}
            value={selectedJob}
            onChange={(e) => setSelectedJob(e.target.value)}
          >
            <option value="all">All Jobs</option>
            {jobs.map(job => (
              <option key={job.id} value={job.id}>{job.title}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Bids List */}
      <div className="space-y-4">
        {filteredBids.map((bid, index) => (
          <motion.div
            key={bid.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.08 }}
            className="bg-dark-secondary rounded-2xl border border-gray-800 hover:border-blue-500/30 hover:shadow-card transition-all duration-200"
          >
            <div className="p-6">
              {/* Header row */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-11 h-11 bg-primary-500/20 border border-primary-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="text-base font-semibold text-text-primary">{bid.freelancerName}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(bid.status)}`}>
                        {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-text-muted text-sm">{bid.freelancerTitle}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
                      <div className="flex items-center gap-1">
                        {renderStars(bid.rating)}
                        <span className="ml-1 text-yellow-400 font-medium">{bid.rating}</span>
                      </div>
                      <span>{bid.completedJobs} jobs completed</span>
                      <span className="text-primary-400 font-medium">${bid.hourlyRate}/hr</span>
                    </div>
                  </div>
                </div>
                {/* Bid Amount */}
                <div className="text-right flex-shrink-0">
                  <div className="text-xl font-bold text-primary-400">${bid.bidAmount.toLocaleString()}</div>
                  <div className="text-xs text-text-muted flex items-center justify-end gap-1 mt-0.5">
                    <Clock className="w-3 h-3" />{bid.deliveryTime}
                  </div>
                </div>
              </div>

              {/* Job Reference */}
              <div className="mb-3 px-3 py-2 bg-dark-primary/50 rounded-lg border border-gray-700/40">
                <span className="text-xs text-text-muted">For job: </span>
                <span className="text-xs font-medium text-text-secondary">{bid.jobTitle}</span>
              </div>

              {/* Cover Letter */}
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Cover Letter</h4>
                <p className="text-text-secondary text-sm leading-relaxed">{bid.coverLetter}</p>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {bid.skills.map((skill) => (
                    <span key={skill} className="px-2.5 py-0.5 bg-primary-500/15 text-primary-400 text-xs rounded-full border border-primary-500/25 font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                <div className="text-xs text-text-muted">
                  Submitted {new Date(bid.submittedAt).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm">
                    <MessageSquare className="w-3.5 h-3.5 mr-1 inline" />
                    Chat
                  </Button>
                  <Button variant="secondary" size="sm">View Profile</Button>
                  {bid.status === 'pending' && <Button size="sm">Hire Freelancer</Button>}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredBids.length === 0 && (
        <motion.div className="text-center py-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <User className="w-14 h-14 mx-auto text-text-muted mb-3" />
          <h3 className="text-lg font-medium text-text-primary mb-1">No bids found</h3>
          <p className="text-text-muted mb-5 text-sm">Try adjusting your search or filters</p>
          <Button onClick={() => { setSearchTerm(''); setSelectedJob('all'); }}>Clear Filters</Button>
        </motion.div>
      )}
    </div>
  );
};

export default ClientBids;
