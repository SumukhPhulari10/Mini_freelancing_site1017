import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, Clock, CheckCircle, XCircle, Hourglass, X, MapPin } from 'lucide-react';
import Button from '../components/Button';
import { JobCardSkeleton } from '../components/LoadingSkeleton';

const FreelancerBids = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewJobBid, setViewJobBid] = useState(null); // bid whose job we're viewing

  const mockBids = [
    {
      id: 1,
      jobId: 1,
      jobTitle: 'Full Stack Web Developer Needed',
      company: 'TechStart Inc.',
      location: 'Remote',
      duration: '3 months',
      budget: '5000',
      description: 'Looking for an experienced full stack developer to build a modern e-commerce platform using React and Node.js. The project includes user authentication, payment integration, and admin dashboard.',
      skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
      bidAmount: 4800,
      deliveryTime: '3 weeks',
      status: 'pending',
      submittedAt: '2024-01-16T10:30:00Z',
      coverLetter: "I have 5+ years of experience in full stack development with React and Node.js. I've built several e-commerce platforms and can deliver this project within 3 weeks with high quality code and proper documentation.",
    },
    {
      id: 2,
      jobId: 2,
      jobTitle: 'Mobile App UI/UX Designer',
      company: 'FitLife Studios',
      location: 'New York, NY',
      duration: '6 weeks',
      budget: '3500',
      description: 'We need a talented UI/UX designer to create beautiful and intuitive designs for our fitness tracking mobile app. Experience with mobile-first design is required.',
      skills: ['Figma', 'Mobile Design', 'Prototyping', 'User Research'],
      bidAmount: 3200,
      deliveryTime: '2 weeks',
      status: 'accepted',
      submittedAt: '2024-01-15T09:15:00Z',
      coverLetter: "Creative UI/UX designer specializing in mobile apps. I'll create intuitive and beautiful designs for your fitness app, focusing on user experience and modern design principles.",
    },
    {
      id: 3,
      jobId: 3,
      jobTitle: 'Content Writing Project',
      company: 'TechMedia Group',
      location: 'Remote',
      duration: 'Ongoing',
      budget: '1500',
      description: 'Seeking an experienced tech writer to create engaging blog posts about emerging technologies. Topics include AI, blockchain, and cloud computing.',
      skills: ['Technical Writing', 'SEO', 'Research', 'Blog Writing'],
      bidAmount: 1500,
      deliveryTime: '1 month',
      status: 'rejected',
      submittedAt: '2024-01-14T16:45:00Z',
      coverLetter: 'Experienced tech writer with expertise in creating engaging content about emerging technologies.',
    },
    {
      id: 4,
      jobId: 4,
      jobTitle: 'React Native Mobile App',
      company: 'QuickEats',
      location: 'San Francisco, CA',
      duration: '4 months',
      budget: '8000',
      description: 'Need a React Native developer to build a cross-platform mobile app for food delivery. Must have experience with APIs and real-time features.',
      skills: ['React Native', 'Firebase', 'Redux', 'API Integration'],
      bidAmount: 7500,
      deliveryTime: '4 months',
      status: 'pending',
      submittedAt: '2024-01-13T11:20:00Z',
      coverLetter: "React Native developer with 3+ years of experience building cross-platform mobile applications. I've worked on similar food delivery apps and can deliver a high-quality solution.",
    },
    {
      id: 5,
      jobId: 5,
      jobTitle: 'Digital Marketing Specialist',
      company: 'GrowthHackers',
      location: 'Remote',
      duration: '2 months',
      budget: '2500',
      description: 'Looking for a digital marketing expert to manage our social media campaigns and improve our online presence.',
      skills: ['Social Media', 'Google Analytics', 'SEO', 'Content Marketing'],
      bidAmount: 2200,
      deliveryTime: '6 weeks',
      status: 'accepted',
      submittedAt: '2024-01-12T14:30:00Z',
      coverLetter: 'Digital marketing expert with proven track record in social media campaigns and analytics.',
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      const localBids = JSON.parse(localStorage.getItem('myBids') || '[]');
      setBids([...localBids, ...mockBids]);
      setLoading(false);
    }, 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredBids = bids.filter(bid => {
    const matchesSearch =
      bid.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (bid.company || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      bid.coverLetter.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || bid.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status) => {
    const styles = {
      pending:  'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30',
      accepted: 'bg-green-500/15  text-green-400  border border-green-500/30',
      rejected: 'bg-red-500/15   text-red-400    border border-red-500/30'
    };
    return styles[status] || 'bg-gray-700/40 text-gray-400 border border-gray-600/30';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending:  <Hourglass   className="w-3.5 h-3.5" />,
      accepted: <CheckCircle className="w-3.5 h-3.5" />,
      rejected: <XCircle     className="w-3.5 h-3.5" />
    };
    return icons[status] || <FileText className="w-3.5 h-3.5" />;
  };

  const getStatusText = (status) => {
    const texts = { pending: 'Pending Review', accepted: 'Bid Accepted', rejected: 'Bid Rejected' };
    return texts[status] || status;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-text-primary">My Bids</h1>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => <JobCardSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">My Bids</h1>
          <p className="text-text-muted mt-0.5">Track all your bid proposals and their status</p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          { label: 'Total Bids',    value: bids.length,                                   icon: <FileText    className="w-5 h-5 text-primary-400" />, bg: 'bg-primary-500/15', border: 'border-primary-500/25', text: 'text-primary-400' },
          { label: 'Accepted Bids', value: bids.filter(b => b.status === 'accepted').length, icon: <CheckCircle className="w-5 h-5 text-green-400" />,   bg: 'bg-green-500/15',   border: 'border-green-500/25',   text: 'text-green-400' },
          { label: 'Pending Bids',  value: bids.filter(b => b.status === 'pending').length,  icon: <Hourglass   className="w-5 h-5 text-yellow-400" />,  bg: 'bg-yellow-500/15',  border: 'border-yellow-500/25',  text: 'text-yellow-400' }
        ].map((st) => (
          <div key={st.label} className="bg-dark-secondary rounded-2xl border border-gray-800 p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">{st.label}</p>
              <p className={`text-2xl font-bold mt-1 ${st.text}`}>{st.value}</p>
            </div>
            <div className={`w-12 h-12 ${st.bg} border ${st.border} rounded-xl flex items-center justify-center`}>
              {st.icon}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-dark-secondary rounded-2xl border border-gray-800 p-5"
      >
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" />
            <input
              type="text"
              placeholder="Search bids by job title or company..."
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
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
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
            transition={{ delay: 0.3 + index * 0.06 }}
            className="bg-dark-secondary rounded-2xl border border-gray-800 hover:border-primary-500/30 hover:shadow-card transition-all duration-200"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1 min-w-0 mr-4">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h3 className="text-base font-semibold text-text-primary">{bid.jobTitle}</h3>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${getStatusStyle(bid.status)}`}>
                      {getStatusIcon(bid.status)}
                      {getStatusText(bid.status)}
                    </span>
                  </div>
                  <p className="text-sm text-text-muted">{bid.company}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xl font-bold text-primary-400">₹{bid.bidAmount.toLocaleString('en-IN')}</div>
                  <div className="text-xs text-text-muted flex items-center justify-end gap-1 mt-0.5">
                    <Clock className="w-3 h-3" />{bid.deliveryTime}
                  </div>
                </div>
              </div>

              {/* Cover Letter */}
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Your Cover Letter</h4>
                <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">{bid.coverLetter}</p>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Job Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {(bid.skills || []).map((skill) => (
                    <span key={skill} className="px-2.5 py-0.5 bg-primary-500/15 text-primary-400 text-xs rounded-full border border-primary-500/25 font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                <div className="text-xs text-text-muted">
                  Submitted {new Date(bid.submittedAt).toLocaleDateString()} at {new Date(bid.submittedAt).toLocaleTimeString()}
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" onClick={() => setViewJobBid(bid)}>View Job</Button>
                  {bid.status === 'accepted' && <Button size="sm">Start Project</Button>}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredBids.length === 0 && (
        <motion.div className="text-center py-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <FileText className="w-14 h-14 mx-auto text-text-muted mb-3" />
          <h3 className="text-lg font-medium text-text-primary mb-1">No bids found</h3>
          <p className="text-text-muted mb-5 text-sm">Try adjusting your search or filters</p>
          <Button onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}>Clear Filters</Button>
        </motion.div>
      )}

      {/* View Job Modal */}
      <AnimatePresence>
        {viewJobBid && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewJobBid(null)}
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
                  <h2 className="text-xl font-bold text-text-primary">{viewJobBid.jobTitle}</h2>
                  <p className="text-primary-400 text-sm mt-0.5">{viewJobBid.company}</p>
                </div>
                <button onClick={() => setViewJobBid(null)} className="p-2 hover:bg-white/5 rounded-lg text-text-muted transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-5 overflow-y-auto">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Budget',   value: `₹${Number(viewJobBid.budget || 0).toLocaleString('en-IN')}`, color: 'text-blue-400' },
                    { label: 'Duration', value: viewJobBid.duration || 'TBD',                          color: 'text-text-primary' },
                    { label: 'Your Bid', value: `₹${viewJobBid.bidAmount.toLocaleString('en-IN')}`,            color: 'text-green-400' },
                  ].map(s => (
                    <div key={s.label} className="bg-dark-primary/60 border border-gray-800 rounded-xl p-3 text-center">
                      <div className="text-xs text-text-muted mb-1">{s.label}</div>
                      <div className={`font-semibold text-sm ${s.color}`}>{s.value}</div>
                    </div>
                  ))}
                </div>

                {/* Meta */}
                {viewJobBid.location && (
                  <div className="flex flex-wrap gap-4 text-sm text-text-muted">
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{viewJobBid.location}</span>
                  </div>
                )}

                {/* Description */}
                {viewJobBid.description && (
                  <div>
                    <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Job Description</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{viewJobBid.description}</p>
                  </div>
                )}

                {/* Skills */}
                {viewJobBid.skills?.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {viewJobBid.skills.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-primary-500/15 text-primary-400 text-sm rounded-full border border-primary-500/25">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Your Cover Letter */}
                <div>
                  <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Your Cover Letter</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{viewJobBid.coverLetter}</p>
                </div>

                {/* Bid Status */}
                <div className="flex items-center gap-3 p-3 bg-dark-primary/50 rounded-xl border border-gray-800">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${getStatusStyle(viewJobBid.status)}`}>
                    {getStatusIcon(viewJobBid.status)}
                    {getStatusText(viewJobBid.status)}
                  </span>
                  <span className="text-xs text-text-muted">Submitted on {new Date(viewJobBid.submittedAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-700/60 flex-shrink-0">
                <Button variant="secondary" className="w-full" onClick={() => setViewJobBid(null)}>Close</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FreelancerBids;
