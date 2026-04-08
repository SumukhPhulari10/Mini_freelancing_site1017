import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import FreelancerCard from './FreelancerCard';
import { FreelancerCardSkeleton } from './LoadingSkeleton';
import Button from './Button';

const FreelancerProfiles = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const skills = [
    'all',
    'React',
    'Node.js',
    'Python',
    'JavaScript',
    'UI/UX Design',
    'Mobile Development',
    'Data Science',
    'WordPress',
    'SEO'
  ];

  const mockFreelancers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'Full Stack Developer',
      avatar: null,
      location: 'San Francisco, CA',
      hourlyRate: 85,
      skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'GraphQL'],
      rating: 4.9,
      completedJobs: 47,
      description: 'Experienced full stack developer with 5+ years of experience building scalable web applications using modern technologies.'
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'UI/UX Designer',
      avatar: null,
      location: 'New York, NY',
      hourlyRate: 65,
      skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'Prototyping', 'User Research'],
      rating: 4.8,
      completedJobs: 32,
      description: 'Creative designer passionate about creating intuitive and beautiful user experiences that delight users and drive business results.'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      title: 'Mobile App Developer',
      avatar: null,
      location: 'Austin, TX',
      hourlyRate: 75,
      skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Firebase'],
      rating: 4.7,
      completedJobs: 28,
      description: 'Mobile app developer specializing in cross-platform solutions. I turn ideas into polished, high-performance mobile applications.'
    },
    {
      id: 4,
      name: 'David Kim',
      title: 'Data Scientist',
      avatar: null,
      location: 'Seattle, WA',
      hourlyRate: 95,
      skills: ['Python', 'Machine Learning', 'Data Analysis', 'TensorFlow', 'SQL'],
      rating: 5.0,
      completedJobs: 19,
      description: 'Data scientist with expertise in machine learning and statistical analysis. I help businesses make data-driven decisions.'
    },
    {
      id: 5,
      name: 'Jessica Taylor',
      title: 'WordPress Developer',
      avatar: null,
      location: 'London, UK',
      hourlyRate: 55,
      skills: ['WordPress', 'PHP', 'WooCommerce', 'SEO', 'Elementor'],
      rating: 4.6,
      completedJobs: 61,
      description: 'WordPress specialist creating custom themes, plugins, and optimized websites that rank well and convert visitors.'
    },
    {
      id: 6,
      name: 'Alex Thompson',
      title: 'JavaScript Developer',
      avatar: null,
      location: 'Remote',
      hourlyRate: 70,
      skills: ['JavaScript', 'Vue.js', 'React', 'Node.js', 'Express.js'],
      rating: 4.8,
      completedJobs: 35,
      description: 'Passionate JavaScript developer with expertise in modern frameworks and building real-time applications.'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFreelancers(mockFreelancers);
      setLoading(false);
    }, 1500);
  }, []);

  const filteredFreelancers = freelancers.filter(freelancer => {
    const matchesSearch = freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         freelancer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         freelancer.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSkill = selectedSkill === 'all' || freelancer.skills.includes(selectedSkill);
    
    return matchesSearch && matchesSkill;
  }).sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else if (sortBy === 'jobs') {
      return b.completedJobs - a.completedJobs;
    } else if (sortBy === 'rate') {
      return a.hourlyRate - b.hourlyRate;
    }
    return 0;
  });

  const handleHire = (freelancerId) => {
    console.log(`Hiring freelancer ${freelancerId}`);
    // Handle hire logic here
  };

  return (
    <section className="py-20 bg-dark-primary">
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
            Top Freelancers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover talented professionals ready to bring your projects to life
          </p>
        </motion.div>

        {/* Filters */}
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
                placeholder="Search freelancers, skills, or expertise..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Skill Filter */}
            <div className="flex gap-2">
              <select
                className="input-field"
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
              >
                {skills.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill === 'all' ? 'All Skills' : skill}
                  </option>
                ))}
              </select>

              {/* Sort By */}
              <select
                className="input-field"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="rating">Top Rated</option>
                <option value="jobs">Most Jobs</option>
                <option value="rate">Lowest Rate</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Freelancer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Show skeletons while loading
            Array.from({ length: 6 }).map((_, index) => (
              <FreelancerCardSkeleton key={index} />
            ))
          ) : filteredFreelancers.length > 0 ? (
            filteredFreelancers.map((freelancer, index) => (
              <motion.div
                key={freelancer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FreelancerCard freelancer={freelancer} onHire={handleHire} />
              </motion.div>
            ))
          ) : (
            <motion.div
              className="col-span-full text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-gray-500 text-lg">No freelancers found matching your criteria.</p>
              <Button
                variant="secondary"
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSkill('all');
                }}
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>

        {/* Load More Button */}
        {!loading && filteredFreelancers.length > 0 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Button className="px-8 bg-black text-white border border-gray-600 hover:bg-gray-800">
              Load More Freelancers
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FreelancerProfiles;
