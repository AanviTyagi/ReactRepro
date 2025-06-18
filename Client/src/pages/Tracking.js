import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { API_ENDPOINTS } from '../config/api';
import { toast } from 'react-toastify';

function Tracking() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState('');
  const [moodStats, setMoodStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [allMoodData, setAllMoodData] = useState([]);
  
  const COLORS = {
    happy: '#4ade80', // green-400
    sad: '#60a5fa', // blue-400
    angry: '#f87171', // red-400
    neutral: '#9ca3af' // gray-400
  };

  const MOOD_LABELS = {
    happy: 'Happy 😊',
    sad: 'Sad 😔',
    angry: 'Angry 😠',
    neutral: 'Neutral 😐'
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchAllMoodData();
      fetchNotes();
    }
  }, [navigate]);

  useEffect(() => {
    if (allMoodData.length > 0) {
      calculateMoodStats();
    }
  }, [selectedMonth, selectedYear, allMoodData]);
  
  const fetchAllMoodData = async () => {
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_ENDPOINTS.moods, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch mood statistics');
      }
      
      const data = await response.json();
      setAllMoodData(data);
      calculateMoodStats(data);
    } catch (err) {
      setError('Error fetching mood statistics. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateMoodStats = (data = allMoodData) => {
    const moodCounts = {
      happy: 0,
      sad: 0,
      angry: 0,
      neutral: 0
    };
    
    data.forEach(entry => {
      const entryDate = new Date(entry.date);
      if (entry.mood && 
          entryDate.getMonth() === selectedMonth && 
          entryDate.getFullYear() === selectedYear) {
        moodCounts[entry.mood]++;
      }
    });
    
    // Format data for pie chart
    const formattedStats = Object.entries(moodCounts)
      .filter(([_, count]) => count > 0)
      .map(([mood, count]) => ({
        name: MOOD_LABELS[mood],
        value: count,
        color: COLORS[mood]
      }));
    
    setMoodStats(formattedStats);
  };

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_ENDPOINTS.moods, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      
      const data = await response.json();
      setSavedNotes(data.filter(item => item.notes));
    } catch (err) {
      console.error('Error fetching notes:', err);
    }
  };

  const handleSaveNotes = async () => {
    if (!notes.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_ENDPOINTS.moods, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          date: new Date().toISOString(),
          notes,
          mood: 'neutral' // Default mood if none selected
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to save notes');
      }
      
      toast.success('Notes saved successfully!');
      setNotes('');
      fetchNotes(); // Refresh notes list
      fetchAllMoodData(); // Refresh mood stats
    } catch (err) {
      toast.error('Error saving notes. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
          <p className="text-sm font-medium">{data.name}</p>
          <p className="text-sm text-gray-600">
            Count: {data.value}
            <span className="ml-2">
              ({((data.value / moodStats.reduce((acc, curr) => acc + curr.value, 0)) * 100).toFixed(1)}%)
            </span>
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Mood Statistics & Notes
          </h1>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Back to Home
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Overall Mood Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Monthly Mood Distribution</h2>
              <div className="flex gap-2">
                <select
                  className="border rounded px-3 py-1 text-sm"
                  value={selectedMonth}
                  onChange={handleMonthChange}
                >
                  {months.map((month, index) => (
                    <option key={month} value={index}>{month}</option>
                  ))}
                </select>
                <select
                  className="border rounded px-3 py-1 text-sm"
                  value={selectedYear}
                  onChange={handleYearChange}
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
            {loading ? (
              <div className="flex justify-center items-center h-80">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : moodStats.length === 0 ? (
              <div className="flex flex-col justify-center items-center h-80">
                <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-600 text-center">No mood data available for {months[selectedMonth]} {selectedYear}.<br/>Start tracking your mood in the calendar!</p>
              </div>
            ) : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={moodStats}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {moodStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36}
                      formatter={(value) => <span className="text-sm">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Add Notes */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Notes</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="5"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              placeholder="Add any notes about your day..."
            ></textarea>
            <button
              onClick={handleSaveNotes}
              disabled={loading || !notes.trim()}
              className="mt-4 w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300"
            >
              {loading ? 'Saving...' : 'Save Notes'}
            </button>
          </div>
        </div>

        {/* Saved Notes */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Notes History</h2>
          {savedNotes.length === 0 ? (
            <p className="text-gray-600 text-center py-4">No notes yet. Start adding some notes about your day!</p>
          ) : (
            <div className="space-y-4">
              {savedNotes.map((note, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                  <p className="text-sm text-gray-500">{new Date(note.date).toLocaleDateString()}</p>
                  <p className="text-gray-800 mt-1">{note.notes}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tracking; 