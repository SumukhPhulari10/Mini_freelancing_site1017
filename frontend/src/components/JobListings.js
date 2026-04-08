import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown } from 'lucide-react';
import JobCard from './JobCard';
import { JobCardSkeleton } from './LoadingSkeleton';
import Button from './Button';

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

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
      category: 'web-development'
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
      category: 'design'
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
      category: 'writing'
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
      category: 'mobile-development'
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
      category: 'marketing'
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
      category: 'web-development'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setJobs(mockJobs);
      setLoading(false);
    }, 1500);
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleApply = (jobId) => {
    console.log(`Applied to job ${jobId}`);
    // Handle job application logic here
  };

  return (
    <section id="jobs" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Browse Available Jobs
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find the perfect opportunity that matches your skills and expertise
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="bg-white rounded-xl shadow-sm p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs, skills, or companies..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Button
                variant="secondary"
                className="flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4" />
                {categories.find(cat => cat.value === selectedCategory)?.label}
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>

              {/* Dropdown */}
              {showFilters && (
                <motion.div
                  className="absolute top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        setSelectedCategory(category.value);
                        setShowFilters(false);
                      }}
                    >
                      {category.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Show skeletons while loading
            Array.from({ length: 6 }).map((_, index) => (
              <JobCardSkeleton key={index} />
            ))
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <JobCard job={job} onApply={handleApply} />
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

        {/* Load More Button */}
        {!loading && filteredJobs.length > 0 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Button variant="secondary" className="px-8">
              Load More Jobs
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default JobListings;
