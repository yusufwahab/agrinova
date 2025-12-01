import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import FarmMonitor from './pages/FarmMonitor';
import WeatherClimate from './pages/WeatherClimate';
import SoilAnalysis from './pages/SoilAnalysis';
import LivestockManager from './pages/LivestockManager';
import RecordsFinance from './pages/RecordsFinance';
import MarketIntelligence from './pages/MarketIntelligence';
import Community from './pages/Community';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import SmartIrrigation from './pages/SmartIrrigation';
import FarmRecords from './pages/FarmRecords';
import Layout from './components/Layout';
import AuthProvider from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/monitor" element={<Layout><FarmMonitor /></Layout>} />
            <Route path="/weather" element={<Layout><WeatherClimate /></Layout>} />
            <Route path="/soil" element={<Layout><SoilAnalysis /></Layout>} />
            <Route path="/livestock" element={<Layout><LivestockManager /></Layout>} />
            <Route path="/records" element={<Layout><RecordsFinance /></Layout>} />
            <Route path="/market" element={<Layout><MarketIntelligence /></Layout>} />
            <Route path="/community" element={<Layout><Community /></Layout>} />
            <Route path="/settings" element={<Layout><Settings /></Layout>} />
            <Route path="/notifications" element={<Layout><Notifications /></Layout>} />
            <Route path="/smart-irrigation" element={<Layout><SmartIrrigation /></Layout>} />
            <Route path="/farm-records" element={<Layout><FarmRecords /></Layout>} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;