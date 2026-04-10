import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Shield, Trash2, Briefcase, Code,
  Save, Eye, EyeOff, CheckCircle, AlertTriangle,
  Globe, DollarSign, Clock, ChevronRight, Plus, X, Bell, Star
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const FreelancerSettings = () => {
  const { user, updateUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [saveStatus, setSaveStatus] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');
  const [newSkill, setNewSkill] = useState('');

  // Profile form state
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    phone: user?.phone || '',
  });

  // Professional Profile state
  const [professionalData, setProfessionalData] = useState({
    skills: user?.skills || [],
    experience: user?.experience || '',
    hourlyRate: user?.hourlyRate || '',
    portfolio: user?.portfolio || '',
    availability: user?.availability || 'available',
    title: user?.title || '',
  });

  // Job Alerts state
  const [jobAlerts, setJobAlerts] = useState({
    preferredCategories: user?.preferredCategories || [],
    minBudget: user?.minBudget || '',
    locationPref: user?.locationPref || 'remote',
    emailAlerts: user?.emailAlerts !== false,
    bidAlerts: user?.bidAlerts !== false,
    messageAlerts: user?.messageAlerts !== false,
    weeklyDigest: user?.weeklyDigest !== false,
  });

  // Re-sync all form data whenever user identity changes (e.g. fresh login after signup)
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        phone: user.phone || '',
      });
      setProfessionalData({
        skills: user.skills || [],
        experience: user.experience || '',
        hourlyRate: user.hourlyRate || '',
        portfolio: user.portfolio || '',
        availability: user.availability || 'available',
        title: user.title || '',
      });
      setJobAlerts(prev => ({
        ...prev,
        preferredCategories: user.preferredCategories || [],
        minBudget: user.minBudget || '',
        locationPref: user.locationPref || 'remote',
        emailAlerts: user.emailAlerts !== false,
        bidAlerts: user.bidAlerts !== false,
        messageAlerts: user.messageAlerts !== false,
        weeklyDigest: user.weeklyDigest !== false,
      }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);



  // Security form state
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [securityErrors, setSecurityErrors] = useState({});

  const tabs = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'professional', label: 'Professional Profile', icon: Code },
    { id: 'jobAlerts', label: 'Job Alerts', icon: Bell },
    { id: 'security', label: 'Account Security', icon: Shield },
    { id: 'delete', label: 'Delete Account', icon: Trash2, danger: true },
  ];

  const handleSave = (section) => {
    setSaveStatus('saving');
    setTimeout(() => {
      switch (section) {
        case 'profile':
          updateUser(profileData);
          break;
        case 'professional':
          updateUser(professionalData);
          break;
        case 'jobAlerts':
          updateUser(jobAlerts);
          break;
        case 'security':
          const errors = {};
          if (!securityData.currentPassword) errors.currentPassword = 'Current password is required';
          if (!securityData.newPassword) errors.newPassword = 'New password is required';
          if (securityData.newPassword.length < 6 && securityData.newPassword) errors.newPassword = 'Minimum 6 characters';
          if (securityData.newPassword !== securityData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
          if (Object.keys(errors).length > 0) {
            setSecurityErrors(errors);
            setSaveStatus(null);
            return;
          }
          setSecurityErrors({});
          setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' });
          break;
        default:
          break;
      }
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 2000);
    }, 800);
  };

  const addSkill = () => {
    if (newSkill.trim() && !professionalData.skills.includes(newSkill.trim())) {
      setProfessionalData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfessionalData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  const categoryOptions = [
    'Web Development', 'Mobile Development', 'UI/UX Design', 'Graphic Design',
    'Data Science', 'Machine Learning', 'DevOps', 'Cloud Computing',
    'Content Writing', 'Digital Marketing', 'SEO', 'Video Editing'
  ];

  const toggleCategory = (cat) => {
    setJobAlerts(prev => ({
      ...prev,
      preferredCategories: prev.preferredCategories.includes(cat)
        ? prev.preferredCategories.filter(c => c !== cat)
        : [...prev.preferredCategories, cat]
    }));
  };

  const handleDeleteAccount = () => {
    if (deleteInput === 'DELETE') {
      localStorage.clear();
      logout();
    }
  };

  const inputClass = "w-full px-4 py-3 bg-dark-secondary border border-gray-700 rounded-xl text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 outline-none";
  const selectClass = "w-full px-4 py-3 bg-dark-secondary border border-gray-700 rounded-xl text-text-primary focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 outline-none";
  const labelClass = "block text-sm font-medium text-text-secondary mb-2";

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-text-primary mb-1">Profile Settings</h3>
        <p className="text-sm text-text-muted">Manage your personal information</p>
      </div>

      {/* Avatar Section */}
      <div className="flex items-center gap-5 p-5 bg-dark-secondary/50 rounded-2xl border border-gray-700/50">
        <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center shadow-glow flex-shrink-0">
          <span className="text-2xl font-bold text-white">
            {profileData.name ? profileData.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : 'U'}
          </span>
        </div>
        <div>
          <p className="text-text-primary font-medium">{profileData.name || 'Your Name'}</p>
          <p className="text-sm text-text-muted">{profileData.email}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-primary-400">Freelancer Account</span>
            {professionalData.availability === 'available' && (
              <span className="inline-flex items-center gap-1 text-xs text-green-400">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                Available
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Full Name</label>
          <input
            type="text"
            value={profileData.name}
            onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
            className={inputClass}
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <label className={labelClass}>Email Address</label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
            className={inputClass}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className={labelClass}>Phone Number</label>
          <input
            type="tel"
            value={profileData.phone}
            onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
            className={inputClass}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div>
          <label className={labelClass}>Professional Title</label>
          <input
            type="text"
            value={professionalData.title}
            onChange={(e) => setProfessionalData(prev => ({ ...prev, title: e.target.value }))}
            className={inputClass}
            placeholder="e.g. Full Stack Developer"
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Bio / About</label>
        <textarea
          value={profileData.bio}
          onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
          className={`${inputClass} resize-none`}
          rows={4}
          placeholder="Tell clients about yourself, your expertise, and what makes you stand out..."
        />
      </div>

      <div className="flex justify-end">
        <SaveButton onClick={() => handleSave('profile')} status={saveStatus} />
      </div>
    </div>
  );

  const renderProfessionalProfile = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-text-primary mb-1">Professional Profile</h3>
        <p className="text-sm text-text-muted">Showcase your skills and experience to clients</p>
      </div>

      {/* Skills */}
      <div className="p-5 bg-dark-secondary/50 rounded-2xl border border-gray-700/50">
        <label className="block text-sm font-semibold text-text-primary mb-3">
          <Code className="inline w-4 h-4 mr-1.5 text-primary-400" />
          Skills
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            className={`${inputClass} flex-1`}
            placeholder="Add a skill and press Enter"
          />
          <motion.button
            type="button"
            onClick={addSkill}
            className="px-4 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Plus className="w-4 h-4" />
            Add
          </motion.button>
        </div>
        {professionalData.skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {professionalData.skills.map((skill) => (
              <motion.span
                key={skill}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-500/15 text-primary-400 rounded-full text-sm border border-primary-500/25"
              >
                {skill}
                <button onClick={() => removeSkill(skill)} className="hover:text-primary-300 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </motion.span>
            ))}
          </div>
        )}
        {professionalData.skills.length === 0 && (
          <p className="text-xs text-text-muted">Add your skills to help clients find you</p>
        )}
      </div>

      {/* Experience & Rate */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-5 bg-dark-secondary/50 rounded-2xl border border-gray-700/50">
          <label className="block text-sm font-semibold text-text-primary mb-3">
            <Briefcase className="inline w-4 h-4 mr-1.5 text-primary-400" />
            Experience Level
          </label>
          <select
            value={professionalData.experience}
            onChange={(e) => setProfessionalData(prev => ({ ...prev, experience: e.target.value }))}
            className={selectClass}
            style={{ colorScheme: 'dark' }}
          >
            <option value="" className="bg-dark-secondary">Select level</option>
            <option value="beginner" className="bg-dark-secondary">Beginner (0-2 years)</option>
            <option value="intermediate" className="bg-dark-secondary">Intermediate (2-5 years)</option>
            <option value="advanced" className="bg-dark-secondary">Advanced (5-10 years)</option>
            <option value="expert" className="bg-dark-secondary">Expert (10+ years)</option>
          </select>
        </div>

        <div className="p-5 bg-dark-secondary/50 rounded-2xl border border-gray-700/50">
          <label className="block text-sm font-semibold text-text-primary mb-3">
            <DollarSign className="inline w-4 h-4 mr-1.5 text-primary-400" />
            Hourly Rate
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-medium">$</span>
            <input
              type="number"
              value={professionalData.hourlyRate}
              onChange={(e) => setProfessionalData(prev => ({ ...prev, hourlyRate: e.target.value }))}
              className={`${inputClass} pl-8`}
              placeholder="50"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted text-sm">/hr</span>
          </div>
        </div>
      </div>

      {/* Portfolio URL */}
      <div>
        <label className={labelClass}>
          <Globe className="inline w-4 h-4 mr-1.5 text-primary-400" />
          Portfolio URL
        </label>
        <input
          type="url"
          value={professionalData.portfolio}
          onChange={(e) => setProfessionalData(prev => ({ ...prev, portfolio: e.target.value }))}
          className={inputClass}
          placeholder="https://yourportfolio.com"
        />
      </div>

      {/* Availability Status */}
      <div className="p-5 bg-dark-secondary/50 rounded-2xl border border-gray-700/50">
        <label className="block text-sm font-semibold text-text-primary mb-3">
          <Clock className="inline w-4 h-4 mr-1.5 text-primary-400" />
          Availability Status
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'available', label: 'Available', color: 'green', emoji: '🟢' },
            { value: 'busy', label: 'Busy', color: 'yellow', emoji: '🟡' },
            { value: 'away', label: 'Away', color: 'red', emoji: '🔴' },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => setProfessionalData(prev => ({ ...prev, availability: opt.value }))}
              className={`p-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                professionalData.availability === opt.value
                  ? opt.color === 'green' ? 'bg-green-500/10 border-green-500/30 text-green-400'
                    : opt.color === 'yellow' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                  : 'border-gray-700 text-text-secondary hover:bg-dark-tertiary/50'
              }`}
            >
              {opt.emoji} {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <SaveButton onClick={() => handleSave('professional')} status={saveStatus} />
      </div>
    </div>
  );

  const renderJobAlerts = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-text-primary mb-1">Job Alerts & Notifications</h3>
        <p className="text-sm text-text-muted">Customize how you discover and get notified about jobs</p>
      </div>

      {/* Preferred Categories */}
      <div className="p-5 bg-dark-secondary/50 rounded-2xl border border-gray-700/50">
        <label className="block text-sm font-semibold text-text-primary mb-3">
          <Star className="inline w-4 h-4 mr-1.5 text-primary-400" />
          Preferred Job Categories
        </label>
        <p className="text-xs text-text-muted mb-3">Select categories to get tailored job recommendations</p>
        <div className="flex flex-wrap gap-2">
          {categoryOptions.map(cat => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 border ${
                jobAlerts.preferredCategories.includes(cat)
                  ? 'bg-primary-500/15 text-primary-400 border-primary-500/30'
                  : 'border-gray-700 text-text-secondary hover:bg-dark-tertiary/50 hover:text-text-primary'
              }`}
            >
              {jobAlerts.preferredCategories.includes(cat) && '✓ '}{cat}
            </button>
          ))}
        </div>
      </div>

      {/* Minimum Budget & Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-5 bg-dark-secondary/50 rounded-2xl border border-gray-700/50">
          <label className="block text-sm font-semibold text-text-primary mb-3">
            <DollarSign className="inline w-4 h-4 mr-1.5 text-primary-400" />
            Minimum Budget Filter
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">$</span>
            <input
              type="number"
              value={jobAlerts.minBudget}
              onChange={(e) => setJobAlerts(prev => ({ ...prev, minBudget: e.target.value }))}
              className={`${inputClass} pl-8`}
              placeholder="100"
            />
          </div>
          <p className="text-xs text-text-muted mt-2">Only show jobs above this budget</p>
        </div>

        <div className="p-5 bg-dark-secondary/50 rounded-2xl border border-gray-700/50">
          <label className="block text-sm font-semibold text-text-primary mb-3">
            <Globe className="inline w-4 h-4 mr-1.5 text-primary-400" />
            Location Preference
          </label>
          <select
            value={jobAlerts.locationPref}
            onChange={(e) => setJobAlerts(prev => ({ ...prev, locationPref: e.target.value }))}
            className={selectClass}
            style={{ colorScheme: 'dark' }}
          >
            <option value="remote" className="bg-dark-secondary">Remote Only</option>
            <option value="local" className="bg-dark-secondary">Local / On-site</option>
            <option value="hybrid" className="bg-dark-secondary">Hybrid</option>
            <option value="any" className="bg-dark-secondary">Any</option>
          </select>
        </div>
      </div>

      {/* Notification Toggles */}
      <div className="p-5 bg-dark-secondary/50 rounded-2xl border border-gray-700/50 space-y-4">
        <h4 className="text-sm font-semibold text-text-primary">
          <Bell className="inline w-4 h-4 mr-1.5 text-primary-400" />
          Notification Preferences
        </h4>
        {[
          { key: 'emailAlerts', label: 'Email alerts for new matching jobs', desc: 'Receive emails when jobs matching your skills are posted' },
          { key: 'bidAlerts', label: 'Bid status notifications', desc: 'Get notified when your bids are accepted, rejected, or countered' },
          { key: 'messageAlerts', label: 'Message notifications', desc: 'Receive alerts for new messages from clients' },
          { key: 'weeklyDigest', label: 'Weekly digest email', desc: 'A weekly summary of top jobs and your activity' },
        ].map(toggle => (
          <div key={toggle.key} className="flex items-center justify-between p-3 rounded-xl hover:bg-dark-tertiary/30 transition-colors">
            <div>
              <p className="text-sm text-text-primary font-medium">{toggle.label}</p>
              <p className="text-xs text-text-muted">{toggle.desc}</p>
            </div>
            <button
              onClick={() => setJobAlerts(prev => ({ ...prev, [toggle.key]: !prev[toggle.key] }))}
              className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${
                jobAlerts[toggle.key] ? 'bg-primary-500' : 'bg-gray-700'
              }`}
            >
              <motion.div
                className="w-5 h-5 bg-white rounded-full absolute top-1 shadow-md"
                animate={{ left: jobAlerts[toggle.key] ? 26 : 4 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <SaveButton onClick={() => handleSave('jobAlerts')} status={saveStatus} />
      </div>
    </div>
  );


  const renderSecurity = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-text-primary mb-1">Account Security</h3>
        <p className="text-sm text-text-muted">Manage your password and security settings</p>
      </div>

      <div className="p-5 bg-dark-secondary/50 rounded-2xl border border-gray-700/50 space-y-4">
        <h4 className="text-base font-semibold text-text-primary flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary-400" />
          Change Password
        </h4>
        <div>
          <label className={labelClass}>Current Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={securityData.currentPassword}
              onChange={(e) => setSecurityData(prev => ({ ...prev, currentPassword: e.target.value }))}
              className={`${inputClass} pr-10 ${securityErrors.currentPassword ? 'border-red-500' : ''}`}
              placeholder="Enter current password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {securityErrors.currentPassword && <p className="text-xs text-red-400 mt-1">{securityErrors.currentPassword}</p>}
        </div>
        <div>
          <label className={labelClass}>New Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={securityData.newPassword}
            onChange={(e) => setSecurityData(prev => ({ ...prev, newPassword: e.target.value }))}
            className={`${inputClass} ${securityErrors.newPassword ? 'border-red-500' : ''}`}
            placeholder="Enter new password (min 6 characters)"
          />
          {securityErrors.newPassword && <p className="text-xs text-red-400 mt-1">{securityErrors.newPassword}</p>}
        </div>
        <div>
          <label className={labelClass}>Confirm New Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={securityData.confirmPassword}
            onChange={(e) => setSecurityData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            className={`${inputClass} ${securityErrors.confirmPassword ? 'border-red-500' : ''}`}
            placeholder="Confirm new password"
          />
          {securityErrors.confirmPassword && <p className="text-xs text-red-400 mt-1">{securityErrors.confirmPassword}</p>}
        </div>
      </div>

      {/* Two-Factor Auth */}
      <div className="p-5 bg-dark-secondary/50 rounded-2xl border border-gray-700/50">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-base font-semibold text-text-primary">Two-Factor Authentication</h4>
            <p className="text-sm text-text-muted mt-1">Add an extra layer of security</p>
          </div>
          <div className="relative">
            <div className="w-12 h-7 bg-gray-700 rounded-full cursor-pointer transition-colors">
              <div className="w-5 h-5 bg-gray-500 rounded-full absolute top-1 left-1 transition-transform"></div>
            </div>
          </div>
        </div>
        <p className="text-xs text-text-muted mt-3 p-3 bg-dark-tertiary/50 rounded-lg border border-gray-700/30">
          🔒 Two-factor authentication will be available in a future update.
        </p>
      </div>

      <div className="flex justify-end">
        <SaveButton onClick={() => handleSave('security')} status={saveStatus} />
      </div>
    </div>
  );

  const renderDeleteAccount = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-red-400 mb-1">Delete Account</h3>
        <p className="text-sm text-text-muted">Permanently delete your account and all associated data</p>
      </div>

      <div className="p-6 bg-red-500/5 rounded-2xl border border-red-500/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-red-400">Danger Zone</h4>
            <p className="text-sm text-text-secondary mt-2">
              This action is <strong className="text-red-400">irreversible</strong>. Once you delete your account:
            </p>
            <ul className="text-sm text-text-muted mt-2 space-y-1 list-disc list-inside">
              <li>Your freelancer profile will be permanently removed</li>
              <li>All active bids and proposals will be cancelled</li>
              <li>Your portfolio and work history will be deleted</li>
              <li>Pending earnings will be forfeited</li>
              <li>Client reviews and ratings will be erased</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-red-500/20">
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-6 py-2.5 bg-red-500/10 text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/20 transition-colors text-sm font-medium"
            >
              I want to delete my account
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-3"
            >
              <p className="text-sm text-red-400 font-medium">
                Type <strong>DELETE</strong> to confirm account deletion:
              </p>
              <input
                type="text"
                value={deleteInput}
                onChange={(e) => setDeleteInput(e.target.value)}
                className="w-full px-4 py-3 bg-dark-secondary border border-red-500/30 rounded-xl text-text-primary placeholder-text-muted focus:ring-2 focus:ring-red-500/50 outline-none"
                placeholder="Type DELETE here..."
              />
              <div className="flex gap-3">
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleteInput !== 'DELETE'}
                  className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    deleteInput === 'DELETE'
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Delete My Account
                </button>
                <button
                  onClick={() => { setShowDeleteConfirm(false); setDeleteInput(''); }}
                  className="px-6 py-2.5 bg-dark-tertiary text-text-secondary rounded-xl hover:text-text-primary text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-primary">Settings</h2>
        <p className="text-text-secondary mt-1">Manage your account, skills, and preferences</p>
      </div>

      <div className="flex gap-6">
        {/* Settings Sidebar */}
        <div className="w-64 flex-shrink-0">
          <nav className="space-y-1 sticky top-6">
            {tabs.map(tab => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? tab.danger
                      ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                      : 'bg-primary-500/10 text-primary-400 border border-primary-500/20'
                    : tab.danger
                      ? 'text-red-400/60 hover:bg-red-500/5 hover:text-red-400'
                      : 'text-text-secondary hover:bg-dark-secondary hover:text-text-primary'
                } border ${activeTab === tab.id ? '' : 'border-transparent'}`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                <ChevronRight className={`w-3.5 h-3.5 ml-auto transition-opacity ${activeTab === tab.id ? 'opacity-100' : 'opacity-0'}`} />
              </motion.button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 min-w-0">
          <div className="bg-dark-secondary/30 rounded-2xl border border-gray-800/50 p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'profile' && renderProfileSettings()}
                {activeTab === 'professional' && renderProfessionalProfile()}
                {activeTab === 'jobAlerts' && renderJobAlerts()}
                {activeTab === 'security' && renderSecurity()}
                {activeTab === 'delete' && renderDeleteAccount()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Save Button Component
const SaveButton = ({ onClick, status }) => (
  <motion.button
    onClick={onClick}
    disabled={status === 'saving'}
    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
      status === 'saved'
        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
        : status === 'saving'
          ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30 cursor-wait'
          : 'bg-primary-600 text-white hover:bg-primary-700 shadow-glow hover:shadow-glow-lg'
    }`}
    whileHover={status ? {} : { scale: 1.03 }}
    whileTap={status ? {} : { scale: 0.97 }}
  >
    {status === 'saved' ? (
      <>
        <CheckCircle className="w-4 h-4" />
        Saved!
      </>
    ) : status === 'saving' ? (
      <>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Save className="w-4 h-4" />
        </motion.div>
        Saving...
      </>
    ) : (
      <>
        <Save className="w-4 h-4" />
        Save Changes
      </>
    )}
  </motion.button>
);

export default FreelancerSettings;
