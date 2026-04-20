import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Star, MessageSquare, Clock, X, Award, Briefcase, Code2, ExternalLink, Calendar } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import Button from '../components/Button';
import { FreelancerCardSkeleton } from '../components/LoadingSkeleton';

// Pool of dummy freelancer profiles to draw from
const FREELANCER_POOL = [
  { name: 'Sarah Johnson',   title: 'Full Stack Developer',        rating: 4.9, completedJobs: 47, hourlyRate: 85,  skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],        coverLetter: "I have 5+ years of experience in full stack development. I've built several similar projects and can deliver with high quality code and proper documentation. Let's schedule a call to discuss your requirements in detail." },
  { name: 'Michael Chen',    title: 'Senior Web Developer',         rating: 4.7, completedJobs: 32, hourlyRate: 75,  skills: ['Vue.js', 'Python', 'PostgreSQL', 'AWS'],            coverLetter: "Experienced web developer with a strong portfolio of similar projects. My approach focuses on scalability and performance. I can provide references from previous clients who were extremely satisfied." },
  { name: 'Emily Rodriguez', title: 'UI/UX Designer',               rating: 4.8, completedJobs: 28, hourlyRate: 65,  skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'], coverLetter: "Creative designer specializing in this type of project. I'll create intuitive and beautiful results focusing on user experience and modern design principles that drive real engagement." },
  { name: 'David Kim',       title: 'Product Designer',              rating: 4.6, completedJobs: 19, hourlyRate: 70,  skills: ['Figma', 'Sketch', 'Interaction Design', 'UX Research'], coverLetter: "Product designer with deep experience in user-centric design. I understand the full journey and can create solutions that not only look great but also drive engagement and retention for your business." },
  { name: 'Alex Thompson',   title: 'Backend Engineer',              rating: 4.5, completedJobs: 55, hourlyRate: 90,  skills: ['Java', 'Spring Boot', 'Kubernetes', 'Redis'],        coverLetter: "Senior backend engineer with expertise in high-performance systems. I build scalable, fault-tolerant architectures. My last 3 projects are all handling over 1M requests/day with 99.9% uptime." },
  { name: 'Priya Sharma',    title: 'React Developer',               rating: 4.8, completedJobs: 41, hourlyRate: 80,  skills: ['React', 'Redux', 'GraphQL', 'Jest'],                 coverLetter: "Passionate React developer with a keen eye for detail. I specialize in building performant SPAs and have contributed to open-source projects. Clean, testable code is my priority on every engagement." },
  { name: 'James Wilson',    title: 'DevOps Engineer',               rating: 4.4, completedJobs: 23, hourlyRate: 95,  skills: ['Docker', 'AWS', 'CI/CD', 'Terraform'],               coverLetter: "Certified AWS DevOps engineer focused on automation and reliability. I can set up your entire infrastructure pipeline, cutting deployment time by up to 80% based on my recent client work." },
  { name: 'Nina Patel',      title: 'Data Scientist',                rating: 4.9, completedJobs: 38, hourlyRate: 100, skills: ['Python', 'TensorFlow', 'SQL', 'Tableau'],            coverLetter: "Data scientist with a PhD background and strong industry experience. I've delivered ML models that increased revenue by 25%+ for my clients. I'm excited to bring that impact to your project." },
  { name: 'Carlos Mendez',   title: 'Mobile Developer',              rating: 4.6, completedJobs: 29, hourlyRate: 78,  skills: ['Flutter', 'Dart', 'Firebase', 'iOS'],               coverLetter: "Cross-platform mobile developer with 50+ published apps. I build fluid, native-feeling experiences for both iOS and Android. I can show you live demos of similar apps I've shipped recently." },
  { name: 'Aisha Okonkwo',   title: 'Content Strategist',            rating: 4.7, completedJobs: 64, hourlyRate: 55,  skills: ['SEO', 'Copywriting', 'CMS', 'Analytics'],           coverLetter: "Award-winning content strategist who has driven 300% organic traffic growth for B2B SaaS clients. I align content with business goals — every word I write serves a strategic purpose." },
  { name: 'Tom Baker',       title: 'WordPress Expert',              rating: 4.3, completedJobs: 88, hourlyRate: 50,  skills: ['WordPress', 'PHP', 'Elementor', 'WooCommerce'],      coverLetter: "WordPress veteran with 8+ years and hundreds of sites delivered. I handle everything from custom theme development to complex WooCommerce stores. Fast turnarounds and clean code guaranteed." },
  { name: 'Yuki Tanaka',     title: 'iOS Developer',                 rating: 4.8, completedJobs: 34, hourlyRate: 88,  skills: ['Swift', 'SwiftUI', 'CoreData', 'Xcode'],            coverLetter: "Native iOS developer with a track record of App Store hits. My apps have collectively garnered over 500K downloads. I follow Apple's Human Interface Guidelines strictly for optimal approval rates." },
  { name: 'Rachel Green',    title: 'Digital Marketing Specialist',  rating: 4.5, completedJobs: 51, hourlyRate: 60,  skills: ['Google Ads', 'Meta Ads', 'Email Marketing', 'CRO'],  coverLetter: "Performance marketer focused on measurable ROI. My campaigns have generated $5M+ in tracked revenue for clients. I optimize relentlessly and provide transparent weekly reporting." },
  { name: 'Omar Hassan',     title: 'Blockchain Developer',          rating: 4.6, completedJobs: 17, hourlyRate: 110, skills: ['Solidity', 'Web3.js', 'Ethereum', 'Hardhat'],        coverLetter: "Smart contract developer with a security-first mindset. All my contracts go through rigorous testing and I provide full audit reports. Happy to share verified deployments from previous projects." },
  { name: 'Lisa Park',       title: 'QA Engineer',                   rating: 4.7, completedJobs: 43, hourlyRate: 65,  skills: ['Selenium', 'Cypress', 'JIRA', 'Test Automation'],    coverLetter: "Detail-obsessed QA engineer who has helped teams reduce production bugs by 90%. I set up comprehensive automated test suites and work closely with devs to shift testing left in the pipeline." },
  { name: 'Arjun Reddy',     title: 'Cloud Architect',               rating: 4.9, completedJobs: 26, hourlyRate: 120, skills: ['Azure', 'GCP', 'Microservices', 'Kafka'],            coverLetter: "Multi-cloud architect specializing in cost-optimized, resilient systems. I've migrated 15+ enterprises to the cloud, achieving an average 40% cost saving. Let me design your ideal architecture." },
  { name: 'Sophie Turner',   title: 'Graphic Designer',              rating: 4.6, completedJobs: 72, hourlyRate: 55,  skills: ['Illustrator', 'Photoshop', 'Branding', 'Print'],     coverLetter: "Creative graphic designer with a diverse portfolio spanning startups to Fortune 500 brands. I deliver on-brand visuals that communicate clearly and leave a lasting impression on your audience." },
  { name: 'Ben Carter',      title: 'Technical Writer',              rating: 4.5, completedJobs: 59, hourlyRate: 50,  skills: ['Markdown', 'API Docs', 'Confluence', 'Docs-as-Code'], coverLetter: "Technical writer who has documented complex APIs and SDKs for major tech companies. I make the complex simple — your developers and users will thank you for clear, well-structured documentation." },
  { name: 'Fatima Al-Zahra', title: 'React Native Developer',        rating: 4.8, completedJobs: 31, hourlyRate: 82,  skills: ['React Native', 'Expo', 'Redux Toolkit', 'TypeScript'], coverLetter: "Specialist in React Native with a strong track record of high-performance cross-platform apps. I stay up to date with the latest RN versions and best practices to ensure future-proof code." },
  { name: 'Daniel Novak',    title: 'Cybersecurity Consultant',      rating: 4.9, completedJobs: 22, hourlyRate: 115, skills: ['Penetration Testing', 'OWASP', 'SIEM', 'Network Security'], coverLetter: "Certified ethical hacker (CEH, OSCP) with experience securing fintech and healthcare platforms. I provide detailed vulnerability reports and work with your team to remediate every finding." },
];

