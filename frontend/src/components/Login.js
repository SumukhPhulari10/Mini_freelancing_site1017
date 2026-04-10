import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, Eye, EyeOff, Mail, Lock, Plus, X, MapPin, Phone, FileText, ArrowLeft } from 'lucide-react';
import Button from './Button';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'client',
    // Client specific fields
    companyName: '',
    workType: '',
    location: '',
    phone: '',
    // Freelancer specific fields
    skills: [],
    experience: '',
    portfolio: '',
    hourlyRate: ''
  });
  const [errors, setErrors] = useState({});
  const [newSkill, setNewSkill] = useState('');
  const { login, signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && !formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!isLogin) {
      // Role-specific validation
      if (formData.role === 'client') {
        if (!formData.companyName) {
          newErrors.companyName = 'Company name is required';
        }
        if (!formData.workType) {
          newErrors.workType = 'Work type is required';
        }
      } else if (formData.role === 'freelancer') {
        if (formData.skills.length === 0) {
          newErrors.skills = 'At least one skill is required';
        }
        if (!formData.experience) {
          newErrors.experience = 'Experience level is required';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (isLogin) {
        // Login flow - authenticate and redirect to dashboard
        await login(formData.role, formData);
        if (formData.role === 'client') {
          navigate('/client/dashboard');
        } else {
          navigate('/freelancer/dashboard');
        }
      } else {
        // Signup flow - store user data locally, then switch to login
        signup(formData.role, formData);
        const savedEmail = formData.email;
        const savedRole = formData.role;
        setIsLogin(true);
        setFormData(prev => ({
          ...prev,
          email: savedEmail,
          role: savedRole,
          name: '',
          companyName: '',
          workType: '',
          location: '',
          phone: '',
          skills: [],
          experience: '',
          portfolio: '',
          hourlyRate: ''
        }));
        setErrors({});
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <motion.div
        className="w-full max-w-2xl relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="glass-card rounded-3xl shadow-glow p-8 border border-gray-800/50">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-text-secondary hover:text-primary-400 transition-colors duration-200 mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="text-sm font-medium">Back to Home</span>
          </button>

          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-2">
              MiniFreelance
            </h1>
            <p className="text-text-secondary">
              {isLogin ? 'Welcome back to your workspace' : 'Create your account and start freelancing'}
            </p>
          </div>

          {/* Role Toggle */}
          <div className="flex bg-dark-secondary/50 backdrop-blur-sm rounded-full p-1 mb-8 border border-gray-700/50">
            <button
              className={`flex-1 flex items-center justify-center py-3 px-6 rounded-full transition-all duration-200 ${
                formData.role === 'client'
                  ? 'bg-primary-600 text-white shadow-glow'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
              onClick={() => setFormData(prev => ({ ...prev, role: 'client' }))}
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Client
            </button>
            <button
              className={`flex-1 flex items-center justify-center py-3 px-6 rounded-full transition-all duration-200 ${
                formData.role === 'freelancer'
                  ? 'bg-primary-600 text-white shadow-glow'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
              onClick={() => setFormData(prev => ({ ...prev, role: 'freelancer' }))}
            >
              <User className="w-4 h-4 mr-2" />
              Freelancer
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field (for signup) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500/50 focus:border-transparent ${
                      errors.name ? 'border-red-500' : 'border-gray-700'
                    } bg-dark-secondary text-text-primary placeholder-text-secondary`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>
            )}

            {/* Role-specific fields for signup */}
            {!isLogin && formData.role === 'client' && (
              <>
                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    <Briefcase className="inline w-4 h-4 mr-2" />
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500/50 focus:border-transparent bg-dark-secondary text-text-primary placeholder-text-muted ${
                      errors.companyName ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="Enter your company name"
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-sm text-red-400">{errors.companyName}</p>
                  )}
                </div>

                {/* Work Type */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    <FileText className="inline w-4 h-4 mr-2" />
                    Work Type
                  </label>
                  <select
                    name="workType"
                    value={formData.workType}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500/50 focus:border-transparent bg-dark-secondary text-text-primary ${
                      errors.workType ? 'border-red-500' : 'border-gray-700'
                    } ${!formData.workType ? 'text-text-muted' : 'text-text-primary'}`}
                    style={{ colorScheme: 'dark' }}
                  >
                    <option value="" className="bg-dark-secondary text-text-muted">Select work type</option>
                    <option value="technology" className="bg-dark-secondary text-text-primary">Technology & Software</option>
                    <option value="design" className="bg-dark-secondary text-text-primary">Design & Creative</option>
                    <option value="marketing" className="bg-dark-secondary text-text-primary">Marketing & Sales</option>
                    <option value="writing" className="bg-dark-secondary text-text-primary">Writing & Content</option>
                    <option value="consulting" className="bg-dark-secondary text-text-primary">Consulting & Business</option>
                    <option value="other" className="bg-dark-secondary text-text-primary">Other</option>
                  </select>
                  {errors.workType && (
                    <p className="mt-1 text-sm text-red-400">{errors.workType}</p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    <MapPin className="inline w-4 h-4 mr-2" />
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-700 rounded-xl bg-dark-secondary text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary-500/50 focus:border-transparent"
                    placeholder="City, Country"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    <Phone className="inline w-4 h-4 mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-700 rounded-xl bg-dark-secondary text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary-500/50 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </>
            )}

            {/* Role-specific fields for freelancer signup */}
            {!isLogin && formData.role === 'freelancer' && (
              <>
                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    <User className="inline w-4 h-4 mr-2" />
                    Skills
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      className="flex-1 px-4 py-3 border border-gray-700 rounded-xl bg-dark-secondary text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary-500/50 focus:border-transparent"
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
                  
                  {/* Skills Tags */}
                  {formData.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm border border-primary-500/30"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="hover:text-primary-300"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  {errors.skills && (
                    <p className="mt-1 text-sm text-red-400">{errors.skills}</p>
                  )}
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    <Briefcase className="inline w-4 h-4 mr-2" />
                    Experience Level
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500/50 focus:border-transparent bg-dark-secondary ${
                      errors.experience ? 'border-red-500' : 'border-gray-700'
                    } ${!formData.experience ? 'text-text-muted' : 'text-text-primary'}`}
                    style={{ colorScheme: 'dark' }}
                  >
                    <option value="" className="bg-dark-secondary text-text-muted">Select experience level</option>
                    <option value="beginner" className="bg-dark-secondary text-text-primary">Beginner (0-2 years)</option>
                    <option value="intermediate" className="bg-dark-secondary text-text-primary">Intermediate (2-5 years)</option>
                    <option value="advanced" className="bg-dark-secondary text-text-primary">Advanced (5-10 years)</option>
                    <option value="expert" className="bg-dark-secondary text-text-primary">Expert (10+ years)</option>
                  </select>
                  {errors.experience && (
                    <p className="mt-1 text-sm text-red-400">{errors.experience}</p>
                  )}
                </div>

                {/* Hourly Rate */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Hourly Rate ($)
                  </label>
                  <input
                    type="number"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-700 rounded-xl bg-dark-secondary text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary-500/50 focus:border-transparent"
                    placeholder="e.g. 50"
                  />
                </div>

                {/* Portfolio */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    <FileText className="inline w-4 h-4 mr-2" />
                    Portfolio URL
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-700 rounded-xl bg-dark-secondary text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary-500/50 focus:border-transparent"
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500/50 focus:border-transparent bg-dark-secondary text-text-primary placeholder-text-muted ${
                    errors.email ? 'border-red-500' : 'border-gray-700'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500/50 focus:border-transparent bg-dark-secondary text-text-primary placeholder-text-muted ${
                    errors.password ? 'border-red-500' : 'border-gray-700'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-3"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </form>

          {/* Toggle Login/Signup */}
          <div className="mt-6 text-center">
            <p className="text-text-secondary">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 text-primary-400 hover:text-primary-300 font-medium"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-dark-secondary/50 rounded-xl border border-gray-700/50">
            <p className="text-xs text-text-secondary text-center">
              <strong className="text-text-primary">Demo:</strong> Use any email and password (min 6 chars) to login
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
