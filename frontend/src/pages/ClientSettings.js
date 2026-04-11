import React, { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import {

  User, Building2, Shield, Trash2, Briefcase,

  Save, Eye, EyeOff, CheckCircle, AlertTriangle,

  MapPin, Phone, Globe, FileText, DollarSign, Clock, ChevronRight

} from 'lucide-react';

import { useFirebaseAuth } from '../firebase/FirebaseAuthContext';



const ClientSettings = () => {

  const { user, userProfile, updateUserProfile, logout } = useFirebaseAuth();

  const [activeTab, setActiveTab] = useState('profile');

  const [saveStatus, setSaveStatus] = useState(null); // 'saving', 'saved', null

  const [showPassword, setShowPassword] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [deleteInput, setDeleteInput] = useState('');



  // Profile form state

  const [profileData, setProfileData] = useState({

    name: user?.name || '',

    email: user?.email || '',

    bio: user?.bio || '',

    phone: user?.phone || '',

  });



  // Company form state

  const [companyData, setCompanyData] = useState({

    companyName: user?.companyName || '',

    workType: user?.workType || '',

    location: user?.location || '',

    companyWebsite: user?.companyWebsite || '',

    companyDescription: user?.companyDescription || '',

  });



  // Security form state

  const [securityData, setSecurityData] = useState({

    currentPassword: '',

    newPassword: '',

    confirmPassword: '',

  });



  // Job Preferences state

  const [jobPreferences, setJobPreferences] = useState({

    defaultBudgetMin: user?.defaultBudgetMin || '500',

    defaultBudgetMax: user?.defaultBudgetMax || '5000',

    preferredExperience: user?.preferredExperience || 'any',

    autoCloseBids: user?.autoCloseBids || '7',

    preferredCategories: user?.preferredCategories || [],

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

      setCompanyData({

        companyName: user.companyName || '',

        workType: user.workType || '',

        location: user.location || '',

        companyWebsite: user.companyWebsite || '',

        companyDescription: user.companyDescription || '',

      });

      setJobPreferences(prev => ({

        ...prev,

        defaultBudgetMin: user.defaultBudgetMin || '500',

        defaultBudgetMax: user.defaultBudgetMax || '5000',

        preferredExperience: user.preferredExperience || 'any',

        autoCloseBids: user.autoCloseBids || '7',

        preferredCategories: user.preferredCategories || [],

      }));

    }

  // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [user?.email]);





  const [securityErrors, setSecurityErrors] = useState({});



  const tabs = [

    { id: 'profile', label: 'Profile Settings', icon: User },

    { id: 'company', label: 'Company Profile', icon: Building2 },

    { id: 'jobPrefs', label: 'Job Preferences', icon: Briefcase },

    { id: 'security', label: 'Account Security', icon: Shield },

    { id: 'delete', label: 'Delete Account', icon: Trash2, danger: true },

  ];



  const handleSave = (section) => {

    setSaveStatus('saving');

    setTimeout(() => {

      switch (section) {

        case 'profile':

          updateUserProfile(user.uid, profileData);

          break;

        case 'company':

          updateUserProfile(user.uid, companyData);

          break;

        case 'jobPrefs':

          updateUserProfile(user.uid, jobPreferences);

          break;

        case 'security':

          // Validate passwords

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



  const handleDeleteAccount = () => {

    if (deleteInput === 'DELETE') {

      localStorage.clear();

      logout();

    }

  };



  const workTypeOptions = [

    { value: 'technology', label: 'Technology & Software' },

    { value: 'design', label: 'Design & Creative' },

    { value: 'marketing', label: 'Marketing & Sales' },

    { value: 'writing', label: 'Writing & Content' },

    { value: 'consulting', label: 'Consulting & Business' },

    { value: 'other', label: 'Other' },

  ];



  const experienceOptions = [

    { value: 'any', label: 'Any Experience Level' },

    { value: 'beginner', label: 'Beginner (0-2 years)' },

    { value: 'intermediate', label: 'Intermediate (2-5 years)' },

    { value: 'advanced', label: 'Advanced (5-10 years)' },

    { value: 'expert', label: 'Expert (10+ years)' },

  ];



  const inputClass = "w-full px-4 py-3 bg-dark-secondary border border-gray-700 rounded-xl text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 outline-none";

  const selectClass = "w-full px-4 py-3 bg-dark-secondary border border-gray-700 rounded-xl text-text-primary focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 outline-none";

  const labelClass = "block text-sm font-medium text-text-secondary mb-2";



  const renderProfileSettings = () => (

    <div className="space-y-6">

      <div>

        <h3 className="text-xl font-semibold text-text-primary mb-1">Profile Settings</h3>

        <p className="text-sm text-text-muted">Manage your personal information and preferences</p>

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

          <p className="text-xs text-primary-400 mt-1">Client Account</p>

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

      </div>



      <div>

        <label className={labelClass}>Bio / About</label>

        <textarea

          value={profileData.bio}

          onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}

          className={`${inputClass} resize-none`}

          rows={4}

          placeholder="Tell us a bit about yourself..."

        />

      </div>



      <div className="flex justify-end">

        <SaveButton onClick={() => handleSave('profile')} status={saveStatus} />

      </div>

    </div>

  );



  const renderCompanyProfile = () => (

    <div className="space-y-6">

      <div>

        <h3 className="text-xl font-semibold text-text-primary mb-1">Company Profile</h3>

        <p className="text-sm text-text-muted">Manage your company information visible to freelancers</p>

      </div>



      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div>

          <label className={labelClass}>

            <Building2 className="inline w-4 h-4 mr-1.5 text-primary-400" />

            Company Name

          </label>

          <input

            type="text"

            value={companyData.companyName}

            onChange={(e) => setCompanyData(prev => ({ ...prev, companyName: e.target.value }))}

            className={inputClass}

            placeholder="Enter company name"

          />

        </div>

        <div>

          <label className={labelClass}>

            <FileText className="inline w-4 h-4 mr-1.5 text-primary-400" />

            Work Type

          </label>

          <select

            value={companyData.workType}

            onChange={(e) => setCompanyData(prev => ({ ...prev, workType: e.target.value }))}

            className={selectClass}

            style={{ colorScheme: 'dark' }}

          >

            <option value="" className="bg-dark-secondary">Select work type</option>

            {workTypeOptions.map(opt => (

              <option key={opt.value} value={opt.value} className="bg-dark-secondary">{opt.label}</option>

            ))}

          </select>

        </div>

        <div>

          <label className={labelClass}>

            <MapPin className="inline w-4 h-4 mr-1.5 text-primary-400" />

            Location

          </label>

          <input

            type="text"

            value={companyData.location}

            onChange={(e) => setCompanyData(prev => ({ ...prev, location: e.target.value }))}

            className={inputClass}

            placeholder="City, Country"

          />

        </div>

        <div>

          <label className={labelClass}>

            <Globe className="inline w-4 h-4 mr-1.5 text-primary-400" />

            Company Website

          </label>

          <input

            type="url"

            value={companyData.companyWebsite}

            onChange={(e) => setCompanyData(prev => ({ ...prev, companyWebsite: e.target.value }))}

            className={inputClass}

            placeholder="https://yourcompany.com"

          />

        </div>

      </div>



      <div>

        <label className={labelClass}>Company Description</label>

        <textarea

          value={companyData.companyDescription}

          onChange={(e) => setCompanyData(prev => ({ ...prev, companyDescription: e.target.value }))}

          className={`${inputClass} resize-none`}

          rows={4}

          placeholder="Describe your company, services, and what you're looking for..."

        />

      </div>



      <div className="flex justify-end">

        <SaveButton onClick={() => handleSave('company')} status={saveStatus} />

      </div>

    </div>

  );



  const renderJobPreferences = () => (

    <div className="space-y-6">

      <div>

        <h3 className="text-xl font-semibold text-text-primary mb-1">Job Preferences</h3>

        <p className="text-sm text-text-muted">Set default preferences for your job postings</p>

      </div>



      {/* Default Budget Range */}

      <div className="p-5 bg-dark-secondary/50 rounded-2xl border border-gray-700/50">

        <label className="block text-sm font-semibold text-text-primary mb-4">

          <DollarSign className="inline w-4 h-4 mr-1.5 text-primary-400" />

          Default Budget Range

        </label>

        <div className="grid grid-cols-2 gap-4">

          <div>

            <label className="block text-xs text-text-muted mb-1.5">Minimum ($)</label>

            <input

              type="number"

              value={jobPreferences.defaultBudgetMin}

              onChange={(e) => setJobPreferences(prev => ({ ...prev, defaultBudgetMin: e.target.value }))}

              className={inputClass}

              placeholder="500"

            />

          </div>

          <div>

            <label className="block text-xs text-text-muted mb-1.5">Maximum ($)</label>

            <input

              type="number"

              value={jobPreferences.defaultBudgetMax}

              onChange={(e) => setJobPreferences(prev => ({ ...prev, defaultBudgetMax: e.target.value }))}

              className={inputClass}

              placeholder="5000"

            />

          </div>

        </div>

      </div>



      {/* Preferred Experience Level */}

      <div className="p-5 bg-dark-secondary/50 rounded-2xl border border-gray-700/50">

        <label className="block text-sm font-semibold text-text-primary mb-3">

          <Briefcase className="inline w-4 h-4 mr-1.5 text-primary-400" />

          Preferred Freelancer Experience Level

        </label>

        <div className="space-y-2">

          {experienceOptions.map(opt => (

            <label

              key={opt.value}

              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border ${

                jobPreferences.preferredExperience === opt.value

                  ? 'bg-primary-500/10 border-primary-500/30 text-primary-400'

                  : 'border-transparent hover:bg-dark-tertiary/50 text-text-secondary'

              }`}

            >

              <input

                type="radio"

                name="preferredExperience"

                value={opt.value}

                checked={jobPreferences.preferredExperience === opt.value}

                onChange={(e) => setJobPreferences(prev => ({ ...prev, preferredExperience: e.target.value }))}

                className="sr-only"

              />

              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${

                jobPreferences.preferredExperience === opt.value

                  ? 'border-primary-400'

                  : 'border-gray-600'

              }`}>

                {jobPreferences.preferredExperience === opt.value && (

                  <div className="w-2 h-2 rounded-full bg-primary-400"></div>

                )}

              </div>

              <span className="text-sm">{opt.label}</span>

            </label>

          ))}

        </div>

      </div>



      {/* Auto-close Bids */}

      <div className="p-5 bg-dark-secondary/50 rounded-2xl border border-gray-700/50">

        <label className="block text-sm font-semibold text-text-primary mb-3">

          <Clock className="inline w-4 h-4 mr-1.5 text-primary-400" />

          Auto-close Bids After

        </label>

        <select

          value={jobPreferences.autoCloseBids}

          onChange={(e) => setJobPreferences(prev => ({ ...prev, autoCloseBids: e.target.value }))}

          className={selectClass}

          style={{ colorScheme: 'dark' }}

        >

          <option value="3" className="bg-dark-secondary">3 days</option>

          <option value="7" className="bg-dark-secondary">7 days</option>

          <option value="14" className="bg-dark-secondary">14 days</option>

          <option value="30" className="bg-dark-secondary">30 days</option>

          <option value="never" className="bg-dark-secondary">Never</option>

        </select>

        <p className="text-xs text-text-muted mt-2">Automatically stop accepting bids after this duration</p>

      </div>



      <div className="flex justify-end">

        <SaveButton onClick={() => handleSave('jobPrefs')} status={saveStatus} />

      </div>

    </div>

  );



  const renderSecurity = () => (

    <div className="space-y-6">

      <div>

        <h3 className="text-xl font-semibold text-text-primary mb-1">Account Security</h3>

        <p className="text-sm text-text-muted">Manage your password and security settings</p>

      </div>



      {/* Change Password */}

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

            <p className="text-sm text-text-muted mt-1">Add an extra layer of security to your account</p>

          </div>

          <div className="relative">

            <div className="w-12 h-7 bg-gray-700 rounded-full cursor-pointer transition-colors">

              <div className="w-5 h-5 bg-gray-500 rounded-full absolute top-1 left-1 transition-transform"></div>

            </div>

          </div>

        </div>

        <p className="text-xs text-text-muted mt-3 p-3 bg-dark-tertiary/50 rounded-lg border border-gray-700/30">

          🔒 Two-factor authentication will be available in a future update. Stay tuned!

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

              <li>All your job postings will be permanently removed</li>

              <li>Active bids and contracts will be cancelled</li>

              <li>Your profile and company info will be deleted</li>

              <li>Payment history and invoices will be erased</li>

              <li>You will not be able to recover any data</li>

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

        <p className="text-text-secondary mt-1">Manage your account preferences and configurations</p>

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

                {activeTab === 'company' && renderCompanyProfile()}

                {activeTab === 'jobPrefs' && renderJobPreferences()}

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



export default ClientSettings;

