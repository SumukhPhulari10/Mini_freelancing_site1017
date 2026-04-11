import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, Search, ChevronDown, LogOut, Settings, CheckCheck,
  Briefcase, MapPin, Mail, Star, Clock, User, Building2,
  Code2, Award, Zap
} from 'lucide-react';
import { useFirebaseAuth } from '../firebase/FirebaseAuthContext';
import { useNavigate } from 'react-router-dom';

// Format time ago
const timeAgo = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

// Get user initials
const getInitials = (name) => {
  if (!name) return 'U';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
};

// Work type label mapping
const WORK_TYPE_LABELS = {
  technology: 'Technology & Software',
  design: 'Design & Creative',
  marketing: 'Marketing & Sales',
  writing: 'Writing & Content',
  consulting: 'Consulting & Business',
  other: 'Other Industry'
};

// Experience label mapping
const EXPERIENCE_LABELS = {
  beginner: 'Beginner (0–2 yrs)',
  intermediate: 'Intermediate (2–5 yrs)',
  advanced: 'Advanced (5–10 yrs)',
  expert: 'Expert (10+ yrs)'
};

// ─── Client Profile Details ───────────────────────────────────
const ClientDetails = ({ user }) => (
  <div className="space-y-2.5">
    {/* Company */}
    {user?.companyName && (
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 bg-blue-500/15 rounded-lg flex items-center justify-center flex-shrink-0">
          <Building2 className="w-3.5 h-3.5 text-blue-400" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] text-text-muted uppercase tracking-wider leading-none mb-0.5">Company</p>
          <p className="text-sm text-text-primary font-medium truncate">{user.companyName}</p>
        </div>
      </div>
    )}

    {/* Work Type / Industry */}
    {user?.workType && (
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 bg-primary-500/15 rounded-lg flex items-center justify-center flex-shrink-0">
          <Briefcase className="w-3.5 h-3.5 text-primary-400" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] text-text-muted uppercase tracking-wider leading-none mb-0.5">Industry</p>
          <p className="text-sm text-text-secondary truncate">{WORK_TYPE_LABELS[user.workType] || user.workType}</p>
        </div>
      </div>
    )}

    {/* City / Location */}
    {user?.location && (
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 bg-green-500/15 rounded-lg flex items-center justify-center flex-shrink-0">
          <MapPin className="w-3.5 h-3.5 text-green-400" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] text-text-muted uppercase tracking-wider leading-none mb-0.5">Location</p>
          <p className="text-sm text-text-secondary truncate">{user.location}</p>
        </div>
      </div>
    )}

    {/* Email */}
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 bg-yellow-500/15 rounded-lg flex items-center justify-center flex-shrink-0">
        <Mail className="w-3.5 h-3.5 text-yellow-400" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] text-text-muted uppercase tracking-wider leading-none mb-0.5">Email</p>
        <p className="text-sm text-text-secondary truncate">{user?.email}</p>
      </div>
    </div>
  </div>
);

// ─── Freelancer Profile Details ───────────────────────────────
const FreelancerDetails = ({ user }) => (
  <div className="space-y-2.5">
    {/* Skills */}
    {user?.skills && user.skills.length > 0 && (
      <div className="flex items-start gap-3">
        <div className="w-7 h-7 bg-primary-500/15 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
          <Code2 className="w-3.5 h-3.5 text-primary-400" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] text-text-muted uppercase tracking-wider leading-none mb-1.5">Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {user.skills.slice(0, 4).map((skill, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-primary-500/15 text-primary-400 text-xs rounded-full border border-primary-500/25 font-medium"
              >
                {skill}
              </span>
            ))}
            {user.skills.length > 4 && (
              <span className="px-2 py-0.5 bg-gray-700/50 text-text-muted text-xs rounded-full border border-gray-600/30">
                +{user.skills.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>
    )}

    {/* Experience */}
    {user?.experience && (
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 bg-green-500/15 rounded-lg flex items-center justify-center flex-shrink-0">
          <Award className="w-3.5 h-3.5 text-green-400" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] text-text-muted uppercase tracking-wider leading-none mb-0.5">Experience</p>
          <p className="text-sm text-text-secondary">{EXPERIENCE_LABELS[user.experience] || user.experience}</p>
        </div>
      </div>
    )}

    {/* Hourly Rate */}
    {user?.hourlyRate && (
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 bg-yellow-500/15 rounded-lg flex items-center justify-center flex-shrink-0">
          <Zap className="w-3.5 h-3.5 text-yellow-400" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] text-text-muted uppercase tracking-wider leading-none mb-0.5">Hourly Rate</p>
          <p className="text-sm text-text-secondary font-medium">${user.hourlyRate}/hr</p>
        </div>
      </div>
    )}

    {/* Email */}
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 bg-blue-500/15 rounded-lg flex items-center justify-center flex-shrink-0">
        <Mail className="w-3.5 h-3.5 text-blue-400" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] text-text-muted uppercase tracking-wider leading-none mb-0.5">Email</p>
        <p className="text-sm text-text-secondary truncate">{user?.email}</p>
      </div>
    </div>
  </div>
);

