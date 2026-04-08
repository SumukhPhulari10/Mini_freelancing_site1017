import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import './styles.css';

// Landing Page Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import JobListings from './components/JobListings';
import PostJob from './components/PostJob';
import FreelancerProfiles from './components/FreelancerProfiles';
import Footer from './components/Footer';

// Dashboard Components
import DashboardLayout from './components/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Client Pages
import ClientDashboard from './pages/ClientDashboard';
import ClientJobs from './pages/ClientJobs';
import ClientBids from './pages/ClientBids';

// Freelancer Pages
import FreelancerDashboard from './pages/FreelancerDashboard';
import FreelancerJobs from './pages/FreelancerJobs';
import FreelancerBids from './pages/FreelancerBids';
import FreelancerProfile from './pages/FreelancerProfile';

// Auth Components
import Login from './components/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Routes>
            {/* Landing Page Routes */}
            <Route path="/" element={
              <>
                <Navbar />
                <HeroSection />
                <JobListings />
                <PostJob />
                <FreelancerProfiles />
                <Footer />
              </>
            } />

            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />

            {/* Client Dashboard Routes */}
            <Route path="/client/*" element={
              <ProtectedRoute requiredRole="client">
                <DashboardLayout role="client">
                  <Routes>
                    <Route path="dashboard" element={<ClientDashboard />} />
                    <Route path="jobs" element={<ClientJobs />} />
                    <Route path="bids" element={<ClientBids />} />
                    <Route path="post-job" element={<PostJob />} />
                    <Route path="messages" element={<div>Messages Page</div>} />
                    <Route path="settings" element={<div>Settings Page</div>} />
                    <Route path="" element={<Navigate to="/client/dashboard" replace />} />
                  </Routes>
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Freelancer Dashboard Routes */}
            <Route path="/freelancer/*" element={
              <ProtectedRoute requiredRole="freelancer">
                <DashboardLayout role="freelancer">
                  <Routes>
                    <Route path="dashboard" element={<FreelancerDashboard />} />
                    <Route path="jobs" element={<FreelancerJobs />} />
                    <Route path="bids" element={<FreelancerBids />} />
                    <Route path="earnings" element={<div>Earnings Page</div>} />
                    <Route path="profile" element={<FreelancerProfile />} />
                    <Route path="messages" element={<div>Messages Page</div>} />
                    <Route path="settings" element={<div>Settings Page</div>} />
                    <Route path="" element={<Navigate to="/freelancer/dashboard" replace />} />
                  </Routes>
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;