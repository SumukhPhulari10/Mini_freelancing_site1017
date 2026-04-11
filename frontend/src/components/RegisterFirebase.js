import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, Briefcase, MapPin, Phone, DollarSign, GraduationCap, Plus, X, ArrowRight, Chrome } from 'lucide-react';
import { useFirebaseAuth } from '../firebase/FirebaseAuthContext';

const RegisterFirebase = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: 'freelancer',
    phone: '',
    location: '',
    bio: '',
    companyName: '',
    workType: '',
    skills: [],
    experience: 'beginner',
    hourlyRate: '',
    portfolioUrl: '',
    education: '',
    availability: 'available'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { signup, signInWithGoogle, isLoading, error } = useFirebaseAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
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
    
    // Basic validations
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }
    
    // Role-specific validations
    if (formData.role === 'client') {
      if (!formData.companyName) {
        newErrors.companyName = 'Company name is required for clients';
      }
      if (!formData.workType) {
        newErrors.workType = 'Work type is required for clients';
      }
    } else if (formData.role === 'freelancer') {
      if (formData.skills.length === 0) {
        newErrors.skills = 'At least one skill is required for freelancers';
      }
      if (formData.hourlyRate && (isNaN(formData.hourlyRate) || parseFloat(formData.hourlyRate) < 0)) {
        newErrors.hourlyRate = 'Please enter a valid hourly rate';
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
      await signup(formData.email, formData.password, {
        name: formData.name,
        role: formData.role,
        phone: formData.phone,
        location: formData.location,
        bio: formData.bio,
        companyName: formData.companyName,
        workType: formData.workType,
        skills: formData.skills,
        experience: formData.experience,
        hourlyRate: formData.hourlyRate,
        portfolioUrl: formData.portfolioUrl,
        education: formData.education,
        availability: formData.availability
      });
      
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      
      // Redirect to role-specific dashboard
      if (user.role === 'client') {
        navigate('/client/dashboard');
      } else if (user.role === 'freelancer') {
        navigate('/freelancer/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Google sign-in failed:', err);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen bg-dark-primary flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4 shadow-glow">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Mini<span className="text-primary-400">Freelance</span>
          </h1>
          <p className="text-text-secondary">Create your account and start your journey</p>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-dark-secondary border border-gray-800 rounded-2xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                I want to work as a
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'client' }))}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    formData.role === 'client'
                      ? 'border-primary-500 bg-primary-500/10'
                      : 'border-gray-600 bg-dark-tertiary hover:border-gray-500'
                  }`}
                >
                  <User className="w-6 h-6 mx-auto mb-2 text-primary-400" />
                  <h3 className="font-medium text-text-primary">Client</h3>
                  <p className="text-xs text-text-secondary mt-1">Post jobs and hire talent</p>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'freelancer' }))}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    formData.role === 'freelancer'
                      ? 'border-primary-500 bg-primary-500/10'
                      : 'border-gray-600 bg-dark-tertiary hover:border-gray-500'
                  }`}
                >
                  <Briefcase className="w-6 h-6 mx-auto mb-2 text-primary-400" />
                  <h3 className="font-medium text-text-primary">Freelancer</h3>
                  <p className="text-xs text-text-secondary mt-1">Find work and earn money</p>
                </button>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-3 bg-dark-tertiary border rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 ${
                    errors.name ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="John Doe"
                  disabled={isLoading}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-3 bg-dark-tertiary border rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 ${
                      errors.email ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="john@example.com"
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-10 py-3 bg-dark-tertiary border rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 ${
                      errors.password ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Min. 8 characters"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-300" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400 hover:text-gray-300" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-10 py-3 bg-dark-tertiary border rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Confirm password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-300" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400 hover:text-gray-300" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-3 bg-dark-tertiary border border-gray-600 rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200"
                    placeholder="+1 (555) 123-4567"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-text-primary mb-2">
                  Location
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-3 bg-dark-tertiary border border-gray-600 rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200"
                    placeholder="City, Country"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-text-primary mb-2">
                Bio/Description
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-3 bg-dark-tertiary border border-gray-600 rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 resize-none"
                placeholder="Tell us about yourself..."
                disabled={isLoading}
              />
            </div>

            {/* Role-specific fields */}
            {formData.role === 'client' ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-text-primary mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className={`w-full px-3 py-3 bg-dark-tertiary border rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 ${
                      errors.companyName ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Acme Corporation"
                    disabled={isLoading}
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-sm text-red-400">{errors.companyName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="workType" className="block text-sm font-medium text-text-primary mb-2">
                    Work Type
                  </label>
                  <input
                    type="text"
                    id="workType"
                    name="workType"
                    value={formData.workType}
                    onChange={handleChange}
                    className={`w-full px-3 py-3 bg-dark-tertiary border rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 ${
                      errors.workType ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Web Development, Design, etc."
                    disabled={isLoading}
                  />
                  {errors.workType && (
                    <p className="mt-1 text-sm text-red-400">{errors.workType}</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Skills
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      className="flex-1 px-3 py-3 bg-dark-tertiary border border-gray-600 rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200"
                      placeholder="Add a skill and press Enter"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={addSkill}
                      className="px-4 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors duration-200"
                      disabled={isLoading}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-500/15 text-primary-400 rounded-full text-sm border border-primary-500/25"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="hover:text-primary-300 transition-colors"
                          disabled={isLoading}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  {errors.skills && (
                    <p className="mt-1 text-sm text-red-400">{errors.skills}</p>
                  )}
                </div>

                {/* Experience and Rate */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-text-primary mb-2">
                      Experience Level
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-3 py-3 bg-dark-tertiary border border-gray-600 rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200"
                      style={{ colorScheme: 'dark' }}
                      disabled={isLoading}
                    >
                      <option value="beginner">Beginner (0-2 years)</option>
                      <option value="intermediate">Intermediate (2-5 years)</option>
                      <option value="advanced">Advanced (5-10 years)</option>
                      <option value="expert">Expert (10+ years)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="hourlyRate" className="block text-sm font-medium text-text-primary mb-2">
                      Hourly Rate ($)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="hourlyRate"
                        name="hourlyRate"
                        value={formData.hourlyRate}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-3 bg-dark-tertiary border rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 ${
                          errors.hourlyRate ? 'border-red-500' : 'border-gray-600'
                        }`}
                        placeholder="50"
                        disabled={isLoading}
                      />
                    </div>
                    {errors.hourlyRate && (
                      <p className="mt-1 text-sm text-red-400">{errors.hourlyRate}</p>
                    )}
                  </div>
                </div>

                {/* Portfolio and Education */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="portfolioUrl" className="block text-sm font-medium text-text-primary mb-2">
                      Portfolio URL
                    </label>
                    <input
                      type="url"
                      id="portfolioUrl"
                      name="portfolioUrl"
                      value={formData.portfolioUrl}
                      onChange={handleChange}
                      className="w-full px-3 py-3 bg-dark-tertiary border border-gray-600 rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200"
                      placeholder="https://yourportfolio.com"
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label htmlFor="education" className="block text-sm font-medium text-text-primary mb-2">
                      Education
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <GraduationCap className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="education"
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-3 bg-dark-tertiary border border-gray-600 rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200"
                        placeholder="Bachelor's in Computer Science"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/25 rounded-lg p-3"
              >
                <p className="text-sm text-red-400">{error}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Google Sign In */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-dark-secondary text-text-secondary">Or sign up with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-dark-tertiary border border-gray-600 text-text-primary font-medium rounded-xl hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Chrome className="w-5 h-5" />
              Sign up with Google
            </button>
          </form>
        </motion.div>

        {/* Login Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mt-6"
        >
          <p className="text-text-secondary">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary-400 hover:text-primary-300 font-medium transition-colors duration-200"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterFirebase;
