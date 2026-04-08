import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Users, Briefcase, DollarSign, FileText, Eye } from 'lucide-react';

const DashboardCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon, 
  color = 'primary',
  loading = false 
}) => {
  const colorClasses = {
    primary: 'bg-primary-100 text-primary-600',
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
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
      className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          
          {change && (
            <div className={`flex items-center mt-2 text-sm ${
              changeType === 'increase' ? 'text-green-600' : 'text-red-600'
            }`}>
              {changeType === 'increase' ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              {change} from last month
            </div>
          )}
        </div>
        
        <motion.div
          className={`w-12 h-12 ${colorClasses[color]} rounded-lg flex items-center justify-center`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.2 }}
        >
          <Icon className="w-6 h-6" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardCard;
