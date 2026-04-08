import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, Clock, FileText } from 'lucide-react';
import Button from './Button';

const PlaceBidModal = ({ job, onClose, onSubmit }) => {
  const [bidAmount, setBidAmount] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const bidData = {
        jobId: job.id,
        jobTitle: job.title,
        bidAmount: parseFloat(bidAmount),
        deliveryTime,
        coverLetter,
        submittedAt: new Date().toISOString()
      };

      onSubmit(bidData);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Place Your Bid</h2>
                <p className="text-gray-600 mt-1">{job.title}</p>
              </div>
              <motion.button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5 text-gray-500" />
              </motion.button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Job Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Job Details</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Budget:</span>
                  <span className="font-medium text-gray-900">${job.budget}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-medium text-gray-900">{job.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Skills Required:</span>
                  <div className="flex gap-1">
                    {job.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bid Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="inline w-4 h-4 mr-2" />
                Your Bid Amount ($)
              </label>
              <input
                type="number"
                required
                min="1"
                placeholder="Enter your bid amount"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Suggested range: ${Math.floor(job.budget * 0.8)} - ${job.budget}
              </p>
            </div>

            {/* Delivery Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="inline w-4 h-4 mr-2" />
                Estimated Delivery Time
              </label>
              <input
                type="text"
                required
                placeholder="e.g., 2 weeks, 1 month, 45 days"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
              />
            </div>

            {/* Cover Letter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="inline w-4 h-4 mr-2" />
                Cover Letter
              </label>
              <textarea
                required
                rows={6}
                placeholder="Explain why you're the perfect fit for this job. Highlight your relevant experience, skills, and approach to completing this project successfully."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              />
              <div className="flex justify-between mt-1">
                <p className="text-xs text-gray-500">
                  Be specific about your qualifications and how you'll complete the project.
                </p>
                <p className="text-xs text-gray-500">
                  {coverLetter.length}/500 characters
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Bid'
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PlaceBidModal;
