import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';
import { toast } from 'react-toastify';

const MoodCalendar = () => {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showMoodPicker, setShowMoodPicker] = useState(false);
  const [moodData, setMoodData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMoodData();
  }, [selectedMonth, selectedYear]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() + i);

  const moods = {
    happy: { emoji: '😊', color: 'bg-green-400' },
    sad: { emoji: '😔', color: 'bg-blue-400' },
    angry: { emoji: '😠', color: 'bg-red-400' },
    neutral: { emoji: '😐', color: 'bg-gray-400' }
  };

  const fetchMoodData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(API_ENDPOINTS.moods, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch mood data');
      }

      const data = await response.json();
      const moodMap = {};
      
      data.forEach(entry => {
        const date = new Date(entry.date);
        const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        moodMap[dateKey] = entry.mood;
      });

      setMoodData(moodMap);
    } catch (error) {
      console.error('Error fetching mood data:', error);
      toast.error('Failed to load mood data');
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateClick = (day) => {
    const dateKey = `${selectedYear}-${selectedMonth + 1}-${day}`;
    setSelectedDate(dateKey);
    setShowMoodPicker(true);
  };

  const handleMoodSelect = async (mood) => {
    if (!selectedDate) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in to track your mood');
        navigate('/login');
        return;
      }

      const [year, month, day] = selectedDate.split('-');
      const date = new Date(year, month - 1, day);

      const response = await fetch(API_ENDPOINTS.moods, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          date: date.toISOString(),
          mood: mood
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save mood');
      }

      setMoodData(prev => ({
        ...prev,
        [selectedDate]: mood
      }));

      toast.success('Mood saved successfully!');
    } catch (error) {
      console.error('Error saving mood:', error);
      toast.error('Failed to save mood');
    }

    setShowMoodPicker(false);
    setSelectedDate(null);
  };

  const handleTrackingClick = () => {
    navigate('/tracking');
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${selectedYear}-${selectedMonth + 1}-${day}`;
      const mood = moodData[dateKey];

      days.push(
        <div
          key={day}
          className={`h-12 border border-gray-200 rounded-lg flex items-center justify-between p-2 cursor-pointer hover:bg-gray-50 ${
            new Date().toDateString() === new Date(selectedYear, selectedMonth, day).toDateString()
              ? 'bg-green-50 border-green-200'
              : ''
          }`}
          onClick={() => handleDateClick(day)}
        >
          <span>{day}</span>
          {mood && (
            <span className={`w-8 h-8 rounded-full flex items-center justify-center ${moods[mood].color}`}>
              {moods[mood].emoji}
            </span>
          )}
        </div>
      );
    }

    return days;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">
          {months[selectedMonth]} {selectedYear}
        </h3>
        <div className="flex gap-2">
          <select
            className="border rounded px-3 py-1"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          >
            {months.map((month, index) => (
              <option key={month} value={index}>{month}</option>
            ))}
          </select>
          <select
            className="border rounded px-3 py-1"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-medium">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {renderCalendarDays()}
      </div>

      {showMoodPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
            <h4 className="text-lg font-semibold mb-4">How are you feeling today?</h4>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(moods).map(([mood, { emoji, color }]) => (
                <button
                  key={mood}
                  className={`p-4 rounded-lg flex items-center justify-center gap-2 ${color} hover:opacity-90 transition-opacity`}
                  onClick={() => handleMoodSelect(mood)}
                >
                  <span className="text-2xl">{emoji}</span>
                  <span className="capitalize">{mood}</span>
                </button>
              ))}
            </div>
            <button
              className="mt-4 w-full py-2 text-gray-600 hover:text-gray-800 transition-colors"
              onClick={() => setShowMoodPicker(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="text-center mt-6">
        <button
          onClick={handleTrackingClick}
          className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors"
        >
          View Detailed Tracking
        </button>
      </div>
    </div>
  );
};

export default MoodCalendar; 