import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ResearchAgentPage from './pages/ResearchAgentPage';
import DemoPrepAgentPage from './pages/DemoPrepAgentPage';
import DemoFeedbackAgentPage from './pages/DemoFeedbackAgentPage';
import RfpAgentPage from './pages/RfpAgentPage';
import CompetitiveAgentPage from './pages/CompetitiveAgentPage';
import AnalyticsAgentPage from './pages/AnalyticsAgentPage';

const demoEmail = 'demo@agentone.ai';
const demoPassword = 'Demo1234!';

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('agentone-auth') === 'true';
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  // Simple auth state for demo
  const [authed, setAuthed] = useState(localStorage.getItem('agentone-auth') === 'true');

  const handleLogin = (email: string, password: string) => {
    if (email === demoEmail && password === demoPassword) {
      localStorage.setItem('agentone-auth', 'true');
      setAuthed(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem('agentone-auth');
    setAuthed(false);
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage onLogin={handleLogin} authed={authed} />} />
      <Route path="/dashboard" element={<RequireAuth><DashboardPage onLogout={handleLogout} /></RequireAuth>} />
      <Route path="/agent/research" element={<RequireAuth><ResearchAgentPage /></RequireAuth>} />
      <Route path="/agent/demo-prep" element={<RequireAuth><DemoPrepAgentPage /></RequireAuth>} />
      <Route path="/agent/demo-feedback" element={<RequireAuth><DemoFeedbackAgentPage /></RequireAuth>} />
      <Route path="/agent/rfp" element={<RequireAuth><RfpAgentPage /></RequireAuth>} />
      <Route path="/agent/competitive" element={<RequireAuth><CompetitiveAgentPage /></RequireAuth>} />
      <Route path="/agent/analytics" element={<RequireAuth><AnalyticsAgentPage /></RequireAuth>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
