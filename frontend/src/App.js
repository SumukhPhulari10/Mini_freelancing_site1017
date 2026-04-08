import React from 'react';
import './styles.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import JobListings from './components/JobListings';
import PostJob from './components/PostJob';
import FreelancerProfiles from './components/FreelancerProfiles';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <JobListings />
      <PostJob />
      <FreelancerProfiles />
      <Footer />
    </div>
  );
}

export default App;