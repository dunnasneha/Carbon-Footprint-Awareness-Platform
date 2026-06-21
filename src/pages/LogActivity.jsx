import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const categories = {
  transport: [
    { id: 'car_petrol', label: 'Petrol Car (km)' },
    { id: 'car_electric', label: 'Electric Car (km)' },
    { id: 'bus', label: 'Bus (km)' },
    { id: 'flight_short_haul', label: 'Short Flight (km)' }
  ],
  energy: [
    { id: 'electricity_grid_avg', label: 'Grid Electricity (kWh)' },
    { id: 'natural_gas_kwh', label: 'Natural Gas (kWh)' }
  ],
  food: [
    { id: 'vegan', label: 'Vegan Meal (count)' },
    { id: 'mixed', label: 'Mixed Meal (count)' },
    { id: 'beef', label: 'Beef Meal (count)' }
  ],
  waste: [
    { id: 'landfill', label: 'Landfill Waste (kg)' },
    { id: 'recycled', label: 'Recycled Waste (kg)' }
  ]
};

export default function LogActivity() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('transport');
  const [subCategory, setSubCategory] = useState(categories['transport'][0].id);
  const [value, setValue] = useState('');

  const handleCategoryChange = (e) => {
    const cat = e.target.value;
    setCategory(cat);
    setSubCategory(categories[cat][0].id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/activities', {
        category,
        sub_category: subCategory,
        value: Number(value)
      });
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-6">Log Activity</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
          <select 
            value={category} 
            onChange={handleCategoryChange}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3"
          >
            {Object.keys(categories).map(cat => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Specific Activity</label>
          <select 
            value={subCategory} 
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3"
          >
            {categories[category].map(sub => (
              <option key={sub.id} value={sub.id}>{sub.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Amount (km, kWh, count, or kg)</label>
          <input 
            type="number" 
            min="0"
            step="0.1"
            required
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="e.g. 15.5"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg transition-colors mt-4 shadow-lg shadow-green-900/20"
        >
          Save Activity
        </button>
      </form>
    </div>
  );
}
