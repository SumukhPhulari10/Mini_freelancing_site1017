import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick, 
  type = 'button',
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'font-inter font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-primary';
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-glow hover:shadow-glow-lg',
    secondary: 'border border-gray-600 text-text-primary bg-transparent hover:bg-dark-secondary hover:border-primary-500 focus:ring-primary-500',
    ghost: 'text-text-primary hover:bg-dark-secondary focus:ring-primary-500',
  };

  return (
    <motion.button
      type={type}
      className={`${baseClasses} ${sizes[size]} ${variants[variant]} rounded-full ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
