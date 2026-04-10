import React from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const DashboardLayout = ({ role, children }) => {
  return (
    <div className="min-h-screen bg-dark-primary flex">
      {/* Sidebar */}
      <Sidebar role={role} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar />
        
        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
