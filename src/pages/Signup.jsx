import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { Leaf } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', { email, password });
      localStorage.setItem('token', res.data.access_token);
      navigate('/onboarding');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl">
      <div className="text-center mb-8">
        <Leaf className="mx-auto h-12 w-12 text-green-500 mb-4" />
        <h2 className="text-3xl font-bold text-white">Create Account</h2>
        <p className="text-gray-400 mt-2">Start your journey with CarbonWise</p>
      </div>
      
      {error && <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded-lg mb-6">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <input 
            type="email" 
            required
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
          <input 
            type="password" 
            required
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-lg shadow-green-900/20"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-6 text-center text-gray-400">
        Already have an account? <Link to="/login" className="text-green-400 hover:text-green-300 font-medium">Sign in</Link>
      </p>
    </div>
  );
}
