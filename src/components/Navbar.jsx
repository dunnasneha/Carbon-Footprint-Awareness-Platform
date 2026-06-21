import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, LogOut } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center text-green-500 font-bold text-xl tracking-wide">
          <Leaf className="mr-2 h-6 w-6" />
          CarbonWise
        </Link>
        <div className="flex items-center space-x-6">
          {token ? (
            <>
              <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
              <Link to="/log-activity" className="text-gray-300 hover:text-white transition-colors">Log Activity</Link>
              <button 
                onClick={handleLogout}
                className="flex items-center text-red-400 hover:text-red-300 transition-colors"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
              <Link to="/signup" className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg transition-colors font-medium">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
