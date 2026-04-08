import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Briefcase, DollarSign, User } from 'lucide-react';
import Button from './Button';

const FreelancerCard = ({ freelancer, onHire }) => {
  const {
    id,
    name,
    title,
    avatar,
    location,
    hourlyRate,
    skills,
    rating,
    completedJobs,
    description
  } = freelancer;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 fill-yellow-200 text-yellow-400" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <motion.div
      className="card p-6 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-4">
        {/* Profile Header */}
        <div className="flex items-start space-x-4">
          <motion.div
            className="relative flex-shrink-0"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary-600" />
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-gray-900 truncate">
              {name}
            </h3>
            <p className="text-gray-600 text-sm">{title}</p>
            
            {/* Rating */}
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center">
                {renderStars(rating)}
              </div>
              <span className="text-sm text-gray-600">
                {rating} ({completedJobs} jobs)
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm line-clamp-2">
          {description}
        </p>

        {/* Meta Information */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{location}</span>
            </div>
            <div className="flex items-center text-primary-600 font-semibold">
              <DollarSign className="w-4 h-4" />
              <span>${hourlyRate}/hr</span>
            </div>
          </div>
          
          <div className="flex items-center text-gray-600 text-sm">
            <Briefcase className="w-4 h-4 mr-1" />
            <span>{completedJobs} projects completed</span>
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Skills</h4>
          <div className="flex flex-wrap gap-1">
            {skills.slice(0, 4).map((skill, index) => (
              <motion.span
                key={skill}
                className="skill-tag text-xs"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
              >
                {skill}
              </motion.span>
            ))}
            {skills.length > 4 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{skills.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-gray-100 space-y-2">
          <Button 
            className="w-full"
            onClick={() => onHire && onHire(id)}
          >
            Hire Now
          </Button>
          <Button 
            variant="secondary"
            className="w-full"
          >
            View Profile
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default FreelancerCard;
