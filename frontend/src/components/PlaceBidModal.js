import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, Clock, FileText, MapPin, Briefcase } from 'lucide-react';
import Button from './Button';

const PlaceBidModal = ({ job, onClose, onSubmit }) => {
  const [bidAmount, setBidAmount] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const bidData = {
        id: `local-bid-${Date.now()}`,
        jobId: job.id,
        jobTitle: job.title,
        company: job.company || 'Unknown Company',
        location: job.location || 'Remote',
        duration: job.duration || 'TBD',
        budget: job.budget,
        description: job.description || '',
        skills: job.skills || [],
        bidAmount: parseFloat(bidAmount),
        deliveryTime,
        coverLetter,
        status: 'pending',
        submittedAt: new Date().toISOString(),
      };

      // Save to localStorage
      const existing = JSON.parse(localStorage.getItem('myBids') || '[]');
      localStorage.setItem('myBids', JSON.stringify([bidData, ...existing]));

      onSubmit(bidData);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-dark-secondary border border-gray-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-dark-secondary border-b border-gray-700/60 p-6 rounded-t-2xl">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-text-primary">Place Your Bid</h2>
                <p className="text-primary-400 font-medium mt-0.5 text-sm">{job.title}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-lg text-text-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Job Summary */}
            <div className="bg-dark-primary/60 border border-gray-700/50 rounded-xl p-4 space-y-2">
              <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Job Details</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-muted">Budget:</span>
                  <span className="font-semibold text-blue-400">₹{job.budget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Duration:</span>
                  <span className="font-medium text-text-primary">{job.duration}</span>
                </div>
                {job.location && (
                  <div className="flex justify-between">
                    <span className="text-text-muted">Location:</span>
                    <span className="font-medium text-text-primary">{job.location}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-text-muted">Bids:</span>
                  <span className="font-medium text-text-primary">{job.bids} bids</span>
                </div>
              </div>
              <div className="pt-2 border-t border-gray-700/40">
                <span className="text-text-muted text-sm">Skills Required: </span>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {job.skills.map((skill) => (
                    <span key={skill} className="px-2 py-0.5 bg-primary-500/15 text-primary-400 text-xs rounded-full border border-primary-500/25">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bid Amount */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                <DollarSign className="inline w-4 h-4 mr-1.5 text-primary-400" />
                Your Bid Amount (₹)
              </label>
              <input
                type="number"
                required
                min="1"
                placeholder={`e.g. ${Math.floor(job.budget * 0.9)}`}
                className="w-full px-4 py-3 bg-dark-primary/60 border border-gray-700/60 rounded-xl text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/40 outline-none transition-all"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
              />
              <p className="text-xs text-text-muted mt-1.5">
                Suggested range: ₹{Math.floor(job.budget * 0.8).toLocaleString('en-IN')} – ₹{Number(job.budget).toLocaleString('en-IN')}
              </p>
            </div>

            {/* Delivery Time */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                <Clock className="inline w-4 h-4 mr-1.5 text-primary-400" />
                Estimated Delivery Time
              </label>
              <input
                type="text"
                required
                placeholder="e.g., 2 weeks, 1 month, 45 days"
                className="w-full px-4 py-3 bg-dark-primary/60 border border-gray-700/60 rounded-xl text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/40 outline-none transition-all"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
              />
            </div>

            {/* Cover Letter */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                <FileText className="inline w-4 h-4 mr-1.5 text-primary-400" />
                Cover Letter
              </label>
              <textarea
                required
                rows={6}
                placeholder="Explain why you're the perfect fit for this job. Highlight your relevant experience, skills, and approach to completing this project successfully."
                className="w-full px-4 py-3 bg-dark-primary/60 border border-gray-700/60 rounded-xl text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/40 outline-none transition-all resize-none"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              />
              <div className="flex justify-between mt-1.5">
                <p className="text-xs text-text-muted">Be specific about your qualifications and approach.</p>
                <p className="text-xs text-text-muted">{coverLetter.length}/500 characters</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={onClose} className="flex-1" disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                  </span>
                ) : 'Submit Bid'}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PlaceBidModal;
