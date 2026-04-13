import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, RefreshCw, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { useFirebaseAuth } from '../firebase/FirebaseAuthContext';
import { useNavigate } from 'react-router-dom';
import { sendEmailVerification, reload } from 'firebase/auth';
import { auth } from '../firebase/firebase';

const VerifyEmail = () => {
  const { user, userProfile, logout } = useFirebaseAuth();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  // Redirect if no user
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Send verification email
  const handleResendEmail = async () => {
    if (countdown > 0 || !user) return;

    try {
      await sendEmailVerification(user);
      setCountdown(30);
      setMessage('Verification email sent successfully!');
      setMessageType('success');
      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      setMessage('Failed to send email. Please try again.');
      setMessageType('error');
      setTimeout(() => setMessage(null), 5000);
    }
  };

  // Check verification status
  const handleCheckVerification = async () => {
    if (!user) return;

    setIsChecking(true);
    setMessage(null);

    try {
      // Reload user to get latest emailVerified status
      await reload(auth.currentUser);
      const currentUser = auth.currentUser;

      if (currentUser.emailVerified) {
        setMessage('Email verified! Redirecting...');
        setMessageType('success');
        
        // Wait a moment then redirect based on role
        setTimeout(() => {
          const role = userProfile?.role;
          if (role === 'client') {
            navigate('/client/dashboard');
          } else if (role === 'freelancer') {
            navigate('/freelancer/dashboard');
          } else {
            navigate('/');
          }
        }, 1500);
      } else {
        setMessage('Email not verified yet. Please check your inbox and click the verification link.');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error checking verification status. Please try again.');
      setMessageType('error');
    } finally {
      setIsChecking(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-dark-primary flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-dark-secondary rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 bg-primary-500/20 rounded-full flex items-center justify-center"
            >
              <Mail className="w-10 h-10 text-primary-400" />
            </motion.div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-text-primary text-center mb-2">
            Verify your email to continue
          </h1>

          {/* Description */}
          <p className="text-text-secondary text-center mb-6">
            We have sent a verification link to your email address
          </p>

          {/* Email Display */}
          <div className="bg-dark-tertiary rounded-xl p-4 mb-6 border border-gray-700">
            <p className="text-text-muted text-sm mb-1">Sent to:</p>
            <p className="text-text-primary font-medium truncate">{user.email}</p>
          </div>

          {/* Message Display */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${
                messageType === 'success'
                  ? 'bg-green-500/10 border border-green-500/30'
                  : 'bg-red-500/10 border border-red-500/30'
              }`}
            >
              {messageType === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              )}
              <p className={`text-sm ${messageType === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {message}
              </p>
            </motion.div>
          )}

          {/* Primary Button - Check Verification */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCheckVerification}
            disabled={isChecking}
            className="w-full mb-4 py-3.5 px-6 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-700 
                       text-white rounded-xl font-medium transition-all duration-200
                       shadow-glow hover:shadow-glow-lg disabled:shadow-none
                       flex items-center justify-center gap-2"
          >
            {isChecking ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Checking...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                I have verified, continue
              </>
            )}
          </motion.button>

          {/* Secondary Button - Resend Email */}
          <motion.button
            whileHover={{ scale: countdown > 0 ? 1 : 1.02 }}
            whileTap={{ scale: countdown > 0 ? 1 : 0.98 }}
            onClick={handleResendEmail}
            disabled={countdown > 0}
            className="w-full mb-4 py-3.5 px-6 bg-dark-tertiary hover:bg-dark-tertiary/70 
                       disabled:bg-dark-tertiary/50 disabled:cursor-not-allowed
                       text-text-primary rounded-xl font-medium transition-all duration-200
                       border border-gray-700 hover:border-gray-600
                       flex items-center justify-center gap-2"
          >
            <RefreshCw className={`w-5 h-5 ${countdown > 0 ? '' : 'group-hover:rotate-180 transition-transform'}`} />
            {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Email'}
          </motion.button>

          {/* Logout Link */}
          <div className="text-center">
            <button
              onClick={handleLogout}
              className="text-text-muted hover:text-text-secondary text-sm transition-colors"
            >
              Use a different email? Log out
            </button>
          </div>
        </div>

        {/* Help Text */}
        <p className="text-text-muted text-sm text-center mt-6">
          Didn't receive the email? Check your spam folder or try resending.
        </p>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
