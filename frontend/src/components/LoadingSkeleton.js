import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = ({ className = '', height = 'h-4', width = 'w-full' }) => {
  return (
    <motion.div
      className={`${height} ${width} bg-gray-200 rounded-lg ${className}`}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
  );
};

const JobCardSkeleton = () => {
  return (
    <div className="card p-6">
      <div className="space-y-4">
        <LoadingSkeleton height="h-6" width="w-3/4" />
        <LoadingSkeleton height="h-4" width="w-1/2" />
        <LoadingSkeleton height="h-16" width="w-full" />
        <div className="flex gap-2">
          <LoadingSkeleton height="h-6" width="w-16" />
          <LoadingSkeleton height="h-6" width="w-20" />
          <LoadingSkeleton height="h-6" width="w-24" />
        </div>
        <LoadingSkeleton height="h-10" width="w-24" />
      </div>
    </div>
  );
};

const FreelancerCardSkeleton = () => {
  return (
    <div className="card p-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <LoadingSkeleton height="h-16" width="w-16" className="rounded-full" />
          <div className="flex-1 space-y-2">
            <LoadingSkeleton height="h-4" width="w-32" />
            <LoadingSkeleton height="h-3" width="w-24" />
          </div>
        </div>
        <div className="flex gap-1">
          <LoadingSkeleton height="h-6" width="w-16" />
          <LoadingSkeleton height="h-6" width="w-20" />
        </div>
        <LoadingSkeleton height="h-10" width="w-full" />
      </div>
    </div>
  );
};

export { LoadingSkeleton, JobCardSkeleton, FreelancerCardSkeleton };
