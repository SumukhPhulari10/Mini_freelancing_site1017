import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Star, Calendar, Award, CheckCircle, Edit2, X, Save, Plus, ExternalLink, Briefcase, DollarSign, GraduationCap, Clock } from 'lucide-react';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';

const FreelancerProfile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || 'Experienced freelancer passionate about delivering high-quality work.',
    skills: user?.skills || [],
    experience: user?.experience || 'beginner',
    hourlyRate: user?.hourlyRate || '50',
    portfolio: user?.portfolio || '',
    education: user?.education || 'Bachelor of Science in Computer Science',
    availability: user?.availability || 'available'
  });
  const [newSkill, setNewSkill] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSave = () => {
    // Save profile data via AuthContext so it persists everywhere
    updateUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to current user values
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      location: user?.location || '',
      bio: user?.bio || 'Experienced freelancer passionate about delivering high-quality work.',
      skills: user?.skills || [],
      experience: user?.experience || 'beginner',
      hourlyRate: user?.hourlyRate || '50',
      portfolio: user?.portfolio || '',
      education: user?.education || 'Bachelor of Science in Computer Science',
      availability: user?.availability || 'available'
    });
    setIsEditing(false);
  };

  const getExperienceLabel = (exp) => {
    const labels = {
      beginner: 'Beginner (0-2 years)',
      intermediate: 'Intermediate (2-5 years)',
      advanced: 'Advanced (5-10 years)',
      expert: 'Expert (10+ years)'
    };
    return labels[exp] || exp;
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
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-600" />);
    }
    return stars;
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  // Common input classes for dark theme
  const inputClass = "w-full px-4 py-2.5 bg-dark-tertiary border border-gray-600 rounded-xl text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 outline-none";
  const inlineInputClass = "bg-dark-tertiary border border-gray-600 rounded-lg px-3 py-1.5 text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 outline-none transition-all duration-200";

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-secondary rounded-2xl border border-gray-800 p-6"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Profile</h1>
            <p className="text-text-secondary">Manage your professional information</p>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="secondary" onClick={handleCancel}>
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-1" />
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-dark-secondary rounded-2xl border border-gray-800 p-6"
          >
            <div className="text-center">
              <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                <span className="text-2xl font-bold text-white">{getInitials(formData.name)}</span>
              </div>
              
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`${inlineInputClass} text-center text-xl font-semibold w-full mb-2`}
                />
              ) : (
                <h2 className="text-xl font-semibold text-text-primary mb-2">{formData.name}</h2>
              )}
              
              <p className="text-text-secondary mb-1">Freelancer</p>

              {/* Availability Badge */}
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                formData.availability === 'available' ? 'bg-green-500/15 text-green-400 border border-green-500/25' :
                formData.availability === 'busy' ? 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/25' :
                'bg-red-500/15 text-red-400 border border-red-500/25'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  formData.availability === 'available' ? 'bg-green-400 animate-pulse' :
                  formData.availability === 'busy' ? 'bg-yellow-400' : 'bg-red-400'
                }`}></span>
                {formData.availability === 'available' ? 'Available' : formData.availability === 'busy' ? 'Busy' : 'Away'}
              </span>
              
              {/* Rating */}
              <div className="flex items-center justify-center mb-4">
                {renderStars(4.8)}
                <span className="ml-2 text-sm text-text-secondary">4.8 (47 reviews)</span>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-3 text-left">
                <div className="flex items-center text-text-secondary">
                  <Mail className="w-4 h-4 mr-3 text-primary-400 flex-shrink-0" />
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`${inlineInputClass} flex-1 text-sm`}
                    />
                  ) : (
                    <span className="text-sm truncate">{formData.email}</span>
                  )}
                </div>
                
                <div className="flex items-center text-text-secondary">
                  <Phone className="w-4 h-4 mr-3 text-primary-400 flex-shrink-0" />
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className={`${inlineInputClass} flex-1 text-sm`}
                    />
                  ) : (
                    <span className="text-sm">{formData.phone || 'Not provided'}</span>
                  )}
                </div>
                
                <div className="flex items-center text-text-secondary">
                  <MapPin className="w-4 h-4 mr-3 text-primary-400 flex-shrink-0" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="City, Country"
                      className={`${inlineInputClass} flex-1 text-sm`}
                    />
                  ) : (
                    <span className="text-sm">{formData.location || 'Not provided'}</span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-dark-secondary rounded-2xl border border-gray-800 p-6"
          >
            <h3 className="font-semibold text-text-primary mb-4">Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-text-secondary">Jobs Completed</span>
                <span className="font-medium text-text-primary">47</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Total Earnings</span>
                <span className="font-medium text-green-400">$45,280</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Success Rate</span>
                <span className="font-medium text-text-primary">98%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Response Time</span>
                <span className="font-medium text-text-primary">1 hour</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-dark-secondary rounded-2xl border border-gray-800 p-6"
          >
            <h3 className="font-semibold text-text-primary mb-4">About</h3>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                className={`${inputClass} resize-none`}
              />
            ) : (
              <p className="text-text-secondary leading-relaxed">{formData.bio}</p>
            )}
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-dark-secondary rounded-2xl border border-gray-800 p-6"
          >
            <h3 className="font-semibold text-text-primary mb-4">Skills</h3>
            {isEditing && (
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  className={`${inputClass} flex-1`}
                  placeholder="Add a skill and press Enter"
                />
                <Button
                  type="button"
                  onClick={addSkill}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </Button>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              {formData.skills.length > 0 ? formData.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-500/15 text-primary-400 rounded-full text-sm border border-primary-500/25"
                >
                  {skill}
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="hover:text-primary-300 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              )) : (
                <p className="text-text-muted text-sm">No skills added yet</p>
              )}
            </div>
          </motion.div>

          {/* Experience & Education */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-dark-secondary rounded-2xl border border-gray-800 p-6"
            >
              <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-primary-400" />
                Experience
              </h3>
              {isEditing ? (
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className={inputClass}
                  style={{ colorScheme: 'dark' }}
                >
                  <option value="beginner" className="bg-dark-secondary">Beginner (0-2 years)</option>
                  <option value="intermediate" className="bg-dark-secondary">Intermediate (2-5 years)</option>
                  <option value="advanced" className="bg-dark-secondary">Advanced (5-10 years)</option>
                  <option value="expert" className="bg-dark-secondary">Expert (10+ years)</option>
                </select>
              ) : (
                <p className="text-text-secondary">{getExperienceLabel(formData.experience)}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-dark-secondary rounded-2xl border border-gray-800 p-6"
            >
              <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-primary-400" />
                Education
              </h3>
              {isEditing ? (
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  className={inputClass}
                />
              ) : (
                <p className="text-text-secondary">{formData.education}</p>
              )}
            </motion.div>
          </div>

          {/* Hourly Rate & Portfolio */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-dark-secondary rounded-2xl border border-gray-800 p-6"
            >
              <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary-400" />
                Hourly Rate
              </h3>
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <span className="text-text-secondary font-medium">$</span>
                  <input
                    type="number"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleInputChange}
                    className={`${inputClass} flex-1`}
                  />
                  <span className="text-text-secondary text-sm">/hr</span>
                </div>
              ) : (
                <p className="text-2xl font-bold text-primary-400">${formData.hourlyRate}/hour</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-dark-secondary rounded-2xl border border-gray-800 p-6"
            >
              <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-primary-400" />
                Portfolio
              </h3>
              {isEditing ? (
                <input
                  type="url"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="https://yourportfolio.com"
                />
              ) : (
                formData.portfolio ? (
                  <a
                    href={formData.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Portfolio
                  </a>
                ) : (
                  <p className="text-text-muted">No portfolio link provided</p>
                )
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfile;
