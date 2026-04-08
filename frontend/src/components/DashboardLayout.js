import React from 'react';
import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const DashboardLayout = ({ role }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar role={role} />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <Topbar />
          
          {/* Page Content */}
          <main className="flex-1 p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Outlet />
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
