import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Briefcase } from 'lucide-react';
import Button from './Button';

const JobCard = ({ job, onApply }) => {
  const {
    id,
    title,
    description,
    budget,
    location,
    duration,
    skills,
    postedTime,
    company
  } = job;

  return (
    <motion.div
      className="card p-6 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-1 hover:text-primary-600 transition-colors">
              {title}
            </h3>
            <p className="text-gray-600 text-sm">{company}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-600">
              ${budget}
            </div>
            <div className="text-xs text-gray-500">Fixed Price</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 line-clamp-3">
          {description}
        </p>

        {/* Meta Information */}
        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            <span>{postedTime}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <motion.span
              key={skill}
              className="skill-tag"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              whileHover={{ scale: 1.1 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-gray-100">
          <Button 
            className="w-full sm:w-auto"
            onClick={() => onApply && onApply(id)}
          >
            Apply Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;