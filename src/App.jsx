import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import LogActivity from './pages/LogActivity';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950 font-sans text-gray-100 flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/onboarding" element={
              <PrivateRoute>
                <Onboarding />
              </PrivateRoute>
            } />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/log-activity" element={
              <PrivateRoute>
                <LogActivity />
              </PrivateRoute>
            } />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