// ─── Main Topbar ──────────────────────────────────────────────
const Topbar = () => {
  const { user, userProfile, logout, notifications, unreadCount, markNotificationRead, markAllNotificationsRead } = useFirebaseAuth();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const profileRef = useRef(null);
  const notifRef = useRef(null);
  const navigate = useNavigate();

  const isClient = userProfile?.role === 'client';
  const isFreelancer = userProfile?.role === 'freelancer';

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.div
      className="bg-dark-secondary border-b border-gray-800 relative z-50"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-6 py-3.5">
        <div className="flex items-center justify-between">

          {/* Search Bar */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-2 bg-dark-primary/60 border border-gray-700/60 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/40 text-text-primary placeholder-text-muted transition-all"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3 ml-6">

            {/* Notifications Bell */}
            <div ref={notifRef} className="relative">
              <motion.button
                className="relative p-2 text-text-secondary hover:text-text-primary hover:bg-dark-tertiary/60 rounded-xl transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileDropdown(false);
                }}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white px-1">
                    {unreadCount}
                  </span>
                )}
              </motion.button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-2 w-96 bg-dark-secondary border border-gray-700/60 rounded-2xl shadow-2xl overflow-hidden"
                  >
                    {/* Header */}
                    <div className="px-5 py-3.5 border-b border-gray-700/50 flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-text-primary">Notifications</h3>
                        {unreadCount > 0 && (
                          <p className="text-xs text-text-muted mt-0.5">{unreadCount} unread</p>
                        )}
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllNotificationsRead}
                          className="text-xs text-primary-400 hover:text-primary-300 font-medium flex items-center gap-1"
                        >
                          <CheckCheck className="w-3.5 h-3.5" />
                          Mark all read
                        </button>
                      )}
                    </div>

                    {/* List */}
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="py-10 text-center">
                          <Bell className="w-8 h-8 text-text-muted mx-auto mb-2" />
                          <p className="text-text-muted text-sm">No notifications yet</p>
                        </div>
                      ) : notifications.map((notif) => (
                        <motion.div
                          key={notif.id}
                          className={`px-5 py-3 border-b border-gray-800/50 cursor-pointer hover:bg-dark-tertiary/40 transition-colors ${!notif.read ? 'bg-primary-500/5' : ''}`}
                          onClick={() => markNotificationRead(notif.id)}
                          whileHover={{ x: 3 }}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-base flex-shrink-0 mt-0.5">{notif.icon}</span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className={`text-sm font-medium truncate ${!notif.read ? 'text-text-primary' : 'text-text-secondary'}`}>
                                  {notif.title}
                                </p>
                                {!notif.read && (
                                  <div className="w-1.5 h-1.5 bg-primary-400 rounded-full flex-shrink-0 animate-pulse" />
                                )}
                              </div>
                              <p className="text-xs text-text-muted mt-0.5 line-clamp-2">{notif.message}</p>
                              <p className="text-[10px] text-text-muted mt-1 flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5" />
                                {timeAgo(notif.time)}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                      <div className="px-5 py-2.5 border-t border-gray-700/50 text-center">
                        <button className="text-xs text-primary-400 hover:text-primary-300 font-medium">
                          View all notifications
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile Button */}
            <div ref={profileRef} className="relative">
              <button
                onClick={() => {
                  setShowProfileDropdown(!showProfileDropdown);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2.5 hover:bg-dark-tertiary/50 rounded-xl px-3 py-1.5 transition-colors cursor-pointer"
              >
                {/* Avatar */}
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shadow-glow flex-shrink-0 ${
                    isClient ? 'bg-blue-500' : 'bg-primary-500'
                  }`}
                  whileHover={{ scale: 1.08 }}
                >
                  <span className="text-xs font-bold text-white">{getInitials(userProfile?.name)}</span>
                </motion.div>

                {/* Name & Role */}
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-text-primary leading-tight">{userProfile?.name || 'User'}</p>
                  <p className="text-xs text-text-muted capitalize leading-tight">{userProfile?.role}</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-text-muted transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {showProfileDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-2 w-80 bg-dark-secondary border border-gray-700/60 rounded-2xl shadow-2xl overflow-hidden"
                  >
                    {/* ── Header: Avatar + Name + Role Badge ── */}
                    <div className={`px-5 py-4 border-b border-gray-700/50 ${
                      isClient
                        ? 'bg-gradient-to-br from-blue-600/20 to-dark-secondary'
                        : 'bg-gradient-to-br from-primary-600/20 to-dark-secondary'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                          isClient ? 'bg-blue-500' : 'bg-primary-500'
                        }`}>
                          <span className="text-base font-bold text-white">{getInitials(userProfile?.name)}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-base font-bold text-text-primary truncate">{userProfile?.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full uppercase tracking-wide ${
                              isClient
                                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                : 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                            }`}>
                              {isClient ? <Building2 className="w-2.5 h-2.5" /> : <Code2 className="w-2.5 h-2.5" />}
                              {userProfile?.role}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ── Role-specific details ── */}
                    <div className="px-5 py-4 border-b border-gray-700/50">
                      <p className="text-[10px] text-text-muted uppercase tracking-widest font-semibold mb-3">
                        {isClient ? '🏢 Client Profile' : '💼 Freelancer Profile'}
                      </p>

                      {isClient && <ClientDetails user={userProfile} />}
                      {isFreelancer && <FreelancerDetails user={userProfile} />}
                    </div>

                    {/* ── Actions ── */}
                    <div className="px-2 py-2">
                      {isFreelancer && (
                        <button
                          onClick={() => { navigate('/freelancer/profile'); setShowProfileDropdown(false); }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-dark-tertiary/50 rounded-xl transition-colors"
                        >
                          <User className="w-4 h-4" />
                          View My Profile
                        </button>
                      )}
                      <button
                        onClick={() => {
                          navigate(isClient ? '/client/settings' : '/freelancer/settings');
                          setShowProfileDropdown(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-dark-tertiary/50 rounded-xl transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                      <div className="border-t border-gray-700/50 my-1" />
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Topbar;
