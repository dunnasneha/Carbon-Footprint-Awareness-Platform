import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Leaf, Award, TrendingDown, Lightbulb } from 'lucide-react';

const COLORS = ['#e74c3c', '#f39c12', '#2ecc71', '#3498db'];

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/dashboard');
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div className="text-center mt-20 text-gray-400">Loading your carbon footprint...</div>;
  if (!data) return <div className="text-center mt-20 text-red-400">Failed to load data.</div>;

  const pieData = Object.entries(data.by_category).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value
  })).filter(item => item.value > 0);

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Your Dashboard</h1>
          <p className="text-gray-400 mt-2">Track and reduce your environmental impact</p>
        </div>
        <Link to="/log-activity" className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-green-900/20 flex items-center">
          <Leaf className="mr-2 h-5 w-5" />
          Log Activity
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="text-gray-400 font-medium mb-1">Total Emissions</h3>
          <div className="flex items-baseline space-x-2">
            <span className="text-5xl font-black text-white">{data.total_co2_kg}</span>
            <span className="text-gray-500 font-medium">kg CO2e</span>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="text-gray-400 font-medium mb-1">Eco Score</h3>
          <div className="flex items-center space-x-3 mt-1">
            <Award className="h-10 w-10 text-yellow-500" />
            <span className="text-3xl font-bold text-white">{data.eco_score}</span>
          </div>
        </div>
        
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
          <h3 className="text-gray-400 font-medium mb-2">Quick Action</h3>
          <p className="text-sm text-gray-300 mb-4">Want to share your progress?</p>
          <button className="w-full border border-gray-700 hover:bg-gray-800 text-white py-2 rounded-lg transition-colors flex items-center justify-center text-sm font-medium">
            <TrendingDown className="mr-2 h-4 w-4" /> Download Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-6">Emissions by Category</h3>
          {pieData.length > 0 ? (
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '0.5rem', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-80 flex items-center justify-center text-gray-500">
              No data yet. Log some activities!
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-green-900/40 to-gray-900 border border-green-800/50 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-green-400 flex items-center mb-4">
              <Lightbulb className="mr-2 h-5 w-5" /> AI Insights
            </h3>
            <ul className="space-y-4">
              {data.insights.map((insight, idx) => (
                <li key={idx} className="text-gray-300 text-sm leading-relaxed flex items-start">
                  <span className="text-green-500 mr-2">•</span> {insight}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4">Recent Activities</h3>
            <div className="space-y-3">
              {data.recent_activities.length > 0 ? data.recent_activities.map((act) => (
                <div key={act.id} className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
                  <div>
                    <p className="text-sm font-medium text-gray-200 capitalize">{act.category}</p>
                    <p className="text-xs text-gray-500">{act.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-red-400">+{act.co2} kg</p>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-gray-500">No activities logged recently.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
