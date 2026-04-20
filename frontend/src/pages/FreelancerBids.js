import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, DollarSign, Clock, CheckCircle, XCircle, Hourglass } from 'lucide-react';
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
      workingProfession: 'TechStart Inc.',
      bidAmount: 4800,
      deliveryTime: '3 weeks',
      status: 'pending',
      submittedAt: '2024-01-16T10:30:00Z',
      coverLetter: "I have 5+ years of experience in full stack development with React and Node.js. I've built several e-commerce platforms and can deliver this project within 3 weeks with high quality code and proper documentation.",
      skills: ['React', 'Node.js', 'MongoDB', 'TypeScript']
    },
    {
      id: 2,
      jobTitle: 'Mobile App UI/UX Designer',
      workingProfession: 'FitLife Studios',
      bidAmount: 3200,
      deliveryTime: '2 weeks',
      status: 'accepted',
      submittedAt: '2024-01-15T09:15:00Z',
      coverLetter: "Creative UI/UX designer specializing in mobile apps. I'll create intuitive and beautiful designs for your fitness app, focusing on user experience and modern design principles.",
      skills: ['Figma', 'Mobile Design', 'Prototyping', 'User Research']
    },
    {
      id: 3,
      jobTitle: 'Content Writing Project',
      workingProfession: 'TechMedia Group',
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
      workingProfession: 'QuickEats',
      bidAmount: 7500,
      deliveryTime: '4 months',
      status: 'pending',
      submittedAt: '2024-01-13T11:20:00Z',
      coverLetter: "React Native developer with 3+ years of experience building cross-platform mobile applications. I've worked on similar food delivery apps and can deliver a high-quality solution.",
      skills: ['React Native', 'Firebase', 'Redux', 'API Integration']
    },
    {
      id: 5,
      jobTitle: 'Digital Marketing Specialist',
      workingProfession: 'GrowthHackers',
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
    const matchesSearch =
      bid.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bid.workingProfession.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
          { label: 'Total Bids',    value: bids.length, icon: <FileText className="w-5 h-5 text-primary-400" />, bg: 'bg-primary-500/15', border: 'border-primary-500/25', text: 'text-primary-400' },
          { label: 'Accepted Bids', value: bids.filter(b => b.status === 'accepted').length, icon: <CheckCircle className="w-5 h-5 text-green-400" />, bg: 'bg-green-500/15', border: 'border-green-500/25', text: 'text-green-400' },
          { label: 'Pending Bids',  value: bids.filter(b => b.status === 'pending').length,  icon: <Hourglass   className="w-5 h-5 text-yellow-400" />, bg: 'bg-yellow-500/15', border: 'border-yellow-500/25', text: 'text-yellow-400' }
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
            transition={{ delay: 0.3 + index * 0.08 }}
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
                  <p className="text-sm text-text-muted">{bid.workingProfession}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xl font-bold text-primary-400">${bid.bidAmount.toLocaleString()}</div>
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
                  Submitted {new Date(bid.submittedAt).toLocaleDateString()} at {new Date(bid.submittedAt).toLocaleTimeString()}
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm">View Job</Button>
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
    </div>
  );
};

export default FreelancerBids;