const STATUSES = ['pending', 'pending', 'pending', 'shortlisted', 'shortlisted', 'rejected', 'hired'];
const DELIVERY_TIMES = ['1 week', '2 weeks', '3 weeks', '4 weeks', '5-6 weeks', '2 months'];

/**
 * Generates exactly `count` deterministic dummy bids for a given job.
 */
const generateBidsForJob = (job, count) => {
  return Array.from({ length: count }, (_, i) => {
    const pool = FREELANCER_POOL[i % FREELANCER_POOL.length];
    const extraIdx = Math.floor(i / FREELANCER_POOL.length);
    // Slightly vary amount and rating so bids don't look identical
    const bidAmount = Math.round(job.budget * (0.85 + (i % 7) * 0.05));
    const rating = Math.min(5.0, +(pool.rating - (extraIdx * 0.05)).toFixed(1));
    const statusIdx = i % STATUSES.length;
    const baseDate = new Date('2024-01-16T10:00:00Z');
    baseDate.setHours(baseDate.getHours() + i * 3);

    return {
      id: `${job.id}-bid-${i}`,
      jobId: job.id,
      jobTitle: job.title,
      freelancerName: extraIdx > 0 ? `${pool.name} ${extraIdx + 1}` : pool.name,
      freelancerTitle: pool.title,
      avatar: null,
      rating,
      completedJobs: pool.completedJobs + i,
      hourlyRate: pool.hourlyRate,
      bidAmount,
      deliveryTime: DELIVERY_TIMES[i % DELIVERY_TIMES.length],
      coverLetter: pool.coverLetter,
      skills: pool.skills,
      status: STATUSES[statusIdx],
      submittedAt: baseDate.toISOString(),
    };
  });
};

