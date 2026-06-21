import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Globe, Users, Car, Utensils, Zap } from 'lucide-react';

export default function Onboarding() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    location: 'global_avg',
    household_size: 1,
    transport_mode: 'car_avg',
    diet_type: 'mixed',
    energy_source: 'electricity_grid_avg'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/user/onboard', formData);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-2">Welcome to CarbonWise</h2>
      <p className="text-gray-400 mb-8">Let's set up your baseline carbon profile.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
          <label className="flex items-center text-lg font-medium text-gray-200 mb-4">
            <Globe className="mr-2 h-5 w-5 text-blue-400" />
            Where are you based?
          </label>
          <select name="location" value={formData.location} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg p-3">
            <option value="global_avg">Global Average</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="eu">European Union</option>
          </select>
        </div>

        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
          <label className="flex items-center text-lg font-medium text-gray-200 mb-4">
            <Users className="mr-2 h-5 w-5 text-purple-400" />
            Household Size
          </label>
          <input type="number" min="1" name="household_size" value={formData.household_size} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg p-3" />
        </div>

        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
          <label className="flex items-center text-lg font-medium text-gray-200 mb-4">
            <Car className="mr-2 h-5 w-5 text-red-400" />
            Primary Transport
          </label>
          <select name="transport_mode" value={formData.transport_mode} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg p-3">
            <option value="car_petrol">Petrol Car</option>
            <option value="car_electric">Electric Car</option>
            <option value="bus">Public Transport</option>
            <option value="cycling">Cycling / Walking</option>
          </select>
        </div>

        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
          <label className="flex items-center text-lg font-medium text-gray-200 mb-4">
            <Utensils className="mr-2 h-5 w-5 text-green-400" />
            Diet Type
          </label>
          <select name="diet_type" value={formData.diet_type} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg p-3">
            <option value="mixed">Mixed (Meat & Plant)</option>
            <option value="high_meat">High Meat</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
          </select>
        </div>

        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
          <label className="flex items-center text-lg font-medium text-gray-200 mb-4">
            <Zap className="mr-2 h-5 w-5 text-yellow-400" />
            Home Energy Source
          </label>
          <select name="energy_source" value={formData.energy_source} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg p-3">
            <option value="electricity_grid_avg">Grid Electricity</option>
            <option value="electricity_solar">Solar / Renewable</option>
            <option value="natural_gas_kwh">Natural Gas</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl text-lg transition-colors shadow-lg shadow-green-900/20">
          Complete Setup
        </button>
      </form>
    </div>
  );
}
