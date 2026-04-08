import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const DashboardCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon, 
  color = 'primary',
  loading = false 
}) => {
  const getChangeColor = (type) => {
    switch (type) {
      case 'increase':
        return 'text-green-400';
      case 'decrease':
        return 'text-red-400';
      default:
        return 'text-text-secondary';
    }
  };

  const getIconBgColor = (color) => {
    switch (color) {
      case 'primary':
        return 'bg-primary-500/20';
      case 'green':
        return 'bg-green-500/20';
      case 'blue':
        return 'bg-blue-500/20';
      case 'purple':
        return 'bg-purple-500/20';
      default:
        return 'bg-gray-500/20';
    }
  };

  const getIconColor = (color) => {
    switch (color) {
      case 'primary':
        return 'text-primary-400';
      case 'green':
        return 'text-green-400';
      case 'blue':
        return 'text-blue-400';
      case 'purple':
        return 'text-purple-400';
      default:
        return 'text-text-secondary';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="animate-pulse">
          <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
        <div className={`w-12 h-12 ${getIconBgColor(color)} rounded-2xl flex items-center justify-center border border-gray-700`}>
          <Icon className={`w-6 h-6 ${getIconColor(color)}`} />
        </div>
      </div>
      
      <div className="mb-2">
        <p className="text-3xl font-bold gradient-text">{value}</p>
      </div>
      
      {change && (
        <div className="flex items-center space-x-2">
          {changeType === 'increase' ? (
            <TrendingUp className={`w-4 h-4 ${getChangeColor(changeType)}`} />
          ) : (
            <TrendingDown className={`w-4 h-4 ${getChangeColor(changeType)}`} />
          )}
          <span className={`text-sm font-medium ${getChangeColor(changeType)}`}>
            {change} from last month
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default DashboardCard;