const generateMockProfileDetails = (bid) => {
  const isSenior = bid.freelancerTitle.toLowerCase().includes('senior') || bid.freelancerTitle.toLowerCase().includes('architect') || bid.freelancerTitle.toLowerCase().includes('expert');
  const expLabel = isSenior ? 'Expert (10+ years)' : 'Intermediate (3-5 years)';
  
  const reviews = Array.from({ length: 3 }).map((_, i) => ({
    id: i,
    client: `Client ${i + 1}`,
    rating: bid.rating > 4.5 ? 5 : 4,
    text: "Great work! Delivered on time and with excellent communication. Would definitely recommend.",
    date: `2024-01-0${i + 1}`,
  }));

  const portfolio = Array.from({ length: 2 }).map((_, i) => ({
    title: `${bid.skills[0] || 'Web'} Project ${i + 1}`,
    description: `A complex web application built using ${bid.skills.join(', ')}.`,
    link: i === 0 ? 'https://example.com' : '' // Only first project gets a link for demo purposes
  }));

  return {
    experience: expLabel,
    reviews,
    portfolio,
    totalEarnings: `₹${(bid.completedJobs * 15000).toLocaleString('en-IN')}`
  };
};

const FreelancerModal = ({ bid, onClose }) => {
  const details = generateMockProfileDetails(bid);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl max-h-[90vh] bg-dark-secondary border border-gray-700/60 rounded-2xl shadow-2xl flex flex-col z-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800/50 bg-dark-primary/30 flex-shrink-0 rounded-t-2xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary-500/20 border border-primary-500/30 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-primary-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary">{bid.freelancerName}</h2>
              <p className="text-text-muted">{bid.freelancerTitle}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-text-muted hover:text-white hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-8">
          
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-dark-primary/50 p-4 rounded-xl border border-gray-800/50 text-center shadow-inner">
              <div className="flex items-center justify-center gap-1 text-yellow-400 font-bold text-lg mb-1">
                <Star className="w-4 h-4 fill-yellow-400" />
                {bid.rating}
              </div>
              <p className="text-xs text-text-muted uppercase tracking-wider">Rating</p>
            </div>
            <div className="bg-dark-primary/50 p-4 rounded-xl border border-gray-800/50 text-center shadow-inner">
              <div className="flex items-center justify-center gap-1 text-primary-400 font-bold text-lg mb-1">
                {bid.completedJobs}
              </div>
              <p className="text-xs text-text-muted uppercase tracking-wider">Jobs Done</p>
            </div>
            <div className="bg-dark-primary/50 p-4 rounded-xl border border-gray-800/50 text-center shadow-inner">
              <div className="flex items-center justify-center gap-1 text-green-400 font-bold text-lg mb-1">
                ₹{bid.hourlyRate}/hr
              </div>
              <p className="text-xs text-text-muted uppercase tracking-wider">Hourly Rate</p>
            </div>
          </div>

          {/* Experience & Skills */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-primary-400" />
                Experience
              </h3>
              <p className="text-text-secondary">{details.experience}</p>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-primary-400" />
                Top Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {bid.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-primary-500/15 text-primary-400 text-xs rounded-full border border-primary-500/25">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Past Works */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-primary-400" />
              Past Works / Portfolio
            </h3>
            <div className="space-y-4">
              {details.portfolio.map((item, i) => (
                <div key={i} className="p-4 bg-dark-primary/30 rounded-xl border border-gray-800/50 hover:border-primary-500/30 transition-colors group">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-text-primary">{item.title}</h4>
                    {item.link && item.link !== '#' && (
                      <a href={item.link} target="_blank" rel="noreferrer" className="text-text-muted group-hover:text-primary-400 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Star className="w-4 h-4 text-primary-400" />
              Recent Reviews
            </h3>
            <div className="space-y-4">
              {details.reviews.map((review) => (
                <div key={review.id} className="p-4 bg-dark-primary/30 rounded-xl border border-gray-800/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-700/50 flex flex-shrink-0 items-center justify-center">
                      <User className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">{review.client}</p>
                      <div className="flex gap-1 mt-0.5">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star key={idx} className={`w-3 h-3 ${idx < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />
                        ))}
                      </div>
                    </div>
                    <div className="text-xs text-text-muted flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {review.date}
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary italic">"{review.text}"</p>
                </div>
              ))}
            </div>
          </div>

        </div>
        
        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-800/50 bg-dark-primary/30 rounded-b-2xl flex justify-end gap-3 flex-shrink-0">
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </div>
      </motion.div>
    </div>
  );
};

const ClientBids = () => {
  const [searchParams] = useSearchParams();
  const initialJobId = searchParams.get('jobId') || 'all';

  const [allBids, setAllBids] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(initialJobId);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);

  const mockJobs = [
    { id: 1,  title: 'Full Stack Web Developer Needed', budget: 5000, bids: 12 },
    { id: 2,  title: 'Mobile App UI/UX Designer',       budget: 3500, bids: 8  },
    { id: 3,  title: 'Content Writer for Tech Blog',    budget: 1500, bids: 15 },
    { id: 4,  title: 'React Native Mobile App',         budget: 8000, bids: 20 },
    { id: 5,  title: 'Digital Marketing Specialist',    budget: 2500, bids: 0  },
  ];

  useEffect(() => {
    setTimeout(() => {
      const localJobs = JSON.parse(localStorage.getItem('localJobs') || '[]');
      const jobs = [
        ...localJobs.map(j => ({ id: j.id, title: j.title, budget: j.budget, bids: j.bids || 0 })),
        ...mockJobs,
      ];
      setAllJobs(jobs);

      const bids = jobs.flatMap(job => generateBidsForJob(job, job.bids));
      setAllBids(bids);
      setLoading(false);
    }, 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredBids = allBids.filter(bid => {
    const matchesJob = selectedJob === 'all' || bid.jobId.toString() === selectedJob;
    const matchesSearch =
      bid.freelancerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bid.coverLetter.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesJob && matchesSearch;
  });

  const getStatusStyle = (status) => {
    const styles = {
      pending:     'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30',
      shortlisted: 'bg-blue-500/15   text-blue-400   border border-blue-500/30',
      rejected:    'bg-red-500/15    text-red-400    border border-red-500/30',
      hired:       'bg-green-500/15  text-green-400  border border-green-500/30',
    };
    return styles[status] || 'bg-gray-700/40 text-gray-400 border border-gray-600/30';
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />
    ));

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
          <p className="text-text-muted mt-0.5">
            Review and manage bids for your jobs
            {selectedJob !== 'all' && (
              <span className="ml-2 text-primary-400 font-medium">
                — {allJobs.find(j => j.id.toString() === selectedJob)?.title}
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <span className="px-3 py-1 bg-primary-500/15 border border-primary-500/25 rounded-full text-primary-400 font-medium">
            {filteredBids.length} bid{filteredBids.length !== 1 ? 's' : ''}
          </span>
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
            {allJobs.filter(j => j.bids > 0).map(job => (
              <option key={job.id} value={job.id.toString()}>{job.title} ({job.bids})</option>
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
            transition={{ delay: 0.2 + index * 0.04 }}
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
                      <span className="text-primary-400 font-medium">₹{bid.hourlyRate}/hr</span>
                    </div>
                  </div>
                </div>
                {/* Bid Amount */}
                <div className="text-right flex-shrink-0">
                  <div className="text-xl font-bold text-primary-400">₹{bid.bidAmount.toLocaleString('en-IN')}</div>
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
                  <Button variant="secondary" size="sm" onClick={() => setSelectedFreelancer(bid)}>View Profile</Button>
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
          <h3 className="text-lg font-medium text-text-primary mb-1">No bids yet</h3>
          <p className="text-text-muted mb-5 text-sm">
            {selectedJob !== 'all' ? 'This job has no bids yet.' : 'Try adjusting your search or filters.'}
          </p>
          <Button onClick={() => { setSearchTerm(''); setSelectedJob('all'); }}>Clear Filters</Button>
        </motion.div>
      )}

      <AnimatePresence>
        {selectedFreelancer && (
          <FreelancerModal bid={selectedFreelancer} onClose={() => setSelectedFreelancer(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClientBids;
