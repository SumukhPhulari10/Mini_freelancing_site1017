import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = ({ className = '', height = 'h-4', width = 'w-full' }) => (
  <motion.div
    className={`${height} ${width} bg-gray-700/60 rounded-lg ${className}`}
    animate={{ opacity: [0.4, 0.8, 0.4] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
  />
);

const JobCardSkeleton = () => (
  <div className="bg-dark-secondary rounded-2xl border border-gray-800 p-5">
    <div className="space-y-3">
      <LoadingSkeleton height="h-5" width="w-3/4" />
      <LoadingSkeleton height="h-4" width="w-1/2" />
      <LoadingSkeleton height="h-14" width="w-full" />
      <div className="flex gap-2">
        <LoadingSkeleton height="h-6" width="w-14" />
        <LoadingSkeleton height="h-6" width="w-18" />
        <LoadingSkeleton height="h-6" width="w-20" />
      </div>
      <LoadingSkeleton height="h-9" width="w-24" />
    </div>
  </div>
);

const FreelancerCardSkeleton = () => (
  <div className="bg-dark-secondary rounded-2xl border border-gray-800 p-5">
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <LoadingSkeleton height="h-12" width="w-12" className="rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <LoadingSkeleton height="h-4" width="w-32" />
          <LoadingSkeleton height="h-3" width="w-24" />
        </div>
      </div>
      <div className="flex gap-1.5">
        <LoadingSkeleton height="h-6" width="w-14" />
        <LoadingSkeleton height="h-6" width="w-18" />
      </div>
      <LoadingSkeleton height="h-10" width="w-full" />
    </div>
  </div>
);

export { LoadingSkeleton, JobCardSkeleton, FreelancerCardSkeleton };
